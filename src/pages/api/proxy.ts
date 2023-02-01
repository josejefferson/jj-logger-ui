import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (typeof req.query.url !== 'string') return
	const { url, ...query } = req.query
	const { authorization } = req.headers

	const response = await axios.get(url, {
		headers: authorization ? { authorization } : {},
		params: query,
		validateStatus: () => true
	})

	res.status(response.status).json(response.data)
}
