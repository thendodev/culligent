import { mongoDbConnection } from '@/lib/database/mongoose';
import { EAutoCompleteOptionsType } from '@/validations/autoComplete';
import { Schema } from 'mongoose';

const QuerySchema = new Schema({
  query: {
    type: String,
    required: true,
  },
});

const AutoCompleteSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(EAutoCompleteOptionsType),
    required: true,
  },
  queries: {
    type: [QuerySchema],
    required: true,
  },
});

export default mongoDbConnection.model('AutoComplete', AutoCompleteSchema);
