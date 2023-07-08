import imageUrlBuilder from '@sanity/image-url';
import config from './config';
import { SanityImageSource, SanityProjectDetails } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(config as SanityProjectDetails);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export default urlFor;