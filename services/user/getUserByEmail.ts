import { client } from '../sanity';

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
        modifiedAt,
        'liked': *[_type == "like" && author._ref == ^._id],
        'followers': *[_type == "follow" && following._ref == ^._id],
        'following': *[_type == "follow" && follower._ref == ^._id],
        'chats': *[_type == "chat" && ^._id in participants[]._ref] {
          _id,
          createdAt,
          participants[] -> {
            _id,
            name,
            avatar,
            bio
          },
        }
      }`,
    {
      email,
    }
  );
}
