/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */

import express from 'express';
import DocumentController from '../controllers/DocContrl';
import Authenticate from '../middleware/authenticator';

const router = express.Router();

/**
 * @swagger
 * definition:
 *   Puppy:
 *     properties:
 *       name:
 *         type: string
 *       breed:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 */

/**
 * @swagger
 * /api/puppies:
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */
router.route('/')
    .post(Authenticate.authenticateUser, DocumentController.createDocument);

router.route('/:id')
    .get(Authenticate.authenticateUser, DocumentController.fetchDocument)
    .put(Authenticate.authenticateUser, DocumentController.updateDocument)
    .delete(Authenticate.authenticateUser, DocumentController.deleteDocument);


export default router;
