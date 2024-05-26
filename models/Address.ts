import { Country } from '@/global/country';
import papr from '@/lib/database/papr';
import { schema, types } from 'papr';

const AddressSchema = schema(
  {
    phone: types.string(),
    street: types.string(),
    secondStreet: types.string(),
    town: types.string(),
    city: types.string(),
    province: types.string(),
    postalCode: types.string(),
    country: types.string(),
    user: types.objectId({ required: true }),
  },
  {
    defaults: {
      country: Country.SouthAfrica,
    },
    timestamps: true,
  },
);

export type MAddress = (typeof AddressSchema)[0];

export default papr.model('Address', AddressSchema);
