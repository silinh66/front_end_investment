import { Badge, Button, Card, Flex } from 'antd';
import { StyledThread } from './styled';
import LikeIcon from '@/assets/icons/forum_like.svg';
import EyeIcon from '@/assets/icons/forum_eye.svg';
import { Link } from 'react-router-dom';
import { ForumPost } from '@/types/postsType';
import { formatDate } from '@/utils/helper';
const Thread = ({
  id,
  loading,
  thread,
}: {
  id: number;
  loading: boolean;
  thread: ForumPost;
}) => {
  return (
    <StyledThread>
      <Link to={{ pathname: `/cong-dong/forum/forum/${thread.forum_post_id}` }}>
        <Card
          bodyStyle={{
            padding: 16,
          }}
          hoverable
          style={{
            width: '100%',
            border: 'transparent',
            color: 'white',
            backgroundColor: id % 2 === 0 ? '#2A2E39' : 'transparent',
          }}
          loading={loading}
        >
          <Flex gap={20} style={{ overflow: 'hidden' }}>
            <img src={thread.image_url} alt="" className="forumCard-img" />
            <Flex
              vertical={true}
              style={{ width: '100%' }}
              justify="space-between"
            >
              <Flex justify="space-between">
                <div>
                  <h4 className="forumCard-title">{thread?.title}</h4>
                  <div className="forumCard-info">
                    Tác giả: <span>{thread.author}</span>
                  </div>
                </div>
                <div className="forumCard-actions">
                  <span
                    className="action"
                    style={{
                      backgroundColor: id % 2 === 0 ? '#1f232c' : '#2A2E39',
                    }}
                  >
                    <img src={EyeIcon} />
                  </span>
                  <span
                    className="action"
                    style={{
                      backgroundColor: id % 2 === 0 ? '#1f232c' : '#2A2E39',
                    }}
                  >
                    <img src={LikeIcon} />
                  </span>
                </div>
              </Flex>
              <p className="forumCard-desc">{thread.content}</p>
              <Flex justify="space-between" className="forumCard-bottom">
                <div className="forumCard-author">
                  <img
                    src="https://play-lh.googleusercontent.com/uKpnKy_wsfI8ZjL-UNK5LpqE9N0xPJnHTlFrhG1a4juepKYL8de8gb52ZMUNqW5XPYU"
                    alt=""
                    className="forumCard-author__avatar"
                  />
                  <div className="forumCard-author__detail">
                    <h5 className="forumCard-author__detail-name">
                      {thread.author} <Badge color="green"></Badge>
                    </h5>
                    <span className="forumCard-author__detail-createdAt">
                      Ngày đăng:{formatDate(thread.created_at!)}
                    </span>
                  </div>
                </div>
                <div className="forumCard-countInfo">
                  <Button
                    type="link"
                    style={{ padding: 0 }}
                    className="forumCard-subInfo"
                  >
                    {thread.view_count} Lượt xem
                  </Button>
                  <Button
                    type="link"
                    style={{ padding: 0 }}
                    className="forumCard-subInfo"
                  >
                    {thread.like_count} Lượt thích
                  </Button>
                  <Button
                    type="link"
                    style={{ padding: 0 }}
                    className="forumCard-subInfo"
                  >
                    {thread.comment_count} Bình luận
                  </Button>
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Link>
    </StyledThread>
  );
};
export default Thread;
