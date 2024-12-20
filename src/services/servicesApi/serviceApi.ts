/* eslint-disable @typescript-eslint/no-explicit-any */
import { request, requestToken } from '@/config/api';
export const getUserInfo = () => {
  const requestInfo = requestToken({
    method: 'GET',
    url: '/getUserInfo',
  });
  return requestInfo;
};
export const updateUser = (data: {
  image: string;
  birthdate: string;
  tiktok_url: string;
  youtube_url: string;
}) => {
  const requestInfo = requestToken({
    method: 'PUT',
    url: '/update-user',
    data: JSON.stringify(data),
  });
  return requestInfo;
};
export const getAllSocialPosts = (page, sortLike) => {
  const requestInfo = request({
    method: 'GET',
    url: `/getTopicsAll?page=${page}&pageSize=10&sortLike=${sortLike}`,
  });
  return requestInfo;
};

export const getUserPosts = (idUser: number) => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/getTopicsByUser/${idUser}`,
  });
  return requestInfo;
};
export const addFriends = (data: { userId }) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: '/addFriend',
    data,
  });
  return requestInfo;
};
export const postPost = (data: {
  title: string;
  content: string;
  image_url: string;
}) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: '/posts',
    data,
  });
  return requestInfo;
};
export const getFeaturedPosts = () => {
  const requestInfo = requestToken({
    method: 'GET',
    url: '/featured-posts',
  });
  return requestInfo;
};
export const getNews = () => {
  const requestInfo = requestToken({
    method: 'GET',
    url: '/news-all',
    // url: '/get-news',
  });
  return requestInfo;
};
export const getNewsType = (type: any, count: any, page: any) => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/news-type?type=${type}&limit=${count}&page=${page}`,
    // url: '/get-news',
  });
  return requestInfo;
};
// /featured-post-detail/1
export const getDetailFeaturedPost = (idPost: number) => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/featured-post-detail/${idPost}`,
  });
  return requestInfo;
};
export const getComments = (idPost: number) => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/posts/${idPost}/comments`,
  });
  return requestInfo;
};
export const getCommentsCompany = (idPost: number) => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/topics/${idPost}/comments`,
  });
  return requestInfo;
};
// /forums/posts/1/comments
export const getCommentsPostInForum = (idPost: number) => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/forums/posts/${idPost}/comments`,
  });
  return requestInfo;
};
export const likePost = (idPost: number) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/posts/${idPost}/like`,
  });
  return requestInfo;
};
export const likeComment = (idTopic: number, idComment: number) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/comments/${idTopic}/${idComment}/like`,
  });
  return requestInfo;
};
export const unLikeComment = (idTopic: number, idComment: number) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/comments/${idTopic}/${idComment}/unlike`,
  });
  return requestInfo;
};
export const likePostCompany = (idPost: number) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/topics/${idPost}/like`,
  });
  return requestInfo;
};
export const unlikePost = (idPost: number) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/posts/${idPost}/unlike`,
  });
  return requestInfo;
};
export const unlikePostCompany = (idPost: number) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/topics/${idPost}/unlike`,
  });
  return requestInfo;
};
// likePostInForum
export const likePostInForum = (idForum: number, idPost: number) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/forums/${idForum}/posts/${idPost}/like`,
  });
  return requestInfo;
};
export const getPostLikes = (idPost: number) => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/posts/${idPost}/likes`,
  });
  return requestInfo;
};
export const postComment = (idPost: number, content: string) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/posts/${idPost}/comments`,
    data: { content },
  });
  return requestInfo;
};

export const postCommentCompany = (idPost: number, content: string) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/topics/${idPost}/comments`,
    data: { content },
  });
  return requestInfo;
};
export const repCommentCompany = (
  idPost: number,
  content: string,
  parent_id: any
) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/topics/${idPost}/comments`,
    data: { content, parent_id },
  });
  return requestInfo;
};
// forums/1/posts/1/comments
export const postCommentPostInForum = (
  idForum: number,
  idPost: number,
  content: string
) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/forums/${idForum}/posts/${idPost}/comments`,
    data: { content },
  });
  return requestInfo;
};
export const viewPost = (idPost: number) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/topics/${idPost}/view`,
  });
  return requestInfo;
};
// forums
export const getListForum = () => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/forums`,
  });
  return requestInfo;
};
// /forums/1/posts/1/comments
// export const getCommentDetailPost = (forumId: number, postId: number) => {
//   const requestInfo = requestToken({
//     method: 'POST',
//     url: `/forums/${forumId}/posts/${postId}/comments`,
//   });
//   return requestInfo;
// };

export const getWorldIndices = () => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/world-indices`,
  });
  return requestInfo;
};
export const getGoodsIndices = () => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/goods-price`,
  });
  return requestInfo;
};

export const getListConversations = () => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/conversations`,
  });
  return requestInfo;
};
export const getListMessages = (id: number, type: string = 'user') => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/messages/${id}?type=${type}`,
  });
  return requestInfo;
};

// getFollowing
export const getFollowingUsers = () => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/getFollowing`,
  });
  return requestInfo;
};

// getFollowers
export const getFollowers = () => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/getFollowers`,
  });
  return requestInfo;
};

// unfollowUser
export const postUnFollowUser = (followingId: number) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/unfollowUser`,
    data: { followingId },
  });
  return requestInfo;
};
// followUser
export const postFollowUser = (followingId: number) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/followUser`,
    data: { followingId },
  });
  return requestInfo;
};
//getFriends
export const getFriends = () => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/getFriends`,
  });
  return requestInfo;
};
// addGroupMembers
export const postAddMemberToGroup = (group_id: number, user_ids: number[]) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/addGroupMembers`,
    data: {
      group_id,
      user_ids,
    },
  });
  return requestInfo;
};
export const postFollowTopic = (symbol: any) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/followTopic`,
    data: {
      symbol,
    },
  });
  return requestInfo;
};
export const postUnFollowTopic = (symbol: any) => {
  const requestInfo = requestToken({
    method: 'POST',
    url: `/unfollowTopic`,
    data: {
      symbol,
    },
  });
  return requestInfo;
};
// /news?symbol=ACB
export const getNewsAndEvents = () => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/news?symbol=SSI`,
  });
  return requestInfo;
};
export const getUserId = (id: any) => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/getUserDetail/${id}`,
  });
  return requestInfo;
};
export const getCompanyCommunity = () => {
  const requestInfo = request({
    method: 'GET',
    url: `/info-company`,
  });
  return requestInfo;
};
// /forums/following
export const getListFollowingGroup = () => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/info-company-follow`,
  });
  return requestInfo;
};
export const getInfoStatistical = () => {
  const requestInfo = request({
    method: 'GET',
    url: `/statistics`,
  });
  return requestInfo;
};
// posts/following
export const getListFollowingPost = () => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/posts/following`,
  });
  return requestInfo;
};

// /forums/1/posts
export const getListPostsInForum = (forumId: number) => {
  const requestInfo = requestToken({
    method: 'GET',
    url: `/forums/${forumId}/posts`,
  });
  return requestInfo;
};
