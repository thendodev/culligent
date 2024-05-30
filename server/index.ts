import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { swaggerUI } from '@hono/swagger-ui';
import { login } from './routes/auth/login/login';
import { signUp } from './routes/auth/sign-up/sign-up';
import { opt } from './routes/auth/otp/otp';
import { logger } from './middleware/logger';
import { recruitment } from './routes/recruitment';
const app = new OpenAPIHono();

//initailaize swagger
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

//register middleware

app.use(logger);

//authentification end points
app.route('/', login);
app.route('/', signUp);
app.route('/', opt);

//recruitment
app.route('/api/recruitment', recruitment);

export { app };
