import { envServer } from '@/global/envServer';
import { MongoClient } from 'mongodb';

export let client: MongoClient;

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
      envServer.DEV_MONGO_URI;
  }
};

//

export async function Dbdisconnect() {
  const dbConnection = getDbConnection();

  if (!dbConnection) return console.log('no connection');
  client = await MongoClient.connect(dbConnection);
  await client.close();
}
