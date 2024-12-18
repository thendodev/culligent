import { mongoDbConnection } from '@/lib/database/mongoose';
import { TTeamInvite } from '@/validations/teams';
import { Schema } from 'mongoose';

const InviteSchema = new Schema<TTeamInvite>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    inviteHash: { type: String, required: true },
    status: { type: String, required: true },
    isValid: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

InviteSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

export default mongoDbConnection.model('Invite', InviteSchema);
