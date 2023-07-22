import { client } from '../sanity';

export default async function (slug: string) {
  return await client.fetch(
    `*[_type == "user" && slug == $slug][0] {
        _id,
        name,
        email,
        avatar,
        slug,
        emailVerified,
        createdAt,
        modifiedAt,
        bio,
        'liked': *[_type == "like" && author._ref == ^._id],
        'posts': *[_type == "post" && author._ref == ^._id] | order(createdAt desc) {
            _id,
            caption,
            images,
            createdAt,
            author -> {
              _id,
              name,
              avatar,
              'followers': *[_type == "follow" && following._ref == ^._id],
              'following': *[_type == "follow" && user._ref == ^._id],
              'postsTotal': count(*[_type == "post" && author._ref == ^._id]),
            },
            'likes': count(*[_type == "like" && post._ref == ^._id]),
            'comments': *[_type == "comment" && post._ref == ^._id] | order(createdAt desc) {
              _id,
              content,
              createdAt,
              author -> {
                name,
                avatar,
            }
          }
        },
        'followers': *[_type == "follow" && following._ref == ^._id],
        'following': *[_type == "follow" && user._ref == ^._id],
        'threeLatestPosts': *[_type == "post"] | order(createdAt desc) [0...3]{
          images[0]
        },
    }`,
    {
      slug,
    }
  );
}
