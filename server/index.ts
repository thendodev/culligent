import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { swaggerUI } from '@hono/swagger-ui';
import { login } from './routes/auth/login/login';
import { signUp } from './routes/auth/sign-up/sign-up';
import { opt } from './routes/auth/otp/otp';
import { recruitment } from './routes/recruitment';
import { magicLink } from './routes/auth/magic-link/magic-link';
import { Dbconnect } from '@/lib/database/papr';
import { logger } from 'hono/logger';
import { MongoClient } from 'mongodb';

const app = new OpenAPIHono();

//initialize swagger
app.doc31('/api/swagger.json', {
  openapi: '3.1.0',
  info: {
    title: 'API Reference',
    version: '1.0.0',
  },
});

//set up swagger endpoint
app.get(
  'api/swagger',
  swaggerUI({
    url: '/api/swagger.json',
  }),
);

//set up scalar endpoint
app.get(
  '/api/scalar',
  apiReference({
    spec: {
      url: '/api/swagger.json',
    },
  }),
);

//connect to database
let dbConnection: void | MongoClient;
app.use('*', async (c, next) => {
  try {
    if (dbConnection) return await next();
    dbConnection = await Dbconnect();
    console.log('connected to database');
    await next();
  } catch (error) {
    console.log(error);
  }
});

//register middleware

app.use(logger());

//authentication end points
app.route('/', login);
app.route('/', signUp);
app.route('/', opt);
app.route('/', magicLink);

//recruitment
app.route('/api/recruitment', recruitment);

export { app };
