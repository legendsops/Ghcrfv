import clientPromise from '../../utils/db';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('animes');

  if (req.method === 'GET') {
    const animes = await collection.find({}).toArray();
    return res.status(200).json(animes);
  }

  if (req.method === 'POST') {
    const token = req.headers['admin-token'];
    if (token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
    const newAnime = req.body;
    const result = await collection.insertOne(newAnime);
    return res.status(201).json({ ...newAnime, _id: result.insertedId });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
