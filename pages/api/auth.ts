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
    if (req.method === 'POST') {
        return errorablePostHandler(req, res)
    }
    if (req.method === 'GET') {
        return errorableGettHandler(req, res)
    }
    res.status(405).json({error_message: "Method Not Allowed (allowed get or post)"})
}
    
async function errorablePostHandler(req: NextApiRequest, res: NextApiResponse) {
    const apiKey = req.body?.miniflux_api_key as string | undefined
    const endpoint = req.body?.miniflux_endpoint as string | undefined 
    if (!apiKey && !endpoint) {
        res.status(400).json({logged_in: false, error_message: 'Invalid request body'})
        return
    }
    const client = new MinifluxApiClient(endpoint, apiKey)
    const logged_in = await client.logged_in()
    if (!logged_in) {
        res.status(200).json({logged_in: false})
        return
    }
    console.log(`apiKey: ${apiKey}, endpoint: ${endpoint}`)
    setCookie(res, 'miniflux-api-key', apiKey)
    setCookie(res, 'miniflux-endpoint', endpoint)
    res.status(200).json({logged_in: true})
}

async function errorableGettHandler(req: NextApiRequest, res: NextApiResponse) {
    const {client, errorMessage} = MinifluxApiClientGenerator(req)
    if (errorMessage) {
        res.status(200).json({logged_in: false})
        return
    }
    const logged_in = await client.logged_in()
    res.status(200).json({logged_in})
}