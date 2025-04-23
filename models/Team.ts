import { mongoDbConnection } from '@/lib/database/mongoose';
import { TTeam } from '@/validations/teams';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';

const TeamSchema = new Schema<TTeam>(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    members: { type: [ObjectId], ref: 'User', default: [] },
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
);

TeamSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

export default mongoDbConnection.model('Team', TeamSchema);
