import { NextApiRequest, NextApiResponse } from "next"
import {setCookie} from '../../lib/cookie'
import {MinifluxApiClient, MinifluxApiClientGenerator} from '../../lib/minifluxApiClient'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    errorableHandler(req, res).catch(e => {
        if (400 <= e.code && e.code < 600) {
            res.status(e.code).json({error_message: e.errorMessage})
        } else {
            res.status(500).json({error_message: `${e}`})
        }
    })
}

async function errorableHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return errorableGettHandler(req, res)
    }
    res.status(405).json({error_message: "Method Not Allowed (allowed get or post)"})
}
    
async function errorableGettHandler(req: NextApiRequest, res: NextApiResponse) {
    const {client, errorMessage} = MinifluxApiClientGenerator(req)
    if (errorMessage) {
        res.status(200).json({logged_in: false})
        return
    }
    const response = await client.entries()
    res.status(200).json(response)
}