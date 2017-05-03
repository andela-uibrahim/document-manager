/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */

import express from 'express';
import DocumentController from '../controllers/DocContrl';
import UserController from '../controllers/UserContrl';
import Authenticate from '../middleware/authenticator';

const router = express.Router();


router.route('/documents/')
     /** @swagger
      *  /api/search/documents/:
      *   get:
      *     description: Returns {limit} documents from the the {offset}
      *     tags:
      *       - Get documents
      *     produces:
      *        - application/json
      *     parameters:
      *        - name: Authorization
      *          in: header
      *          description: an authorization header
      *          required: true
      *          type: string
      *     responses:
      *        200:
      *          description: get documents from the database
      *          schema:
      *            type: array
      *            items:
      *              $ref: '#/definitions/Document'
      */
    .get(Authenticate.authenticateUser, DocumentController.searchDocuments)

router.route('/users/')
    /** @swagger
      *  /api/search/users/:
      *   get:
      *     description: Returns {limit} users from the {offset}
      *     tags:
      *       - Search users
      *     produces:
      *        - application/json
      *     parameters:
      *        - name: Authorization
      *          in: header
      *          description: an authorization header
      *          required: true
      *          type: string
      *     responses:
      *        200:
      *          description: get users from the database
      *          schema:
      *            type: array
      *            items:
      *              $ref: '#/definitions/Document'
      */
   .get(Authenticate.authenticateUser, UserController.searchUsers)

export default router;
