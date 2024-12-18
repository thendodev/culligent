import { envServer } from '@/global/envServer';
import { Connection, Mongoose } from 'mongoose';

const mongoose = new Mongoose();

const getDbConnection = (): string => {
  switch (envServer.NEXT_PUBLIC_ENVIRONMENT) {
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

const dbConnection = getDbConnection();
export const mongoDbConnection = await mongoose
  .createConnection(dbConnection)
  .asPromise();

export const isConnectionReady = (connections: Connection[]) => {
  for (const connection of connections) {
    if (connection.readyState !== mongoose.ConnectionStates.connected) {
      console.log({
        message: `could not connect to db ${connection.name}`,
      });
      process.exit(1);
    }
  }
};
