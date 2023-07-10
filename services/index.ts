import getUserByEmail from './user/getUserByEmail';
import urlFor from './image/urlFor';
import uploadImages from './image/uploadImages';
import createPost from './post/create';
import getLatestPosts from './post/getLatestPosts';
import likePost from './post/likePost';
import unlikePost from './post/unlikePost';
import createComment from './comment/create';

const sanitySdk = {
  getUserByEmail,
  urlFor,
  uploadImages,
  createPost,
  getLatestPosts,
  likePost,
  unlikePost,
  createComment,
};

export default sanitySdk;
