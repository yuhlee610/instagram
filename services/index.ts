import getUserByEmail from './getUserByEmail';
import urlFor from './urlFor';
import uploadImages from './uploadImages';
import createPost from './createPost';
import getLatestPosts from './getLatestPosts';

const sanitySdk = {
  getUserByEmail,
  urlFor,
  uploadImages,
  createPost,
  getLatestPosts,
};

export default sanitySdk;
