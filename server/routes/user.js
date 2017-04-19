/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import express from 'express';
import Controller from '../controllers';
import Authenticator from '../middleware/authenticator';

const UserController = Controller.user;
const DocumentController = Controller.document;
const router = express.Router();

router.route('/')
  .get(Authenticator.authenticateUser, UserController.fetchAllUsers)
  .post(UserController.createUser);

router.route('/login')
  .post(UserController.loginUser);

router.route('/logout')
  .post(UserController.logoutUser);

router.route('/:id')
  .get(Authenticator.authenticateUser,
  Authenticator.authenticateAdmin, UserController.fetchUser)
  .delete(Authenticator.authenticateUser,
  Authenticator.authenticateAdmin, UserController.deleteUser)
  .put(Authenticator.authenticateUser, UserController.updateUser);

router.route('/admin')
  .post(Authenticator.authenticateUser,
  Authenticator.authenticateAdmin, UserController.createAdmin);

router.route('/:id/documents')
  .get(Authenticator.authenticateUser, DocumentController.fetchUserDocument);

export default router;
