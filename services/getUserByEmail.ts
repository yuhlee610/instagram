import { client } from "./sanity";

export default async function (email: string) {
  return await client.fetch(
    `*[_type == "user" && email == $email][0]{
        _id,
        name,
        email,
        avatar,
        slug,
        emailVerified,
        createdAt,
        modifiedAt
    }`,
    {
      email,
    }
  );
}
