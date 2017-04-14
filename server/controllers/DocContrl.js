/* eslint import/no-unresolved: 0 */
import model from '../models';
import DocumentHelper from './helper/DocHelper';

const Documents = model.document;
const Users = model.User;

/**
 * Controller for document management
 */
class DocumentController {
/**
 * Method to set the various document routes
 * @param{Object} req - Server req
 * @return{Object} return req parameters
 */
  static postreq(req) {
    return (
      req.body &&
      req.body.title &&
      req.body.content &&
      req.decoded.UserId
    );
  }

/**
 * Method used to create new Document for a particular user
 * @param{Object} req - Server req
 * @param{Object} res - Server res
 * @returns{Void} return Void
 */
  static createDocument(req, res) {
    if (DocumentController.postreq(req)) {
      Documents.findAll({
        where: {
          UserId: req.decoded.UserId,
          title: req.body.title
        }
      }).then((result) => {
        if (result.length > 0) {
          res.status(409).send({
            success: false,
            message:
            'You cannot create document, title of documents must be unique'
          });
        } else {
          Documents
            .create({
              title: req.body.title,
              content: req.body.content,
              access: req.body.access || 'public',
              UserId: req.decoded.UserId,
            }).then((document) => {
              res.status(201).send({
                success: true,
                message: 'Document successfully created',
                document,
              });
            }).catch((error) => {
              res.status(400).send({
                success: false,
                message: error.message
              });
            });
        }
      });
    } else {
      res.status(400).send({
        success: false,
        message: 'Some fields are missing'
      });
    }
  }

/**
 * Edit and Update User documents in the database
 * Users only have access to their own documents
 * @param{Object} req - Server req
 * @param{Object} res - Server res
 * @return {Void} - returns Void
 */
  static updateDocument(req, res) {
    const OwnerId = req.decoded.UserId;
    const RoleId = req.decoded.RoleId;
    Documents.findById(req.params.id).then((document) => {
      if (document.UserId === OwnerId || RoleId === 1) {
        document.update(req.body)
        .then(updatedDocument => res.status(201).send(updatedDocument))
        .catch(error => res.status(401).send(error.message));
      } else {
        res.status(401).send({
          success: false,
          RoleId,
          message: 'You are not authorized to update this document'
        });
      }
    }).catch(error => res.status(401).send(error.message));
  }

/**
 * Delete User documents in the database
 * Users only have access to their own documents
 * @param{Object} req - Server req
 * @param{Object} res - Server res
 * @return {Void} - returns Void
 */
  static deleteDocument(req, res) {
    const OwnerId = req.decoded.UserId;
    const RoleId = req.decoded.RoleId;
    Documents.findOne({
      where: {
        id: req.params.id
      }
    }).then((document) => {
      if (document.UserId === OwnerId || RoleId === 1) {
        document.destroy()
        .then(() => res.status(201).send({
          success: true,
          message: 'Document has been successfully deleted'
        }));
      } else {
        res.status(401).send({
          success: false,
          message: 'You are not authorized to delete this document'
        });
      }
    }).catch(error => res.status(401).send(error));
  }

  /**
 * Fetch specific document in the database
 * Admin has access to all the documents
 * Users only have access to their private documents
 * and all other public documents.
 * @param{Object} req - Server req
 * @param{Object} res - Server res
 * @return {Void} - returns Void
 */
  static fetchDocument(req, res) {
    const UserId = req.decoded.UserId;
    const RoleId = req.decoded.RoleId;
    Documents.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Users,
        attributes: ['RoleId']
      }]
    }).then((result) => {
      const document = result || null;
      if (document) {
        if (RoleId === 1) {
          res.status(200).send({
            success: true,
            message: 'Document found',
            document
          });
        } else if ((document.access === 'public') ||
        (document.User.RoleId === RoleId && document.access !== 'private')) {
          res.status(200).send({
            success: true,
            message: 'Document Found',
            document
          });
        } else if (document.access === 'private' &&
        document.UserId === UserId) {
          res.status(200).send({
            success: true,
            message: 'Document Found',
            document
          });
        } else {
          res.status(401).send({
            success: false,
            message: 'You cannot access this document'
          });
        }
      } else {
        res.status(404).send({
          success: false,
          message: `Document with id ${req.params.id} not found in the database`
        });
      }
    });
  }
/**
 * Fetch all the documents belonging to a particular user
 * Users have access to their own documents
 * and all other public and role access documents
 * @param{Object} req - Server req
 * @param{Object} res - Server res
 * @return{Void} - return Void
 */
  static fetchUserDocument(req, res) {
    const queryId = req.params.id;
    const UserId = req.decoded.UserId;
    const RoleId = req.decoded.RoleId;
    if (UserId === queryId || RoleId === 1) {
      Documents.findAll({
        where: {
          UserId: queryId
        }
      }).then((document) => {
        if (document.length < 1) {
          return res.status(404).send({
            success: false,
            message: 'No documents found'
          });
        }
        return res.status(200).send(document);
      });
    } else {
      Documents.findAll({
        where: {
          UserId: queryId,
          access: 'public'
        }
      }).then((document) => {
        if (document.length < 1) {
          return res.status(404).send({
            success: false,
            message: 'No documents found'
          });
        }
        return res.status(200).send(document);
      });
    }
  }

/**
 * Fetch specific document in the database
 * Admin has access to all the documents
 * Users only have access to their private
 * documents and all other public documents.
 * @param{Object} req - Server req
 * @param{Object} res - Server res
 * @return {Void} - returns Void
 */
  static fetchDocuments(req, res) {
    let searchQuery = req.query.search;
    const searchLimit = req.query.limit;
    const UserId = req.decoded.UserId;
    const RoleId = req.decoded.RoleId;

    const queryBuilder = {
      attributes: ['id', 'UserId', 'access', 'title', 'content', 'createdAt'],
      order: '"createdAt" DESC',
      include: [{
        model: Users,
        attributes: ['RoleId']
      }]
    };
    queryBuilder.offset = (req.query.offset > 0) ? req.query.offset : 0;
    if (searchLimit) {
      queryBuilder.limit = searchLimit;
    }

    if (RoleId === 1) {
      if (searchQuery) {
        searchQuery = DocumentHelper.sanitizeString(searchQuery);
        queryBuilder.where = {
          $or:
          [
            {
              title: { $like: `%${searchQuery}%` }
            }, {
              content: { $like: `%${searchQuery}%` }
            }
          ]
        };
      }
      Documents.findAndCountAll(queryBuilder)
        .then((results) => {
          if (results.count < 1) {
            res.status(404).send({
              success: false,
              message: 'No Document Found'
            });
          } else {
            const offset = queryBuilder.offset;
            const limit = queryBuilder.limit;
            const pagination = DocumentHelper
             .paginateResult(results, offset, limit);
            res.status(200).send({
              success: true,
              results,
              pagination
            });
          }
        });
    } else {
      if (searchQuery) {
        searchQuery = DocumentHelper.sanitizeString(searchQuery);
        queryBuilder.where = {
          $or:
          [
            {
              title: { $like: `%${searchQuery}%` }
            },
            {
              content: { $like: `%${searchQuery}%` }
            }
          ],
          $and: {
            $or:
            [
              { access: 'public' },
              { UserId, }
            ]
          }
        };
      }
      Documents.findAndCountAll(queryBuilder).then((results) => {
        results.rows = results.rows.filter((document) => {
          if ((document.access === 'public') ||
               (document.User.RoleId === RoleId &&
               document.access !== 'private')) {
            return true;
          } else if (document.access === 'private' &&
                document.UserId === UserId) {
            return true;
          }
          return false;
        });

        const offset = queryBuilder.offset;
        const limit = queryBuilder.limit;

        const pagination = DocumentHelper
          .paginateResult(results, offset, limit);

        res.status(200).send({
          success: true,
          results,
          pagination
        });
      });
    }
  }
}
export default DocumentController;
