import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ServerApiVersion } from "mongodb";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URL!);
  const InitialDate =
    process.env.NEXT_PUBLIC_DATE! || "Jan 1, 1970, 00:00:00.000 GMT";
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const Connection = async () => {
    try {
      const database = client.db("Quotable");
      const collection = database.collection("Quotes");
      const diff =
        (new Date().getTime() - new Date(InitialDate).getTime()) /
        millisecondsPerDay;
      const id = (Math.floor(diff) + 1) % 360;
      const query = { Id: `${id}` };
      const data = await collection.findOne(query);
      return data;
    } catch (err) {
      return err;
    } finally {
      await client.close();
    }
  };
  return Connection()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ name: `error: ${err}` });
    });
}
