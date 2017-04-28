/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import model from '../models';
import Authenticate from '../middleware/authenticator';
import DocumentHelper from './helper/DocHelper';

const Users = model.User;

/**
 * Controller for Users
 */
class UserController {
    /**
     * Method to set the various document routes
     * @param{Object} req - Server req
     * @return{Object} return req parameters
     */
  static postreq(req) {
    return (
        req.body &&
        req.body.username &&
        req.body.firstname &&
        req.body.lastname &&
        req.body.password &&
        req.body.email
    );
  }
  /**
   * Method used to create new user
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static createUser(req, res) {
    if (UserController.postreq(req)) {
      return Users
        .create({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          RoleId: 2
        }).then(user => res.status(201).send({
          success: true,
          message: 'User successfully signed up',
          RoleId: user.RoleId,
          token: Authenticate.generateToken(user)
        })).catch(error => res.status(409).send({
          success: UserController.postreq(req),
          message: error.message,
          error: error.errors[0].message
        }));
    }
    res.status(400).send({
      success: false,
      message: 'You did not input your field properly'
    });
  }

 /**
   * Method used to login a user
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static loginUser(req, res) {
    Users.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (user && user.passwordMatched(req.body.password)) {
          const token = Authenticate.generateToken(user);
          res.status(201).send({
            message: 'login successfully',
            token,
            expiresIn: 86400
          });
        } else {
          res.status(401).send({
            success: false,
            message: 'Failed to Authenticate User, Invalid Credentials'
          });
        }
      });
  }
  /**
   * Method used to logout user
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static logoutUser(req, res) {
    res.send({
      success: true,
      message: 'User logged out successfully'
    });
  }



/**
 * Method used to fetch all users
 * @param{Object} req - Server req
 * @param{Object} res - Server res
 * @returns{Void} return Void
 */
  static fetchAllUsers(req, res) {
    let queryParams = {
      limit: 10,
      offset: 0
    };
    if (req.query.limit && req.query.offset) {
      queryParams = {
        limit: req.query.limit,
        offset: req.query.offset
      };
    }
    Users.findAndCountAll({})
      .then((users) => {
        const paginateResult = DocumentHelper
        .paginateResult(users, queryParams.offset, queryParams.limit);
        res.status(201).send({
          users: users.rows,
          pageCount: paginateResult.pageCount
         });
      })
      .catch((err) => {
        res.status(500).send({ error: err.message });
      });
  }

  /**
 * Method used to fetch user by their ID
 * @param{Object} req - Server req
 * @param{Object} res - Server res
 * @returns{Void} return Void
 */
  static fetchUser(req, res) {
    Users.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (user) {
          res.status(200).send(user);
        } else {
          res.status(404).send({
            success: false,
            message: 'User not found'
          });
        }
      });
  }

   /**
   * Method used to Update user info
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static updateUser(req, res) {
    const UserId = req.decoded.UserId;
    let RoleId = req.decoded.RoleId
    Users.findOne({
      where: { id: req.params.id }
    }).then((user) => {
      if (user) {
        if (RoleId === 1) {
          user.update(req.body, {fields: Object.keys(req.body)})
            .then(updatedUser => res.status(201).send(updatedUser));
        } else if (UserId === user.id && RoleId === 2) {
          const updateProps = Object.keys(req.body);        
          user.update(req.body, {fields: updateProps})
          .then(updatedUser => {
            return res.status(201).send(updatedUser)
          });
        } else {
          res.status(401).send({
            success: false,
            message: 'Unauthorized'
          });
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'User not found'
        });
      }
    }).catch((error) => {
      res.status(401).send({
        success: false,
        message: error.message
      });
    });
  }

/**
 * Method used to delete user
 * only accessible to admin
 * @param{Object} req - Server req
 * @param{Object} res - Server res
 * @returns{Void} return Void
 */
  static deleteUser(req, res) {
    Users.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (user) {
          user.destroy()
            .then(() => res.status(200).send({
              success: true,
              message: 'User Successfully deleted from database'
            }));
        } else {
          res.status(404).send({
            success: false,
            message: 'User not found'
          });
        }
      });
  }

  /**
 * Method used to create admin user, only accessible to admin user(s).
 * @param{Object} req - Server req
 * @param{Object} res - Server res
 * @returns{Void} return Void
 */
  static createAdmin(req, res) {
    Users.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      email: req.body.email,
      RoleId: 1
    }).then((adminUser) => {
      res.status(201).send({
        success: false,
        message: 'Admin user successfully created',
        RoleId: adminUser.RoleId,
        token: Authenticate.generateToken(adminUser)
      });
    }).catch((error) => {
      res.status(409).send({
        success: false,
        message: error.message,
        error: error.errors[0].message
      });
    });
  }

/**
 * Fetch specific document in the database
 * Admin has access to all the documents
 * Users only have access to their private
 * documents and all other public documents.
 * @param{Object} req - Server req
 * @param{Object} res - Server res
 * @return {Void} - returns Void
 */
  static fetchUsers(req, res) {
    let queryBuilder = {
      limit: 10,
      offset: 0
    };
    if (req.query.limit || req.query.offset) {
       queryBuilder = {
         limit: req.query.limit,
         offset: req.query.offset || 0
       };
    }
    if (req.query.search) {
        let searchQuery = req.query.search;
        searchQuery = DocumentHelper.sanitizeString(searchQuery);
        queryBuilder.where = {
          $or:
          [
            {
              username: { $like: `%${searchQuery}%` }
            }, {
              firstname: { $like: `%${searchQuery}%` }
            }, {
              lastname: { $like: `%${searchQuery}%` }
            }, {
              email: { $like: `%${searchQuery}%` }
            }
          ]
        };
      }
    Users.findAndCountAll(queryBuilder)
      .then((users) => {
        const paginateResult = DocumentHelper
        .paginateResult(users, queryBuilder.offset, queryBuilder.limit);
        res.status(201).send({
          users: users.rows,
          pageCount: paginateResult.pageCount
         });
      })
      .catch((err) => {
        res.status(500).send({ error: err.message });
      });
  }

}
export default UserController;
