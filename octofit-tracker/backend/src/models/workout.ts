import { model, Schema } from 'mongoose';

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sets: { type: Number, min: 1 },
    repetitions: { type: Number, min: 1 },
    durationMinutes: { type: Number, min: 1 },
  },
  { _id: false },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    exercises: { type: [exerciseSchema], default: [] },
    tags: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
