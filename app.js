import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import methodOverride from 'method-override';

import { globals, setGlobals } from './config/globals';
import { ExceptionHandler } from './app/utils/exceptions';
import routes from './config/routes';


// express instance to make server
const app = express();


// setting instances to globals
setGlobals({ app });


// to log every request to the console
app.use(logger('dev'));


// set static files (css and images, etc) location
app.use(express.static('public'));


// setting up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// enabling cors on all routes
app.use(cors({
  origin: '*',
  methods: 'GET, PUT, PATCH, POST, DELETE',
  allowedHeaders: 'Content-Type, Authorization, Content-Length',
  maxAge: 86400,
  optionsSuccessStatus: 200,
}));


// setting up routes for our app
app.use('/', routes);


// Global Error Handler
app.use(methodOverride());
app.use((err, req, res, next) => { new ExceptionHandler(res, err) }); // eslint-disable-line


// starting the server
app.listen(globals.config.api.port, globals.config.api.host, () => {
  console.log(`Server listening on ${globals.config.api.host}:${globals.config.api.port}`);
});
