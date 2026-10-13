import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export function useApiCollection(path, fetcher) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(path, { signal: controller.signal, fetcher })
      .then((collection) => {
        setItems(collection)
        setError('')
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [path, fetcher])

  return { items, loading, error }
}
