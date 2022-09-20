import { MongoClient } from 'mongodb'
import { jsonParse } from '../../utils/json'

export default async function handler(req, res) {
  const mongoURL = req.query.url
  const mongoCollection = req.query.collection || 'logs'
  const filter = jsonParse(req.query.q)
  if (!mongoURL) return res.status(400).json({ error: 'Invalid `url` query parameter' })

  const client = await MongoClient.connect(mongoURL)
  const collection = client.db().collection(mongoCollection)
  const result = await collection.find(filter).toArray()

  res.json(result)
}