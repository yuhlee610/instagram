export default {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-07',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: process.env.NODE_ENV === 'production',
};
