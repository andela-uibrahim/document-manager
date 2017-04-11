import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes.Roles(app);
routes.Documents(app);
routes.Users(app);
routes.Index(app);

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);
app.listen(port, () => console.log('server started'));
export default app;
