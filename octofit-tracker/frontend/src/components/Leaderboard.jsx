import CollectionStatus from './CollectionStatus.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'

function Leaderboard() {
  const { items, loading, error } = useApiCollection('/api/leaderboard/')

  return (
    <section>
      <h1 className="h2 mb-4">Leaderboard</h1>
      <CollectionStatus emptyMessage="The leaderboard is empty." error={error} items={items} loading={loading} />
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead><tr><th>Rank</th><th>User</th><th>Team</th><th>Points</th></tr></thead>
            <tbody>
              {items.map((entry, index) => (
                <tr key={entry._id ?? entry.id ?? index}>
                  <th scope="row">{index + 1}</th>
                  <td>{entry.user?.displayName ?? entry.user?.username ?? entry.user ?? '—'}</td>
                  <td>{entry.team?.name ?? entry.team ?? '—'}</td>
                  <td>{entry.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
