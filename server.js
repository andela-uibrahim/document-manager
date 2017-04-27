import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import routes from './server/routes';


// Set up the express app
const app = express();

if (process.env.NODE_ENV !== ('production' && 'test' && 'travis')) {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}


app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.static(path.resolve(__dirname + '/api-docs')));


// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


routes.Roles(app);
routes.Documents(app);
routes.Users(app);
routes.Search(app);
routes.Swagger(app);
routes.SwaggerUI(app);
routes.Index(app);

app.all('*', (req, res) => {
  res.sendFile(`${__dirname}/client/dist/index.html`);
});

const port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, () => console.log('server started'));
export default app;
