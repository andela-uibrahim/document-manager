import swaggerJSDoc from 'swagger-jsdoc';
import express from 'express';

const router = express.Router();

  // swagger definition
const swaggerDefinition = {
  info: {
    title: 'Docman',
    version: '1.0.0',
    description: 'Demonstrating Docman RESTful API with Swagger',
  }
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/routes/document.js', './server/routes/user.js',
   './server/routes/role.js',  './server/routes/search.js']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);


router.route('/')
  .get((req, res) => {
      res.send(swaggerSpec);
  });

export default router;
