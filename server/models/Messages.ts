import mongoose from 'mongoose'

import { SendMessage } from '../interfaces'

const MessageSchema = new mongoose.Schema<SendMessage>({
  username: {
    type: String,
    trim: true,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  message: {
    type: String,
    trim: true,
    required: true
  },
  createdTime: {
    type: Number,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('Message', MessageSchema)