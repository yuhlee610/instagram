import React from 'react';

const posts = [
  {
    id: 1,
    username: 'leomessi',
    userImage:
      'https://scontent-hkg4-1.cdninstagram.com/v/t51.2885-19/43818140_2116018831763532_3803033961098117120_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hkg4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=VxsKQNd0gNIAX99FZXT&edm=ALQROFkBAAAA&ccb=7-5&oh=00_AfDpZslpiXS84fquD_-6IW2xA63gikPqrVQkUmGMlB563g&oe=64A45332&_nc_sid=fc8dfb',
    images: [
      'https://scontent-hkg4-1.cdninstagram.com/v/t51.2885-15/356613793_743178344230788_7769151482976927645_n.jpg?se=7&stp=dst-jpg_e35&_nc_ht=scontent-hkg4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=F7l3oo94-o0AX8h5G1u&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzEzNDg1MDM3OTEwNzQxNTU3OA%3D%3D.2-ccb7-5&oh=00_AfBjoALoNGJwJe6ZdB8u3GNHrq4vKeNnIgZ_GAcGut2GBw&oe=64A2E2B0&_nc_sid=ee9879',
      'https://scontent-hkg4-1.cdninstagram.com/v/t51.2885-15/356008636_1293672034581300_6561989793076036879_n.jpg?se=7&stp=dst-jpg_e35&_nc_ht=scontent-hkg4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=3hDe59MI2uIAX95ovdT&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzEzMzA1NTEzNzkxNjE3NDIyMg%3D%3D.2-ccb7-5&oh=00_AfCXrsayMh2rsTd_EjRTs4EbaWyyG_WG2XsmDX6Xsd5S_g&oe=64A3DC87&_nc_sid=ee9879',
    ],
    caption: 'Birthday',
  },
  {
    id: 2,
    username: 'leomessi',
    userImage:
      'https://scontent-hkg4-1.cdninstagram.com/v/t51.2885-19/43818140_2116018831763532_3803033961098117120_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hkg4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=VxsKQNd0gNIAX99FZXT&edm=ALQROFkBAAAA&ccb=7-5&oh=00_AfDpZslpiXS84fquD_-6IW2xA63gikPqrVQkUmGMlB563g&oe=64A45332&_nc_sid=fc8dfb',
    images: [
      'https://scontent-hkg4-1.cdninstagram.com/v/t51.2885-15/356613793_743178344230788_7769151482976927645_n.jpg?se=7&stp=dst-jpg_e35&_nc_ht=scontent-hkg4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=F7l3oo94-o0AX8h5G1u&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzEzNDg1MDM3OTEwNzQxNTU3OA%3D%3D.2-ccb7-5&oh=00_AfBjoALoNGJwJe6ZdB8u3GNHrq4vKeNnIgZ_GAcGut2GBw&oe=64A2E2B0&_nc_sid=ee9879',
      'https://scontent-hkg4-1.cdninstagram.com/v/t51.2885-15/356008636_1293672034581300_6561989793076036879_n.jpg?se=7&stp=dst-jpg_e35&_nc_ht=scontent-hkg4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=3hDe59MI2uIAX95ovdT&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzEzMzA1NTEzNzkxNjE3NDIyMg%3D%3D.2-ccb7-5&oh=00_AfCXrsayMh2rsTd_EjRTs4EbaWyyG_WG2XsmDX6Xsd5S_g&oe=64A3DC87&_nc_sid=ee9879',
    ],
    caption: 'Birthday',
  },
  {
    id: 3,
    username: 'leomessi',
    userImage:
      'https://scontent-hkg4-1.cdninstagram.com/v/t51.2885-19/43818140_2116018831763532_3803033961098117120_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-hkg4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=VxsKQNd0gNIAX99FZXT&edm=ALQROFkBAAAA&ccb=7-5&oh=00_AfDpZslpiXS84fquD_-6IW2xA63gikPqrVQkUmGMlB563g&oe=64A45332&_nc_sid=fc8dfb',
    images: [
      'https://scontent-hkg4-1.cdninstagram.com/v/t51.2885-15/356613793_743178344230788_7769151482976927645_n.jpg?se=7&stp=dst-jpg_e35&_nc_ht=scontent-hkg4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=F7l3oo94-o0AX8h5G1u&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzEzNDg1MDM3OTEwNzQxNTU3OA%3D%3D.2-ccb7-5&oh=00_AfBjoALoNGJwJe6ZdB8u3GNHrq4vKeNnIgZ_GAcGut2GBw&oe=64A2E2B0&_nc_sid=ee9879',
      'https://scontent-hkg4-1.cdninstagram.com/v/t51.2885-15/356008636_1293672034581300_6561989793076036879_n.jpg?se=7&stp=dst-jpg_e35&_nc_ht=scontent-hkg4-1.cdninstagram.com&_nc_cat=1&_nc_ohc=3hDe59MI2uIAX95ovdT&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzEzMzA1NTEzNzkxNjE3NDIyMg%3D%3D.2-ccb7-5&oh=00_AfCXrsayMh2rsTd_EjRTs4EbaWyyG_WG2XsmDX6Xsd5S_g&oe=64A3DC87&_nc_sid=ee9879',
    ],
    caption: 'Birthday',
  },
];

const Home = () => {
  return <div>Home</div>;
};

export default Home;
