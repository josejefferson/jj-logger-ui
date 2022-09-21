import { MongoClient } from 'mongodb'
import { jsonParse } from '../../utils/json'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const mongoURL = req.query.url as string
	const mongoCollection = (req.query.collection || 'logs') as string
	const filter = jsonParse(req.query.q)
	if (!mongoURL) {
		return res.status(400).json({ error: 'Invalid `url` query parameter' })
	}

	const client = await MongoClient.connect(mongoURL)
	const collection = client.db().collection(mongoCollection)
	const result = await collection.find(filter).toArray()

	res.json(result)
}
