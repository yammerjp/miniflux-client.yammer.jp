import { NextApiRequest, NextApiResponse } from "next"
import fetch from 'node-fetch'
import { parse } from 'node-html-parser'
// import {MinifluxApiClient, MinifluxApiClientGenerator} from '../../lib/minifluxApiClient'

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
    res.status(405).json({error_message: "Method Not Allowed (allowed get or post)"})
}
    
async function errorablePostHandler(req: NextApiRequest, res: NextApiResponse) {
    const url = req.body?.url
    if (typeof url !== 'string') {
        res.status(400).json({error_message: 'Invalid Request Body (Need JSON with the key of "url")'})
        return
    }
    
    const response = await fetch(url).then(res => res.text())
    const image_url = parse(response)?.querySelector('meta[property="og:image"]')?.rawAttributes?.content
    res.status(200).json({image_url})
}