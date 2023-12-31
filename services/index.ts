import getUserByEmail from './user/getUserByEmail';
import urlFor from './image/urlFor';
import uploadImages from './image/uploadImages';
import createPost from './post/create';
import getLatestPosts from './post/getLatestPosts';
import likePost from './post/likePost';
import unlikePost from './post/unlikePost';
import createComment from './comment/create';
import getSlugs from './user/getSlugs';
import getUserBySlug from './user/getUserBySlug';
import follow from './user/follow';
import unFollow from './user/unFollow';
import createChat from './chat/create';
import getMessagesByChat from './message/getMessagesByChat';
import createMessage from './message/create';

const sanitySdk = {
  getUserByEmail,
  urlFor,
  uploadImages,
  createPost,
  getLatestPosts,
  likePost,
  unlikePost,
  createComment,
  getSlugs,
  getUserBySlug,
  follow,
  unFollow,
  createChat,
  getMessagesByChat,
  createMessage,
};

export default sanitySdk;
