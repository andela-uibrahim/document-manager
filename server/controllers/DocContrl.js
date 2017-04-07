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

}
export default DocumentController;
