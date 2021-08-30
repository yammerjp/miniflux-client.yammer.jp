import { NextApiRequest } from 'next'
import fetch from 'node-fetch'
import {getCookie} from './cookie'

class MinifluxApiClient {
    constructor(endpoint: string, key: string) {
        this.endpoint = endpoint
        this.key = key
    }
    endpoint!: string
    key!: string
    async logged_in() {
        const res = await fetch(`${this.endpoint}/v1/me`, { headers: { 'X-Auth-Token':  this.key}}).then(res => res.json())
        return (typeof res.id === 'number')
    }
}

function MinifluxApiClientGenerator(req: NextApiRequest): {client?: MinifluxApiClient, errorMessage?: string} {
    try {
        const {apiKey, endpoint} = JSON.parse(getCookie(req, 'miniflux-connection-config'))
        if (typeof apiKey === 'string' && typeof endpoint === 'string') {
            return {client: new MinifluxApiClient(endpoint, apiKey)}
        }
    } catch {}
    return {errorMessage: 'Need both cookies of api-key and endpoint'}
}

export {MinifluxApiClient, MinifluxApiClientGenerator}