import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { swaggerUI } from '@hono/swagger-ui';
import { login } from './routes/auth/login/login';
import { signUp } from './routes/auth/sign-up/sign-up';
import { otp } from './routes/auth/otp/otp';
import { recruitment } from './routes/recruitment';
import { magicLink } from './routes/auth/magic-link/magic-link';
import { logger } from 'hono/logger';
import { isConnectionReady, mongoDbConnection } from '@/lib/database/mongoose';
import { search } from './routes/search';
import { userSettings } from './routes/user/user-settings/user-settings';
import { user } from './routes/user';

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

app.use('*', logger());

//connect to database
let dbConnection: any;

app.use('*', async (c, next) => {
  try {
    if (dbConnection) return await next();

    if (!mongoDbConnection) throw new Error('no DbConnection');
    isConnectionReady([mongoDbConnection]);

    await next();
  } catch (error) {
    console.log(error);
    throw error;
  }
});

//register middleware

app.use(logger());

//authentication end points
app.route('/', login);
app.route('/', signUp);
app.route('/', otp);
app.route('/', magicLink);

//user
app.route('/api/user', user);
//recruitment
app.route('/api/recruitment', recruitment);
app.route('/api/search', search);

export { app };
