import CollectionStatus from './CollectionStatus.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'

function Users() {
  const { items, loading, error } = useApiCollection('/api/users/')

  return (
    <section>
      <h1 className="h2 mb-4">Users</h1>
      <CollectionStatus emptyMessage="No users have registered yet." error={error} items={items} loading={loading} />
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead><tr><th>Name</th><th>Username</th><th>Email</th><th>Points</th></tr></thead>
            <tbody>
              {items.map((user, index) => (
                <tr key={user._id ?? user.id ?? index}>
                  <td>{user.displayName ?? '—'}</td>
                  <td>{user.username ?? '—'}</td>
                  <td>{user.email ?? '—'}</td>
                  <td>{user.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
