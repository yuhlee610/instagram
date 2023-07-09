import getUserByEmail from './user/getUserByEmail';
import urlFor from './image/urlFor';
import uploadImages from './image/uploadImages';
import createPost from './post/createPost';
import getLatestPosts from './post/getLatestPosts';

const sanitySdk = {
  getUserByEmail,
  urlFor,
  uploadImages,
  createPost,
  getLatestPosts,
};

export default sanitySdk;
