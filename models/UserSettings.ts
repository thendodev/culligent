import { mongoDbConnection } from '@/lib/database/mongoose';
import {
  EPostView,
  TPostSettings,
  TUserSettings,
} from '@/validations/user-settings';
import { Schema } from 'mongoose';

const PostSettingsSchema = new Schema<TPostSettings>(
  {
    view: {
      type: String,
      enum: EPostView,
      default: EPostView.CARDS,
    },
  },
  {
    id: false,
  },
);

const UserSettingsSchema = new Schema<TUserSettings>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    post: PostSettingsSchema,
  },
  {
    timestamps: true,
  },
);

export default mongoDbConnection.model('UserSettings', UserSettingsSchema);
