import CollectionStatus from './CollectionStatus.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'

function Activities() {
  const { items, loading, error } = useApiCollection('/api/activities/')

  return (
    <section>
      <h1 className="h2 mb-4">Activities</h1>
      <CollectionStatus emptyMessage="No activities have been logged yet." error={error} items={items} loading={loading} />
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead><tr><th>User</th><th>Activity</th><th>Duration</th><th>Distance</th><th>Points</th><th>Completed</th></tr></thead>
            <tbody>
              {items.map((activity, index) => (
                <tr key={activity._id ?? activity.id ?? index}>
                  <td>{activity.user?.displayName ?? activity.user?.username ?? activity.user ?? '—'}</td>
                  <td>{activity.type ?? '—'}</td>
                  <td>{activity.durationMinutes != null ? `${activity.durationMinutes} min` : '—'}</td>
                  <td>{activity.distanceKilometers != null ? `${activity.distanceKilometers} km` : '—'}</td>
                  <td>{activity.points ?? 0}</td>
                  <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
