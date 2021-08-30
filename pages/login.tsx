import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [endpoint, setEndpoint] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [message, setMessage] = useState('')

  const login = async (endpoint: string, apiKey: string): Promise<boolean> => {
    const {logged_in} = await fetch('/api/auth', {method: "POST", body: JSON.stringify({
      miniflux_api_key: apiKey,
      miniflux_endpoint: endpoint
    }), headers: { 'Content-Type': 'application/json'}}).then(res => res.json())
    console.log(`endpoint: ${endpoint}, apiKey: ${apiKey}, logged_in: ${logged_in}`)
    if (logged_in) {
      router.push('/')
      return
    }
    setMessage('failed to login...')
    return logged_in
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>feeded</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          miniflux client
        </h1>
        <div>
          <div>
            endpoint:
            <input type="text" value={endpoint} onChange={e => setEndpoint(e.target.value) } />
          </div>
          <div>
            apiKey
            <input type="text" value={apiKey} onChange={e => setApiKey(e.target.value) } />
          </div>
          <div>
            <button onClick={() => {login(endpoint, apiKey)}}>login</button>
          </div>
          <div>
            message: {message}
          </div>
        </div>
      </main>
    </div>
  )
}