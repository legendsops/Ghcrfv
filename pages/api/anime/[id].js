import { ObjectId } from 'mongodb';
import clientPromise from '../../utils/db';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('animes');

  if (req.method === 'PUT') {
    const token = req.headers['admin-token'];
    if (token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
    const updated = req.body;
    delete updated._id;
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updated });
    return res.status(200).json({ message: 'Updated' });
  }

  if (req.method === 'DELETE') {
    const token = req.headers['admin-token'];
    if (token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
    await collection.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ message: 'Deleted' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
