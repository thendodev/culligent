import { Schema } from 'mongoose';
import { Country } from '@/global/country';
import { mongoDbConnection } from '@/lib/database/mongoose';

const AddressSchema = new Schema(
  {
    phone: String,
    street: String,
    secondStreet: String,
    town: String,
    city: String,
    province: String,
    postalCode: String,
    country: { type: String, default: Country.SouthAfrica },
    user: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoDbConnection.model('Address', AddressSchema);
