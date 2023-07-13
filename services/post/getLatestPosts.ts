import { client } from '../sanity';

interface IGetPostsQueryParams {
  perPage?: number;
  lastId?: string;
  lastCreatedAt?: string;
}

const getQuery = (queryParams: IGetPostsQueryParams) => {
  const { perPage = 1, lastId, lastCreatedAt } = queryParams;
  const start = 0;
  const end = perPage;
  if (!lastId || !lastCreatedAt) {
    return {
      query: `*[_type == "post"] | order(createdAt desc) [$start...$end]{
      _id,
      caption,
      author -> {
        name,
        avatar
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
      name,
      avatar
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
        avatar
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
