import { client } from '../sanity';

interface ICreateComment {
  comment: string;
  postId: string;
  userId: string;
}

const createComment = ({ comment, postId, userId }: ICreateComment) => {
  return client.create({
    _type: 'comment',
    content: comment,
    author: {
      _type: 'reference',
      _ref: userId,
    },
    post: {
      _type: 'reference',
      _ref: postId,
    },
    createdAt: new Date(),
  });
};

export default createComment;
