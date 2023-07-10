import { client } from '../sanity';

interface IGetPostsQueryParams {
  page?: number;
  perPage?: number;
  lastId?: string;
  lastCreatedAt?: Date;
}

const getQuery = (queryParams: IGetPostsQueryParams) => {
  const { page = 1, perPage = 10, lastId, lastCreatedAt } = queryParams;
  const start = (page - 1) * perPage;
  const end = page * perPage;
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
      'comments': *[_type == "comment" && post._ref == ^._id] {
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
    query: `*[_type == "post"] && ( createdAt > $lastCreatedAt || (createdAt == $lastCreatedAt && _id > $lastId))] | order(createdAt desc) [$start...$end]{
    _id,
    caption,
    author -> {
      name,
      avatar
    },
    images,
    createdAt,
    'likes': count(*[_type == "like" && post._ref == ^._id]),
    'comments': *[_type == "comment" && post._ref == ^._id] {
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
