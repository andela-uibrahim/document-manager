/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */

import express from 'express';
import DocumentController from '../controllers/DocContrl';
import UserController from '../controllers/UserContrl';
import Authenticate from '../middleware/authenticator';

const router = express.Router();

router.route('/documents/')
    .get(Authenticate.authenticateUser, DocumentController.fetchDocuments)

router.route('/users/')
   .get(Authenticate.authenticateUser, UserController.fetchUsers)

export default router;
