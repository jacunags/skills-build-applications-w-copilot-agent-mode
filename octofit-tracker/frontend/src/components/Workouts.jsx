import CollectionStatus from './CollectionStatus.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'

function Workouts() {
  const { items, loading, error } = useApiCollection('/api/workouts/')

  return (
    <section>
      <h1 className="h2 mb-4">Workouts</h1>
      <CollectionStatus emptyMessage="No workout suggestions are available yet." error={error} items={items} loading={loading} />
      {!loading && !error && items.length > 0 && (
        <div className="row g-3">
          {items.map((workout, index) => (
            <div className="col-12 col-lg-6" key={workout._id ?? workout.id ?? index}>
              <article className="card h-100">
                <div className="card-body">
                  <h2 className="h5 card-title">{workout.title ?? 'Workout'}</h2>
                  <p>{workout.description ?? 'No description available.'}</p>
                  {workout.difficulty && <span className="badge text-bg-primary">{workout.difficulty}</span>}
                  {Array.isArray(workout.tags) && workout.tags.length > 0 && (
                    <p className="small text-secondary mt-2 mb-0">{workout.tags.join(' · ')}</p>
                  )}
                  {Array.isArray(workout.exercises) && workout.exercises.length > 0 && (
                    <ul className="mt-3 mb-0">
                      {workout.exercises.map((exercise, exerciseIndex) => (
                        <li key={exercise._id ?? exercise.id ?? exerciseIndex}>
                          {exercise.name ?? 'Exercise'}
                          {exercise.sets != null && ` — ${exercise.sets} sets`}
                          {exercise.repetitions != null && ` × ${exercise.repetitions} reps`}
                          {exercise.durationMinutes != null && ` — ${exercise.durationMinutes} min`}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
