import model from '../models/';

const User = model.User;
const document = model.document;
export default {

  /**
   * Create a new User
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */
  create(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username
        }
      })
      .then((user) => {
        if (user) {
          return res
            .status(409)
            .send({ message: 'User Already Exists' });
        }
        User.roleId = req.body.roleId || 2;
        User
          .create(req.body)
          .then(newUser => res
            .status(201)
            .send({ newUser, message: 'User created successfully' }))
          .catch(error => res.status(400).send({
            error, message: `Error creating new user ${req.body.username}`
          }));
      })
      .catch(error => res.status(400).send({
        error, message: 'Error creating new User'
      }));
  },
  update(req, res) {
    return User
    .findById(req.params.UserId, {
      include: [{
        model: document,
        as: 'document',
      }],
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return user
        .update(req.body, { fields: Object.keys(req.body) })
        .then(() => res.status(200).send(user))  // Send back the updated user.
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return User
    .findById(req.params.UserId)
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: 'user Not Found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(200)
          .send({ message: 'user deleted successfully.' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
};
