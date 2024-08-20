import papr from '@/lib/database/papr';
import { types, schema } from 'papr';

const ActivityLog = schema(
  {
    route: types.string({ required: true }),
    user: types.string(),
    permission: types.object({
      level: types.string({ required: true }),
      isAccess: types.boolean({ required: true }),
    }),
    activity: types.object({
      action: types.object({
        description: types.string({ required: true }),
        status: types.number({ required: true }),
      }),
      error: types.object({
        stack: types.string({ required: true }),
        message: types.string({ required: true }),
      }),
    }),
  },
  {
    timestamps: true,
  },
);

export type TActivity = (typeof ActivityLog)[0];

export default papr.model('ActivityLog', ActivityLog);
