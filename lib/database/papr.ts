import { envServer } from '@/global/envServer';
import { MongoClient } from 'mongodb';
import Papr from 'papr';

const papr = new Papr();
export let client: MongoClient;

const getDbConnection = () => {
  switch (envServer.NEXT_PUBLIC_ENVIRONMENT) {
    case undefined:
      return console.log('no enviroment defined');
    case 'development':
      return envServer.DEV_MONGO_URI;
    case 'production':
      return envServer.PROD_MONGO_URI;
    case 'uat':
      return envServer.UAT_MONGO_URI;
    default:
      envServer.DEV_MONGO_URI;
  }
};

//

export async function Dbconnect(): Promise<MongoClient | void> {
  const dbConnection = getDbConnection();
  if (!dbConnection) return console.log('no connection');
  client = await MongoClient.connect(dbConnection);

  papr.initialize(client.db(envServer.DATABASE_NAME));

  await papr.updateSchemas();
}

export async function Dbdisconnect() {
  const dbConnection = getDbConnection();

  if (!dbConnection) return console.log('no connection');
  client = await MongoClient.connect(dbConnection);
  await client.close();
}

export default papr;
