import { OpenAPIHono } from '@hono/zod-openapi';
import { userSettings } from './user-settings/user-settings';

export const user = new OpenAPIHono();

user.route('/settings', userSettings);
