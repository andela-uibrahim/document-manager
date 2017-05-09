/* eslint import/no-unresolved: 0 */
/*eslint-disable no-unused-vars*/
import model from '../models';
import DocumentHelper from './helper/DocumentHelper';

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
    const FinderId = req.decoded.UserId;
    const RoleId = req.decoded.RoleId;
    if(!parseInt(req.params.id)){
      return res.status(400)
      .send({ 
        success: false,
        message: 'Invalid query params'
      });
    }
    Documents.findById(req.params.id).then((document) => {
      if (document.UserId === FinderId || RoleId === 1) {
        document.update(req.body)
        .then(updatedDocument => res.status(200)
          .send({
            success: true,
            updatedDocument
          })
        )
        .catch(error => res.status(409).send(error.message));
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
    const FinderId = req.decoded.UserId;
    const RoleId = req.decoded.RoleId;
    if(!parseInt(req.params.id)){
      return res.status(400)
      .send({ 
        success: false,
        message: 'Invalid query params'
      });
    }
    Documents.findOne({
      where: {
        id: req.params.id
      }
    }).then((document) => {
      if (document.UserId === FinderId || (RoleId === 1 &&
       document.access !== 'private')) {
        document.destroy()
        .then(() => res.status(200).send({
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
    if(!parseInt(req.params.id)){
      return res.status(400)
      .send({ 
        success: false,
        message: 'Invalid query params'
      });
    }
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
    let query ={};
    const queryId = req.params.id;
    const UserId = req.decoded.UserId;
    const RoleId = req.decoded.RoleId;
    if(!parseInt(req.params.id)){
      return res.status(400)
      .send({ 
        success: false,
        message: 'Invalid query params'
      });
    }
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.limit = (req.query.limit > 0) ? req.query.limit : 9;
    if (UserId == queryId || RoleId === 1) {
      query.where = {
        UserId: queryId,
      } 
    } else {
      query.where = {
        UserId: queryId,
        access: 'public'
      }
    }
      Documents.findAndCountAll( query)
      .then((results) => {
        if (results.length < 1) {
          return res.status(404).send({
            success: false,
            message: 'No documents found'
          });
        }
        const offset = query.offset;
        const limit = query.limit;
        const pagination = DocumentHelper
         .paginateResult(results, offset, limit);
        return res.status(200).send({
          success: true,
          results,
          pagination
        });
    });
  }

  

/**
 * search document in the database
 * Admin has access to all except private documents
 * Users only have access to their private
 * documents and all other public documents or row.
 * @param{Object} req - Server req
 * @param{Object} res - Server res
 * @return {Void} - returns Void
 */
  static searchDocuments(req, res) {
    let searchQuery = req.query.search;
    const searchLimit = req.query.limit;
    const UserId = req.decoded.UserId;
    const RoleId = req.decoded.RoleId;

    const query = {
      attributes: ['id', 'UserId', 'access', 'title', 'content', 'createdAt'],
      order: '"createdAt" DESC',
      include: [{
        model: Users,
        attributes: ['RoleId']
      }]
    };
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    if (searchLimit) {
      query.limit = searchLimit;
    }

    if (searchQuery) {
      if (RoleId === 1 ) {
        searchQuery = DocumentHelper.sanitizeString(searchQuery);
        query.where = {
          $or:
          [
            {
              title: { $iLike: `%${searchQuery}%` }
            }
          ],
          $and: {
            $or:
            [
              { access: 'public' },
              { access: 'role' },
              { UserId, }
            ]
          }
        };
        Documents.findAndCountAll(query)
        .then((results) => {
          if (results.count < 1) {
            res.status(404).send({
              success: false,
              message: 'No Document Found'
            });
          } else {
            const offset = query.offset;
            const limit = query.limit;
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
        searchQuery = DocumentHelper.sanitizeString(searchQuery);
        query.where = {
          $or:
          [
            {
              title: { $iLike: `%${searchQuery}%` }
            }
          ],
        };
        Documents.findAndCountAll(query).then((results) => {
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

        const offset = query.offset;
        const limit = query.limit;
        results.count = results.rows.length;
        const pagination = DocumentHelper
          .paginateResult(results, offset, limit);

        res.status(200).send({
          success: true,
          results,
          pagination
        });
      });
     }
   } else {
       res.status(400).send({
         success: false,
         message: 'please enter a search parameter'
       });
    }     
 }


  /**
 * Fetch all accessible documents in the database
 * Admin has access to public and roles documents
 * Users only have access to their private
 * documents and all other public documents.
 * @param{Object} req - Server req
 * @param{Object} res - Server res
 * @return {Void} - returns Void
 */
  static fetchDocuments(req, res) {
    const UserId = req.decoded.UserId;
    const RoleId = req.decoded.RoleId;
    const query = {
      attributes: ['id', 'UserId', 'access', 'title', 'content', 'createdAt'],
      order: '"createdAt" DESC',
      include: [{
        model: Users,
        attributes: ['RoleId']
      }]
    };
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.limit = (req.query.limit > 0) ? req.query.limit : 10;

    if (RoleId === 1) {
        query.where = {   
          $or:
          [
            { access: 'public' },
            { access: 'role' },
            { UserId, }
          ]
        };
      Documents.findAndCountAll(query)
        .then((results) => {
          if (results.count < 1) {
            res.status(404).send({
              success: false,
              message: 'No Document Found'
            });
          } else {
            const offset = query.offset;
            const limit = query.limit;
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
      Documents.findAndCountAll(query).then((results) => {
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
        results.count = results.rows.length;

        const offset = query.offset;
        const limit = query.limit;

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
