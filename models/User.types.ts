import { ObjectId } from 'mongodb';

export enum ProfileType {
  professional = 1,
  business = 2,
  dependent = 3,
}

export type UserProps = {
  name: string;
  surname: string;
  email: string;
  _id: ObjectId;
  profile?: number | undefined;
  active?: boolean;
};
