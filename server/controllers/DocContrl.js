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
      if (document.UserID === OwnerId || RoleId === 1) {
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
