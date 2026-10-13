import { Router } from 'express';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const router = Router();

router.get('/api/users/', async (_request, response) => {
  response.json(await User.find().sort({ username: 1 }));
});
router.post('/api/users/', async (request, response) => {
  response.status(201).json(await User.create(request.body));
});

router.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().sort({ name: 1 }).populate('members', 'username displayName'));
});
router.post('/api/teams/', async (request, response) => {
  response.status(201).json(await Team.create(request.body));
});

router.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().sort({ completedAt: -1 }).populate('user', 'username displayName'));
});
router.post('/api/activities/', async (request, response) => {
  response.status(201).json(await Activity.create(request.body));
});

router.get('/api/leaderboard/', async (_request, response) => {
  response.json(
    await Leaderboard.find()
      .sort({ points: -1 })
      .populate('user', 'username displayName')
      .populate('team', 'name'),
  );
});
router.post('/api/leaderboard/', async (request, response) => {
  response.status(201).json(await Leaderboard.create(request.body));
});

router.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }));
});
router.post('/api/workouts/', async (request, response) => {
  response.status(201).json(await Workout.create(request.body));
});

export default router;
