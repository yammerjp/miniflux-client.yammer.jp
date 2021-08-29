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
    const apiKey = getCookie(req, 'miniflux-api-key')
    const endpoint = getCookie(req, 'miniflux-endpoint')
    if (!apiKey || !endpoint) {
        return {errorMessage: 'Need both cookies of api-key and endpoint'}
    }
    return {client: new MinifluxApiClient(endpoint, apiKey)}
}

export {MinifluxApiClient, MinifluxApiClientGenerator}