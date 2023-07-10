import getUserByEmail from './user/getUserByEmail';
import urlFor from './image/urlFor';
import uploadImages from './image/uploadImages';
import createPost from './post/createPost';
import getLatestPosts from './post/getLatestPosts';
import likePost from './post/likePost';
import unlikePost from './post/unlikePost';

const sanitySdk = {
  getUserByEmail,
  urlFor,
  uploadImages,
  createPost,
  getLatestPosts,
  likePost,
  unlikePost,
};

export default sanitySdk;
