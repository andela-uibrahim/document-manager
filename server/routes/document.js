/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */

import express from 'express';
import DocumentController from '../controllers/DocumentController';
import Authenticator from '../middleware/authenticator';

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   NewDocument:
 *     type: object
 *     required:
 *       - title
 *       - content
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: text
 *   Document:
 *     allOf:
 *       - $ref: '#/definitions/NewDocument'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
router.route('/')
    /**
     * @swagger
     * /api/documents:
     *   get:
     *     description: Creates a document
     *     tags:
     *      - Create Document
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewDocument'
     *     responses:
     *       200:
     *         description: users
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/Document'
     */
<<<<<<< HEAD
    .get(Authenticator.authenticateUser, DocumentController.fetchDocuments)
=======
    .get(Authenticate.authenticateUser, DocumentController.fetchDocuments)
>>>>>>> 9ff95dfaad21812046663097799073be7f6fc412
    /**
     * @swagger
     * /api/documents:
     *   post:
     *     description: Creates a document
     *     tags:
     *      - Create Document
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewDocument'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/Document'
     */
    .post(Authenticator.authenticateUser, DocumentController.createDocument);

router.route('/:id')
    /** @swagger
      *  /api/documents/:id:
      *   get:
      *     description: Returns {limit} documents from the the {offset}
      *     tags:
      *       - Get single document
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
    .get(Authenticator.authenticateUser, DocumentController.fetchDocument)
     /**
     * @swagger
     * /api/documents/:id:
     *   put:
     *     description: Update  a document
     *     tags:
     *      - Update a Document
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewDocument'
     *     responses:
     *       200:
     *         description: users
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/Document'
     */
    .put(Authenticator.authenticateUser, DocumentController.updateDocument)
        /**
     * @swagger
     * /api/documents/1:
     *    delete:
     *      description: Deletes the document with the id of 1
     *      tags:
     *        - Delete document
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *      responses:
     *        200:
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/Document'
     */
    .delete(Authenticator.authenticateUser, DocumentController.deleteDocument);


export default router;
