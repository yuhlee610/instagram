import { type SchemaTypeDefinition } from 'sanity'
import comment from './schemas/comment'
import follow from './schemas/follow'
import like from './schemas/like'
import post from './schemas/post'
import user from './schemas/user'
import chat from './schemas/chat'
import message from './schemas/message'
import account from './schemas/account'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [comment, follow, like, post, user, chat, message, account],
}
