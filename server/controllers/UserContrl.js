/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import jwt from 'jsonwebtoken';
import model from '../models';
import Authenticate from '../middleware/authenticator';

const Users = model.User;
const SECRET_KEY = process.env.SECRET || 'thisisademosecret';

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
        .create(req.body).then(user => res.status(201).send({
          success: true,
          message: 'User successfully signed up',
          RoleId: 2,
          token: Authenticate.generateToken(user)
        })).catch(error => res.status(409).send({
          success: false,
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
    Users.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user && user.passwordMatched(req.body.password)) {
          const token = jwt.sign({
            UserId: user.id,
            RoleId: user.RoleId
          }, SECRET_KEY, { expiresIn: 86400 });
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

}
export default UserController;
