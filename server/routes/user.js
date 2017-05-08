/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import express from 'express';
import Controller from '../controllers';
import Authenticator from '../middleware/authenticator';

const UserController = Controller.user;
const DocumentController = Controller.document;
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - firstname
 *       - lastname
 *       - username
 *       - email
 *       - password
 *     properties:
 *       firstname:
 *         type: string
 *         example: Han
 *       lastname:
 *         type: string
 *         example: Solo
 *       username:
 *         type: string
 *         example: g-pirate
 *       password:
 *         type: string
 *         format: password
 *         example: millenium-falcon
 *       email:
 *         type: string
 *         example: hansolo@documan.api
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 *   NewLogin:
 *    type: object
 *    required:
 *      - email
 *      - password
 *    properties:
 *      email:
 *        type: string
 *      password:
 *        type: string
 *        format: password
 *   Login:
 *    allOf:
 *      - $ref: '#/definitions/NewLogin'
 *
 */
router.route('/')

/**
     * @swagger
     * /api/users:
     *    get:
     *      description: Returns all users
     *      tags:
     *        - Get users
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
     *              $ref: '#/definitions/User'
     */
   /** @swagger
     *  /api/users/?limit=4&offset=2:
     *   get:
     *     description: Returns {limit} users from the the {offset}
     *     tags:
     *       - Get users with limit
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
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/User'
     */
  .get(Authenticator.authenticateUser, UserController.fetchAllUsers)

     /**
     * @swagger
     * /api/users:
     *   post:
     *     description: Creates a user
     *     tags:
     *      - Create User
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewUser'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/User'
     */
  .post(UserController.createUser);

router.route('/login')
  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     description: Logs in a user
   *     tags:
   *      - Login User
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
   *           $ref: '#/definitions/NewLogin'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *          type: object,
   *          items:
   *            $ref: '#/definitions/Login'
   */

  .post(UserController.loginUser);

router.route('/logout')
  .post(UserController.logoutUser);

router.route('/:id')
  /**
   * @swagger
   * /api/users/1:
   *    get:
   *      description: Returns the user with the id of 1
   *      tags:
   *        - Get user
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
   *              $ref: '#/definitions/User'
   */
  .get(Authenticator.authenticateUser, UserController.fetchUser)

   /**
     * @swagger
     * /api/users/1:
     *    delete:
     *      description: Deletes the user with the id of 1
     *      tags:
     *        - Delete user
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
     *              $ref: '#/definitions/User'
     */
  .delete(Authenticator.authenticateUser,
  Authenticator.authenticateAdmin, UserController.deleteUser)
   /**
     * @swagger
     * /api/users/1:
     *   put:
     *     description: Creates a user
     *     tags:
     *      - Update User
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
     *           $ref: '#/definitions/NewUser'
     *     responses:
     *       200:
     *         description: users
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/User'
     */
  .put(Authenticator.authenticateUser, UserController.updateUser);

router.route('/admin')
 
     /**
     * @swagger
     * /api/users/admin:
     *   post:
     *     description: Creates a user
     *     tags:
     *      - Create Admin
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewUser'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/User'
     */
  .post(Authenticator.authenticateUser,
  Authenticator.authenticateAdmin, UserController.createAdmin);

router.route('/verify')
  .post(Authenticator.isTokenActive)
  
router.route('/:id/documents')
/**
   * @swagger
   * /api/users/{param}/documents:
   *    get:
   *      description: Returns the documents belonging to the user of id 1
   *      tags:
   *        - Get Documents of A User
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
   *          description: user's documents
   *          schema:
   *            type: array
   */
  .get(Authenticator.authenticateUser, DocumentController.fetchUserDocument);

export default router;
