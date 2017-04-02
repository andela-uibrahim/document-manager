export default {
  /**
   * isAdmin - Verify if the requester is an admin
   * @param  {Object} req Request Object
   * @param  {Object} res Response Object
   * @returns {Boolean} returns true or false
   */
  isAdmin(req) {
    return req.decoded.data.RoleId === 1;
  },

  /**
   * isOwner - checks if a user is the owner of a document
   * @param {Object} req      Request object
   * @param {Object} res      Response object
   * @param {Object} document the document to compare with
   * @returns {Boolean} returns true or false
   */
  isOwner(req, res, document) {
    const itemToCheck = document ? String(document.UserId) : req.params.id;
    return String(req.decoded.data.id) === itemToCheck;
  },
};
