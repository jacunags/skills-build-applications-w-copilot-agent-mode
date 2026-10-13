function CollectionStatus({ loading, error, items, emptyMessage }) {
  if (loading) {
    return <p aria-live="polite" className="text-secondary">Loading…</p>
  }
  if (error) {
    return <div className="alert alert-danger" role="alert">Unable to load data: {error}</div>
  }
  if (items.length === 0) {
    return <p className="text-secondary">{emptyMessage}</p>
  }
  return null
}

export default CollectionStatus
