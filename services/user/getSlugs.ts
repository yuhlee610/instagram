import { client } from '../sanity';

export default async function () {
  return await client.fetch(
    `*[_type == "user"]{
        slug,
    }`
  );
}
