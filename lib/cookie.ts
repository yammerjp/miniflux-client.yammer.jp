import { NextApiRequest, NextApiResponse } from "next"
import cookie from 'cookie'

function getCookie(req: NextApiRequest, key: string): string | undefined {
    const cookieHeaderString = req.headers.cookie
    if (!cookieHeaderString) {
        return undefined
    }
    const cookies = cookie.parse(cookieHeaderString)
    return cookies[key]
}

function setCookie(res: NextApiResponse, key: string, value: string) {
    const before = res.getHeader('Set-Cookie')
    const new_serialized = cookie.serialize(key, value, {
        httpOnly: true,
        // secure: true,
        sameSite: 'lax',
        expires: new Date(2030, 1, 1)
    })
    res.setHeader('Set-Cookie', new_serialized)
}

export {getCookie, setCookie}