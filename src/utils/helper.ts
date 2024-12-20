import { IMessage } from '@/layouts/CommunityLayout/RightContent/RealtimeContent/Messenger';
import { IPost } from '@/types/postsType';
import moment from 'moment';
import { parseISO } from 'date-fns';
export const formatDate = (dateTimeString: string) => {
  // Create a Date object from the input string
  return moment(dateTimeString).format('DD/MM/YYYY');
};
export const getTimeBetween = (dateStr: string) => {
  try {
    const dateObj = new Date(dateStr);
    const now = new Date();
    const timeDiff = now.getTime() - dateObj.getTime();
    const secondsDiff = Math.abs(timeDiff) / 1000;
    const changeToMinutes = Math.floor(secondsDiff / 60);
    const changeToHours = Math.floor(secondsDiff / 3600);
    if (changeToHours >= 24) {
      return `${Math.floor(changeToHours / 24)} ngày trước`;
    } else if (changeToHours > 1 && changeToHours < 24) {
      return `${changeToHours} tiếng trước`;
    } else {
      return `${changeToMinutes} phút trước`;
    }
  } catch (error) {
    return null; // Or handle the error differently as needed
  }
};

export function sortMessagesByCreatedAt(messages: IMessage[]) {
  return messages.sort((a: IMessage, b: IMessage) => {
    // Parse dates from strings to ensure correct comparison
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    // Sort in ascending order (oldest to newest)
    return dateA.getTime() - dateB.getTime();
  });
}
export function sortByCreatedAt(posts: IPost[]) {
  return posts.sort((a: IPost, b: IPost) => {
    // Parse dates from strings to ensure correct comparison
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    // Sort in ascending order (oldest to newest)
    return dateB.getTime() - dateA.getTime();
  });
}
export const getTimeDifference = (timestamp) => {
  const now = new Date();
  const commentTime = parseISO(timestamp);
  const differenceInSeconds = Math.floor((now - commentTime) / 1000);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} giây`;
  } else if (differenceInSeconds < 3600) {
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    return `${differenceInMinutes} phút`;
  } else if (differenceInSeconds < 86400) {
    const differenceInHours = Math.floor(differenceInSeconds / 3600);
    return `${differenceInHours} giờ`;
  } else if (differenceInSeconds < 604800) {
    const differenceInDays = Math.floor(differenceInSeconds / 86400);
    return `${differenceInDays} ngày`;
  } else {
    const differenceInWeeks = Math.floor(differenceInSeconds / 604800);
    return `${differenceInWeeks} tuần`;
  }
};
