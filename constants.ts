import { Movie, User, UserRole } from './types';

export const GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Sci-Fi', 
  'Horror', 'Thriller', 'Romance', 'Mystery', 'Documentary'
];

export const MOCK_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
    year: 2010,
    duration: 148,
    rating: 4.8,
    posterUrl: 'https://picsum.photos/seed/inception/300/450',
    viewCount: 12500
  },
  {
    id: '2',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    genres: ['Action', 'Drama', 'Crime'],
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    year: 2008,
    duration: 152,
    rating: 4.9,
    posterUrl: 'https://picsum.photos/seed/darkknight/300/450',
    viewCount: 15000
  },
  {
    id: '3',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    year: 2014,
    duration: 169,
    rating: 4.7,
    posterUrl: 'https://picsum.photos/seed/interstellar/300/450',
    viewCount: 11200
  },
  {
    id: '4',
    title: 'Parasite',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    genres: ['Drama', 'Thriller', 'Comedy'],
    director: 'Bong Joon Ho',
    cast: ['Kang-ho Song', 'Sun-kyun Lee', 'Yeo-jeong Jo'],
    year: 2019,
    duration: 132,
    rating: 4.6,
    posterUrl: 'https://picsum.photos/seed/parasite/300/450',
    viewCount: 9800
  },
  {
    id: '5',
    title: 'Avengers: Endgame',
    description: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    director: 'Anthony Russo, Joe Russo',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'],
    year: 2019,
    duration: 181,
    rating: 4.5,
    posterUrl: 'https://picsum.photos/seed/endgame/300/450',
    viewCount: 20000
  },
  {
    id: '6',
    title: 'The Grand Budapest Hotel',
    description: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel\'s glorious years under an exceptional concierge.',
    genres: ['Comedy', 'Drama', 'Adventure'],
    director: 'Wes Anderson',
    cast: ['Ralph Fiennes', 'F. Murray Abraham', 'Mathieu Amalric'],
    year: 2014,
    duration: 99,
    rating: 4.3,
    posterUrl: 'https://picsum.photos/seed/budapest/300/450',
    viewCount: 7500
  },
  {
    id: '7',
    title: 'Whiplash',
    description: 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student\'s potential.',
    genres: ['Drama', 'Music'],
    director: 'Damien Chazelle',
    cast: ['Miles Teller', 'J.K. Simmons', 'Melissa Benoist'],
    year: 2014,
    duration: 106,
    rating: 4.8,
    posterUrl: 'https://picsum.photos/seed/whiplash/300/450',
    viewCount: 6800
  },
  {
    id: '8',
    title: 'Mad Max: Fury Road',
    description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    director: 'George Miller',
    cast: ['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult'],
    year: 2015,
    duration: 120,
    rating: 4.4,
    posterUrl: 'https://picsum.photos/seed/madmax/300/450',
    viewCount: 13400
  }
];

export const MOCK_ADMIN: User = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@cinesense.com',
  role: UserRole.ADMIN,
  preferredGenres: [],
  avatarUrl: 'https://ui-avatars.com/api/?name=Admin+User&background=E50914&color=fff',
  watchlist: [],
  watchedHistory: []
};
