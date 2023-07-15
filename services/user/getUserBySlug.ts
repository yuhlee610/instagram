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
        'posts': *[_type == "post" && author._ref == ^._id] | order(createdAt desc) {
            _id,
            caption,
            images,
            createdAt,
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
    }`,
    {
      slug,
    }
  );
}
