import mongoose from 'mongoose'

export interface Profiles extends mongoose.Document {
  clerkId: string
  email: string
}

const ProfileSchema = new mongoose.Schema<Profiles>({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
})

export const ProfileModel =
  mongoose.model<Profiles>('Profiles', ProfileSchema) ||
  mongoose.models.Profiles
