import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true,
});

async function getDb() {
  await client.connect();
  const db = client.db("multitank");
  return db;
}

export async function saveUser(name, email, password) {
  const db = await getDb();
  const collection = db.collection("users");

  const user = await collection.insertOne({ name, email, password });
  return user.insertedId.toString();
}

export async function loginUser(email, password) {
  const db = await getDb();
  const collection = db.collection("users");

  const user = await collection.findOne({ email, password });
  return user._id.toString();
}
