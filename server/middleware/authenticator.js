import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET || 'thisisademosecret';
/**
 * Class to implement authentication middlewares
 */
class Authenticator {
  /**
   * Method to authenticate a user before proceeding
   * to protected routes
   * @param {Object} req - The req Object
   * @param {Object} res - The res Object
   * @param {Function} next - Function call to move to the next middleware
   * or endpoint controller
   * @return {Void} - Returns void
   */
  static authenticateUser(req, res, next) {
    const token = req.headers.authorization ||
      req.headers['x-access-token'] ||
      req.body.token;
    if (token) {
      jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
          res.status(401).send({
            status: 'Failed',
            message: 'Authentication failed due to invalid token!'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401).json({
        status: 'Failed',
        message: 'Authentication required for this route'
      });
    }
  }

  /**
   * Method to generate a token for a user
   * @param{Object} user - User Object
   * @return{String} - Token string
   */
  static generateToken(user) {
    return jwt.sign({
      UserId: user.id,
      RoleId: user.RoleId,
      user: user.username
    }, SECRET_KEY, { expiresIn: 86400 });
  }
  /**
   * Method to verify that user is an Admin
   * to access Admin endpoints
   * @param{Object} req - req Object
   * @param{Object} res - res Object
   * @param{Object} next - Function to pass flow to the next controller
   * @return{Void} - returns Void
   */
  static authenticateAdmin(req, res, next) {
    const RoleId = req.decoded.RoleId;
    if (RoleId === 1) {
      next();
    } else {
      res.status(401).send({
        success: false,
        message: 'You are not permitted to perform this operation'
      });
    }
  }

  /**
   * isTokenActive - get current information of active user i.e from token
   * sent with the request
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static isTokenActive(req, res) { 
    jwt.verify(req.body.token, SECRET_KEY, (err) => {
      if(err){
        return res.status(401).send({ message: 'Token expired' })
       }
       return res.status(200).send({
         message: 'valid token' 
       }); 
    });
  }
}
export default Authenticator;
