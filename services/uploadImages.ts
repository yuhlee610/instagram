import { client } from './sanity';

const uploadImages = (files: Blob[]) => {
  const uploadRequests = files.map((file) => {
    return file
      .arrayBuffer()
      .then((arrBuffer) => Buffer.from(arrBuffer))
      .then((buffer) => client.assets.upload('image', buffer));
  });
  return Promise.all(uploadRequests);
};

export default uploadImages;
