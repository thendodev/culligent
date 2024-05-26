import { ObjectId } from 'mongodb';

export enum ProfileType {
  independent = 1,
  company = 2,
  employee = 3,
}

export type UserProps = {
  name: string;
  surname: string;
  email: string;
  _id: ObjectId;
  profile?: number | undefined;
  active?: boolean;
};
