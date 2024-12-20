export interface IPost {
  author: string;
  comment_count: number;
  content: string;
  created_at: string;
  image_url: string;
  like_count: number;
  post_id: number;
  title: string;
  updated_at: string;
  userId: number;
  view_count: number;
  likes: {
    userId: number;
    name: string;
    avatar: string;
  }[];
}
export interface IPostInForum {
  author: string;
  comment_count: number;
  content: string;
  created_at: string | null;
  forum_id: number;
  forum_post_id: number;
  image: string;
  image_url: string;
  like_count: number;
  likes: { image: string; name: string; userId: number }[];
  title: string;
  updated_at: string | null;
  view_count: number;
}
export interface IPostFeaturedInForum {
  author: string;
  comment_count: number;
  content: string;
  created_at: string | null;
  forum_id: number;
  forum_post_id: number;
  image: string;
  image_url: string;
  like_count: number;
  users_liked: { image: string; name: string; userId: number }[];
  title: string;
  updated_at: string | null;
  view_count: number;
}
export interface Comment {
  comment_id: number;
  post_id: number;
  userId: number;
  content: string;
  created_at: string; // Assuming you want to keep it as a string
  name: string;
  avatar: string;
  parent_id: string;
}

export interface ForumPost {
  forum_post_id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: Date | null; // Assuming Date type for timestamps
  updated_at: Date | null;
  author: string;
  image: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  users_liked: UserLike[] | null; // Array of UserLike objects or null
}
export interface IFeaturedPost {
  forum_post_id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string | null; // Assuming Date type for timestamps
  updated_at: string | null;
  author: string;
  image: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  users_liked: UserLike[] | null;
}
export interface IForum {
  description: string;
  forum_id: number;
  image_url: string;
  name: string;
  post_count: number;
}

export interface UserLike {
  userId: number;
  name: string;
  avatar: string;
}
export interface IUser {
  avatar: string;
  createdOn: string;
  email: string;
  followerCount: number;
  isOnline: number;
  name: string;
  phone_number: string;
  userID: number;
}
export interface IFollowingUser {
  avatar: string;
  isOnline: number;
  name: string;
  userID: number;
}
