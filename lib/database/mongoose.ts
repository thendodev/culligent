import { envServer } from '@/global/envServer';
import { Mongoose } from 'mongoose';

const mongoose = new Mongoose();

const getDbConnection = () => {
  switch (envServer.NEXT_PUBLIC_ENVIRONMENT) {
    case undefined:
      return console.log('no environment defined');
    case 'development':
      return envServer.DEV_MONGO_URI;
    case 'production':
      return envServer.PROD_MONGO_URI;
    case 'uat':
      return envServer.UAT_MONGO_URI;
    default:
      return envServer.DEV_MONGO_URI;
  }
};

export const connectDatabase = async () => {
  const dbConnection = getDbConnection();
  if (!dbConnection) return console.log('no connection');
  try {
    await mongoose.connect(dbConnection).then(() => {
      console.log('successfully connected to database');
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
