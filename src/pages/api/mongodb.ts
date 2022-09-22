import { MongoClient } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { jsonParse } from '../../utils/json'

const knownServers = new Map()

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const mongoURL = req.query.url as string
	const mongoCollection = (req.query.collection || 'logs') as string
	const filter = jsonParse(req.query.q)
	let afterDate: Date | undefined = new Date(req.query.after as string)
	if (isNaN(Number(afterDate))) afterDate = undefined
	const afterDateObj = afterDate ? { date: { $gt: afterDate } } : {}

	if (!mongoURL) {
		return res.status(400).json({ error: 'Invalid `url` query parameter' })
	}

	const client =
		knownServers.get(mongoURL) || (await MongoClient.connect(mongoURL))
	knownServers.set(mongoURL, client)
	const collection = client.db().collection(mongoCollection)
	const result = await collection.find({ ...filter, ...afterDateObj }).toArray()

	res.json(result)
}
