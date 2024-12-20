/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Flex } from 'antd';
import { StyledForumItem } from './styled';
import LikeIcon from '@/assets/icons/forum_like.svg';
import EyeIcon from '@/assets/icons/forum_eye.svg';
import { Link } from 'react-router-dom';
import { IForum } from '@/types/postsType';
import { formatDate } from '@/utils/helper';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
const ForumItem = ({ id, forum }: { id: number; forum: IForum }) => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  return (
    <StyledForumItem id={id} screen_mode={screenMode}>
      <Link
        state={{ forum }}
        to={{ pathname: `/cong-dong/forum/following-forums/${forum.forum_id}` }}
      >
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
        >
          <Flex gap={20} style={{ overflow: 'hidden' }}>
            <img src={forum.image_url} alt="" className="forumCard-img" />
            <Flex
              vertical={true}
              style={{ width: '100%' }}
              justify="space-between"
            >
              <Flex justify="space-between">
                <div>
                  <h4 className="forumCard-title">{forum.name}</h4>
                  <div className="forumCard-info">
                    Tác giả: <span>...</span>
                  </div>
                  <p className="forumCard-content"></p>
                </div>
                <div className="forumCard-actions">
                  <span className="action">
                    <img src={EyeIcon} />
                  </span>
                  <span className="action">
                    <img src={LikeIcon} />
                  </span>
                </div>
              </Flex>
              <p className="forumCard-desc">{forum.description}</p>
              <Flex justify="space-between" className="forumCard-bottom">
                <div className="forumCard-author">
                  <img
                    src="https://play-lh.googleusercontent.com/uKpnKy_wsfI8ZjL-UNK5LpqE9N0xPJnHTlFrhG1a4juepKYL8de8gb52ZMUNqW5XPYU"
                    alt=""
                    className="forumCard-author__avatar"
                  />
                  <div className="forumCard-author__detail">
                    <h5 className="forumCard-author__detail-name">
                      {/* {forum.author} <Badge color="green"></Badge> */}
                    </h5>
                    <span className="forumCard-author__detail-createdAt">
                      Ngày đăng:...
                    </span>
                  </div>
                </div>
                <div className="forumCard-countInfo">
                  <Button
                    type="link"
                    style={{ padding: 0 }}
                    className="forumCard-subInfo"
                  >
                    {/* {forum.view_count} Lượt xem */}
                  </Button>
                  <Button
                    type="link"
                    style={{ padding: 0 }}
                    className="forumCard-subInfo"
                  >
                    {/* {forum.like_count} Lượt thích */}
                  </Button>
                  <Button
                    type="link"
                    style={{ padding: 0 }}
                    className="forumCard-subInfo"
                  >
                    {forum.post_count} lượt đăng
                  </Button>
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Link>
    </StyledForumItem>
  );
};
export default ForumItem;
