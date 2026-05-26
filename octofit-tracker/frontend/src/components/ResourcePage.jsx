import { useEffect, useMemo, useState } from 'react'

function normalizeResponse(raw, resourceKey) {
  if (!raw) {
    return []
  }

  if (Array.isArray(raw)) {
    return raw
  }

  if (Array.isArray(raw[resourceKey])) {
    return raw[resourceKey]
  }

  if (Array.isArray(raw.data)) {
    return raw.data
  }

  if (Array.isArray(raw.items)) {
    return raw.items
  }

  const arrayValues = Object.values(raw).filter(Array.isArray).flat()
  if (arrayValues.length) {
    return arrayValues
  }

  return [raw]
}

function renderValue(value) {
  if (value === null || value === undefined) {
    return <em className="text-muted">empty</em>
  }

  if (typeof value === 'object') {
    return <pre className="mb-0">{JSON.stringify(value, null, 2)}</pre>
  }

  return String(value)
}

export default function ResourcePage({ title, apiEndpoint, resourceKey, description }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(apiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setItems(normalizeResponse(data, resourceKey))
      })
      .catch((fetchError) => {
        setError(fetchError.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [apiEndpoint, resourceKey])

  const headers = useMemo(() => {
    if (!items.length) {
      return []
    }

    const firstItem = items[0]
    if (typeof firstItem === 'object' && firstItem !== null) {
      return Object.keys(firstItem)
    }

    return ['value']
  }, [items])

  return (
    <section className="mt-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2>{title}</h2>
          <p className="mb-0 text-muted">{description}</p>
        </div>
        <div className="text-end">
          <small className="text-secondary">Endpoint:</small>
          <div className="text-break">{apiEndpoint}</div>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !items.length && !error && (
        <div className="alert alert-warning">No {title.toLowerCase()} returned from the API.</div>
      )}

      {!loading && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  {headers.map((header) => (
                    <td key={`${index}-${header}`}>
                      {typeof item === 'object' && item !== null
                        ? renderValue(item[header])
                        : renderValue(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
