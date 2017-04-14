import DocumentsRoute from './document';
import RolesRoute from './role';
import UsersRoute from './user';

/**
 * IndexRoute contains all the routes for the api
 */
class IndexRoute {
/**
 * Index IndexRoute for catch all
 * @param{Object} app express app
 * @return{Void} return void
 */
  static Index(app) {
    app.all('/api/*', (req, res) => {
      res.status(200).send({
        message: 'welcome to document management api'
      });
    });
  }
/**
 * Roles Route
 * @param{Object} app express app
 * @return{Void} return void
 */
  static Roles(app) {
    app.use('/api/roles', RolesRoute);
  }
/**
 * Users Route
 * @param{Object} app express app
 * @return{Void} return void
 */
  static Users(app) {
    app.use('/api/users', UsersRoute);
  }
/**
 * Documents Route
 * @param{Object} app express app
 * @return{Void} return void
 */
  static Documents(app) {
    app.use('/api/documents', DocumentsRoute);
  }

}
export default IndexRoute;
