import { client } from '../sanity';

interface IGetPostsQueryParams {
  perPage?: number;
  lastId?: string;
  lastCreatedAt?: string;
}

const getQuery = (queryParams: IGetPostsQueryParams) => {
  const { perPage = 3, lastId, lastCreatedAt } = queryParams;
  const start = 0;
  const end = perPage;
  if (!lastId || !lastCreatedAt) {
    return {
      query: `*[_type == "post"] | order(createdAt desc) [$start...$end]{
      _id,
      caption,
      author -> {
        _id,
        name,
        avatar,
        slug,
        bio,
        'postsTotal': count(*[_type == "post" && author._ref == ^._id]),
        'followers': *[_type == "follow" && following._ref == ^._id],
        'following': *[_type == "follow" && user._ref == ^._id],
        'threeLatestPosts': *[_type == "post"] | order(createdAt desc) [0...3]{
          images[0]
        }
      },
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
          slug
        }
      }
    }`,
      params: { start, end },
    };
  }

  return {
    query: `*[_type == "post" && ( createdAt < $lastCreatedAt || (createdAt == $lastCreatedAt && _id > $lastId))] | order(createdAt desc) [$start...$end]{
    _id,
    caption,
    author -> {
      _id,
      name,
      avatar,
      slug,
      bio,
      'postsTotal': count(*[_type == "post" && author._ref == ^._id]),
      'followers': *[_type == "follow" && following._ref == ^._id],
      'following': *[_type == "follow" && user._ref == ^._id],
      'threeLatestPosts': *[_type == "post"] | order(createdAt desc) [0...3]{
        images[0]
      }
    },
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
        slug
      }
    }
  }`,
    params: {
      start,
      end,
      lastId,
      lastCreatedAt,
    },
  };
};

const getLatestPosts = (queryParams: IGetPostsQueryParams) => {
  const { query, params } = getQuery(queryParams);

  return client.fetch(query, params);
};

export default getLatestPosts;
