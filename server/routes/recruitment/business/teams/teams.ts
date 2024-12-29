// import { OpenAPIHono } from '@hono/zod-openapi';
// import { createTeamRoute, getTeamsRoute, sendInviteRoute } from './route';
// import { EStatusCode, EUserCookies } from '@/global/config';
// import { TUser } from '@/server/types';
// import { getCookie } from 'hono/cookie';
// import {
//   createInviteService,
//   createTeamsService,
//   getTeamsService,
//   sendInviteService,
// } from '@/server/services/teams/teams-service';

// export const teams = new OpenAPIHono();

// teams.openapi(createTeamRoute, async (c) => {
//   try {
//     const { name, description } = c.req.valid('json');
//     if (!name || !description) {
//       return c.json(
//         { message: 'Invalid request body' },
//         EStatusCode.BadRequest,
//       );
//     }

//     const token = getCookie(c, EUserCookies.user) as string;
//     const user = JSON.parse(token) as TUser;
//     const { data, success, code, message } = await createTeamsService({
//       userId: user._id,
//       name,
//       description,
//     });

//     if (!success) return c.json({ message }, code);

//     return c.json(data, EStatusCode.Ok);
//   } catch (e) {
//     return c.json(
//       { message: 'Internal server error' },
//       EStatusCode.InternalServerError,
//     );
//   }
// });

// teams.openapi(getTeamsRoute, async (c) => {
//   try {
//     const token = getCookie(c, EUserCookies.user) as string;
//     const user = JSON.parse(token) as TUser;
//     const { data, success, message, code } = await getTeamsService(user._id);
//     if (!success) return c.json({ message }, code);
//     return c.json(data, EStatusCode.Ok);
//   } catch (e) {
//     return c.json(
//       { message: 'Internal server error' },
//       EStatusCode.InternalServerError,
//     );
//   }
// });

// teams.openapi(sendInviteRoute, async (c) => {
//   try {
//     const { teamId, email } = c.req.valid('json');
//     if (!email || !teamId) {
//       return c.json(
//         { message: 'Invalid request body' },
//         EStatusCode.BadRequest,
//       );
//     }

//     const token = getCookie(c, EUserCookies.user) as string;
//     const user = JSON.parse(token) as TUser;
//     if (!user)
//       return c.json(
//         { message: 'Invalid request body' },
//         EStatusCode.BadRequest,
//       );
//     const { data, success, message, code } = await createInviteService(
//       teamId,
//       user._id,
//     );

//     if (!success || !data) return c.json({ message }, code);

//     const emailService = await sendInviteService(data);
//     return c.json({ message: emailService.message }, emailService.code);
//   } catch {
//     return c.json(
//       { message: 'Internal server error' },
//       EStatusCode.InternalServerError,
//     );
//   }
// });

// export type TTeamsAPi = typeof teams;
