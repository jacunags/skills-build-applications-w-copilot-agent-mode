import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import activity from '../models/activity.js';
import leaderboard from '../models/leaderboard.js';
import team from '../models/team.js';
import user from '../models/user.js';
import workout from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function findOrCreate<T>(find: () => Promise<T | null>, create: () => Promise<T>): Promise<T> {
  const existing = await find();
  return existing ?? create();
}

async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    const trailblazers = await findOrCreate(
      () => team.findOne({ name: 'Trailblazers' }),
      () => team.create({ name: 'Trailblazers', members: [], points: 0 }),
    );
    const pulseCrew = await findOrCreate(
      () => team.findOne({ name: 'Pulse Crew' }),
      () => team.create({ name: 'Pulse Crew', members: [], points: 0 }),
    );

    const users = await Promise.all([
      findOrCreate(
        () => user.findOne({ username: 'alex_runner' }),
        () =>
          user.create({
            username: 'alex_runner',
            displayName: 'Alex Rivera',
            email: 'alex.rivera@example.com',
            team: trailblazers._id,
            points: 320,
          }),
      ),
      findOrCreate(
        () => user.findOne({ username: 'sam_cyclist' }),
        () =>
          user.create({
            username: 'sam_cyclist',
            displayName: 'Sam Chen',
            email: 'sam.chen@example.com',
            team: trailblazers._id,
            points: 275,
          }),
      ),
      findOrCreate(
        () => user.findOne({ username: 'jordan_lifts' }),
        () =>
          user.create({
            username: 'jordan_lifts',
            displayName: 'Jordan Brooks',
            email: 'jordan.brooks@example.com',
            team: pulseCrew._id,
            points: 290,
          }),
      ),
      findOrCreate(
        () => user.findOne({ username: 'taylor_moves' }),
        () =>
          user.create({
            username: 'taylor_moves',
            displayName: 'Taylor Morgan',
            email: 'taylor.morgan@example.com',
            team: pulseCrew._id,
            points: 245,
          }),
      ),
    ]);

    const trailblazerUsers = users.slice(0, 2);
    const pulseCrewUsers = users.slice(2);
    await Promise.all([
      team.updateOne(
        { _id: trailblazers._id },
        {
          $addToSet: { members: { $each: trailblazerUsers.map((record) => record._id) } },
          $set: { points: trailblazerUsers.reduce((total, record) => total + record.points, 0) },
        },
      ),
      team.updateOne(
        { _id: pulseCrew._id },
        {
          $addToSet: { members: { $each: pulseCrewUsers.map((record) => record._id) } },
          $set: { points: pulseCrewUsers.reduce((total, record) => total + record.points, 0) },
        },
      ),
    ]);

    const activityRecords = [
      { user: users[0], type: 'Running', durationMinutes: 35, distanceKilometers: 5.2, points: 60, completedAt: new Date('2026-10-10T08:00:00Z') },
      { user: users[0], type: 'Cycling', durationMinutes: 50, distanceKilometers: 18, points: 80, completedAt: new Date('2026-10-11T07:30:00Z') },
      { user: users[1], type: 'Cycling', durationMinutes: 45, distanceKilometers: 16, points: 70, completedAt: new Date('2026-10-09T17:00:00Z') },
      { user: users[1], type: 'Running', durationMinutes: 28, distanceKilometers: 4, points: 55, completedAt: new Date('2026-10-11T06:45:00Z') },
      { user: users[2], type: 'Strength training', durationMinutes: 40, points: 65, completedAt: new Date('2026-10-10T18:15:00Z') },
      { user: users[2], type: 'Running', durationMinutes: 32, distanceKilometers: 4.8, points: 60, completedAt: new Date('2026-10-11T08:15:00Z') },
      { user: users[3], type: 'Yoga', durationMinutes: 45, points: 50, completedAt: new Date('2026-10-09T07:00:00Z') },
      { user: users[3], type: 'Strength training', durationMinutes: 35, points: 55, completedAt: new Date('2026-10-11T17:30:00Z') },
    ];

    await Promise.all(
      activityRecords.map(({ user: activityUser, ...record }) =>
        findOrCreate(
          () => activity.findOne({ user: activityUser._id, type: record.type, completedAt: record.completedAt }),
          () => activity.create({ user: activityUser._id, ...record }),
        ),
      ),
    );

    await Promise.all(
      users.map((record) =>
        findOrCreate(
          () => leaderboard.findOne({ user: record._id }),
          () =>
            leaderboard.create({
              user: record._id,
              team: record.team,
              points: record.points,
            }),
        ),
      ),
    );

    const workoutRecords = [
      {
        title: 'Beginner Cardio Builder',
        description: 'A steady low-impact session to build cardiovascular endurance.',
        difficulty: 'beginner',
        exercises: [
          { name: 'Brisk walk', durationMinutes: 10 },
          { name: 'Easy jog', durationMinutes: 15 },
          { name: 'Cool-down walk', durationMinutes: 5 },
        ],
        tags: ['cardio', 'beginner'],
      },
      {
        title: 'Full-Body Strength Circuit',
        description: 'A balanced strength session using simple compound movements.',
        difficulty: 'intermediate',
        exercises: [
          { name: 'Squats', sets: 3, repetitions: 12 },
          { name: 'Push-ups', sets: 3, repetitions: 10 },
          { name: 'Dumbbell rows', sets: 3, repetitions: 12 },
        ],
        tags: ['strength', 'full-body'],
      },
      {
        title: 'Mobility and Recovery',
        description: 'Gentle mobility work and stretching for an active recovery day.',
        difficulty: 'beginner',
        exercises: [
          { name: 'Cat-cow stretch', durationMinutes: 5 },
          { name: 'Hip flexor stretch', durationMinutes: 8 },
          { name: 'Child pose', durationMinutes: 5 },
        ],
        tags: ['mobility', 'recovery'],
      },
    ];

    await Promise.all(
      workoutRecords.map(({ title, ...record }) =>
        findOrCreate(() => workout.findOne({ title }), () => workout.create({ title, ...record })),
      ),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

seedDatabase();
