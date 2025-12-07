export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  preferredGenres: string[];
  avatarUrl?: string;
  watchlist: string[]; // Array of Movie IDs
  watchedHistory: string[]; // Array of Movie IDs
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  genres: string[];
  director: string;
  cast: string[];
  year: number;
  duration: number; // in minutes
  rating: number; // Average rating
  posterUrl: string;
  viewCount: number;
}

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}