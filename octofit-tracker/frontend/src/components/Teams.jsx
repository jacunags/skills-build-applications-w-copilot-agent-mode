import CollectionStatus from './CollectionStatus.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'

function Teams() {
  const { items, loading, error } = useApiCollection('/api/teams/')

  return (
    <section>
      <h1 className="h2 mb-4">Teams</h1>
      <CollectionStatus emptyMessage="No teams have been created yet." error={error} items={items} loading={loading} />
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead><tr><th>Team</th><th>Members</th><th>Points</th></tr></thead>
            <tbody>
              {items.map((team, index) => (
                <tr key={team._id ?? team.id ?? index}>
                  <th scope="row">{team.name ?? '—'}</th>
                  <td>
                    {Array.isArray(team.members)
                      ? team.members.map((member) => member?.displayName ?? member?.username ?? member).join(', ')
                      : '—'}
                  </td>
                  <td>{team.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Teams
