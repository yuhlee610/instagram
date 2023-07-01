import { type SchemaTypeDefinition } from 'sanity'
import comment from './schemas/comment'
import follow from './schemas/follow'
import like from './schemas/like'
import post from './schemas/post'
import user from './schemas/user'
import chat from './schemas/chat'
import message from './schemas/message'
import participant from './schemas/participant'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [comment, follow, like, post, user, chat, message, participant],
}
