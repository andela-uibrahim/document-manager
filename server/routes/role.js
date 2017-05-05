/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import express from 'express';
import RoleController from '../controllers/RoleController';
import Authenticator from '../middleware/authenticator';

const router = express.Router();
/**
 * @swagger
 * definitions:
 *   NewRole:
 *     type: object
 *     required:
 *       - role
 *     properties:
 *       role:
 *         type: string
 *   Role:
 *     allOf:
 *       - $ref: '#/definitions/NewRole'
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
     * /api/roles:
     *    get:
     *      description: Returns all roles
     *      tags:
     *        - Get roles
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
     *          description: roles
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/Role'
     */
    .get(Authenticator.authenticateUser,
    Authenticator.authenticateAdmin, RoleController.fetchRoles)
    /**
     * @swagger
     * /api/roles:
     *   post:
     *     description: Creates a role
     *     tags:
     *      - Create Role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: Role object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewRole'
     *     responses:
     *       201:
     *         description: role
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/Role'
     */
    .post(Authenticator.authenticateUser,
   Authenticator.authenticateAdmin, RoleController.createRole);

router.route('/:id')
    /**
     * @swagger
     * /api/roles/:id:
     *    delete:
     *      description: Deletes the role with the id of "id"
     *      tags:
     *        - Delete role
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
     *          description: message
     *          schema:
     *            type: object
     *            items:
     *              $ref: '#/definitions/Role'
     */
    .delete(Authenticator.authenticateUser,
    Authenticator.authenticateAdmin, RoleController.deleteRole);

export default router;
