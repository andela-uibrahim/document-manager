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
      req.body.access &&
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
          $and: {
            $or: [
              { title: req.body.title },
              { content: req.body.content }
            ]
          }
        }
      }).then((result) => {
        if (result.length > 0) {
          res.status(409).send({
            success: false,
            message: `You cannot create document, 
            title and content of documents must be unique`
          });
        } else {
          Documents
            .create({
              title: req.body.title,
              content: req.body.content,
              access: req.body.access ? req.body.access : 'public',
              UserId: req.decoded.UserId,
            }).then((document) => {
              res.status(201).send({
                success: true,
                message: 'Document successfully created',
                document: document.dataValues
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
   * Fetch specific document in the database
   * Admin has access to all the documents
   * Users only have access to their private documents
   * and all other public documents.
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @return {Void} - returns Void
   */
  static fetchDocuments(req, res) {
    const UserId = req.decoded.UserId;
    let RoleId;
    Users.findById(UserId).then((user) => { RoleId = user.RoleId; });
    Documents.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: model.users,
        attributes: ['roleId']
      }]
    }).then((result) => {
      const document = result ? result.dataValues : null;
      if (document) {
        // if the reqer's role id is Admin, allow unrestricted access
        if (RoleId === 1) {
          res.status(200).send({
            success: true,
            message: 'Document found',
            document
          });
        } else if ((document.access === 'public') ||
          (document.user.roleId === RoleId
            && document.access !== 'private')) {
          res.status(200).send({
            success: true,
            message: 'Document Found',
            document
          });
        } else if (document.access === 'private' && document.UserID === UserId) {
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
   * Fetch specific document in the database
   * Admin has access to all the documents
   * Users only have access to their private
   * documents and all other public documents.
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @return {Void} - returns Void
   */
  static fetchDocument(req, res) {
    let searchQuery = req.query.search;
    const searchLimit = req.query.limit;
    const userId = req.decoded.UserId;
    let RoleId;
    Users.findById(userId).then((user) => {
      RoleId = user.RoleId;
      const queryBuilder = {
        attributes: ['id', 'UserId', 'access', 'title', 'content', 'createdAt'],
        order: '"createdAt" DESC',
        include: [{
          model: model.User,
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
            $or: [{
              title:
              { $like: `%${searchQuery}%` }
            }, {
              content:
              { $like: `%${searchQuery}%` }
            }]
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
              res.status(200).send({
                success: true,
                results
              });
            }
          });
      } else {
        if (searchQuery) {
          searchQuery = DocumentHelper.sanitizeString(searchQuery);
          queryBuilder.where = {
            $or: [
              { title: { $like: `%${searchQuery}%` } },
              { content: { $like: `%${searchQuery}%` } }
            ],
            $and: {
              $or: [
                { access: 'public' },
                { UserID: userId }
              ]
            }
          };
        }
        Documents.findAndCountAll(queryBuilder).then((results) => {
          const accessibleDocuments = results.rows.filter((document) => {
            if ((document.access === 'public') ||
              (document.user.roleId === RoleId
                && document.access !== 'private')) {
              return true;
            } else if (document.access === 'private'
             && document.UserID === userId) {
              return true;
            }
            return false;
          });

          const offset = queryBuilder.offset;
          const limit = queryBuilder.limit;

          const pagination = DocumentHelper.paginateResult(accessibleDocuments, offset, limit);

          res.status(200).send({
            success: true,
            results: accessibleDocuments,
            pagination
          });
        });
      }
    });
  }

  /**
   * Fetch all the documents belonging to a particular user
   * Users have access to their own documents and all other public and role access documents
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @return{Void} - return Void
   */
  static fetchUserDocument(req, res) {
    const queryId = req.params.id;
    const UserID = req.decoded.UserId;
    let roleId;
    Users.findById(UserID).then((user) => {
      roleId = user.dataValues.roleId;
      if (UserID === queryId || roleId === 1) {
        Documents.findAll({
          where: {
            UserID: queryId
          }
        }).then((document) => {
          if (document.length < 1) {
            return res.status(404).send({
              success: false,
              message: 'No documents found'
            });
          }
          const results = document;
          return res.status(200).send(results);
        });
      } else {
        Documents.findAll({
          where: {
            UserID: queryId,
            $and: {
              access: 'public'
            }
          }
        }).then((document) => {
          if (document.length < 1) {
            return res.status(404).send({
              success: false,
              message: 'No documents found'
            });
          }
          const results = document;
          return res.status(200).send(results);
        });
      }
    });
  }

  /**
   * Edit and Update User documents in the database
   * Users only have access to their own documents
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @return {Void} - returns Void
   */
  static updateDocument(req, res) {
    const Owner = req.decoded.UserId;
    let Role;
    Users.findById(Owner).then((user) => { Role = user.dataValues.roleId; });
    Documents.findOne({
      where: {
        id: req.params.id
      }
    }).then((document) => {
      if (document.UserID === Owner || Role === 1) {
        document.update(req.body)
          .then(updatedDocument => res.status(201).send(updatedDocument))
          .catch(error => res.status(401).send(error));
      } else {
        res.status(401).send({
          success: false,
          role: Role,
          message: 'You are not authorized to update this document'
        });
      }
    }).catch(error => res.status(401).send(error));
  }

  /**
   * Delete User documents in the database
   * Users only have access to their own documents
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @return {Void} - returns Void
   */
  static deleteDocument(req, res) {
    const Owner = req.decoded.UserId;
    let Role;
    Users.findById(Owner).then((user) => { Role = user.dataValues.roleId; });
    Documents.findOne({
      where: {
        id: req.params.id
      }
    }).then((document) => {
      if (document.UserID === Owner || Role === 1) {
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
}
export default DocumentController;
