/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */

import express from 'express';
import DocumentController from '../controllers/DocContrl';
import Authenticate from '../middleware/authenticator';

const router = express.Router();

router.route('/')
    .post(Authenticate.authenticateUser, DocumentController.createDocument);

router.route('/:id')
    .get(Authenticate.authenticateUser, DocumentController.fetchDocument)
    .put(Authenticate.authenticateUser, DocumentController.updateDocument)
    .delete(Authenticate.authenticateUser, DocumentController.deleteDocument);


export default router;
