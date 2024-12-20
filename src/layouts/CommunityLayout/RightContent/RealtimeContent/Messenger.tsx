/* eslint-disable @typescript-eslint/no-unused-vars */
import { getListConversations } from '@/services/servicesApi/serviceApi';
import { Avatar, Badge, Flex, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import {
  StyledDirectMessage,
  StyledGroupMessage,
  StyledListConversation,
} from './styled';
import { UserOutlined } from '@ant-design/icons';
import { getTimeBetween } from '@/utils/helper';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';
import DetailGroupMessage from './DetailGroupMessage';
import DetailDirectMessage from './DetailDirectMessage';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import icons from '@/constants/icons';

const Messenger = ({ setOpenMessenger }) => {
  return (
    <div>
      <ListConversations setOpenMessenger={setOpenMessenger} />
    </div>
  );
};

export default Messenger;

// Component
export interface IGroupMembers {
  userID: number;
  name: string;
  avatar: string;
}
export interface IDirect {
  userID: number;
  name: string;
  avatar: string;
  last_message_time: string; // Assuming Date type for timestamp
  last_message_content: string;
}
export interface IGroup {
  id: number;
  name: string;
  image_url: string | null; // Allow for null image URLs
  last_message_time: string; // Assuming Date type for timestamp
  last_message_content: string;
  members: IGroupMembers[];
}
export interface IMessage {
  id?: number;
  sender_id: number;
  receiver_id: number;
  group_id?: number;
  content: string;
  image_url?: string | null; // Allow for null image URLs
  created_at: string; // Assuming Date type for timestamps
  updated_at?: string;
  is_viewed?: boolean; // Assuming 0 means unviewed
  name?: string;
  avatar?: string;
}
export interface IFriend {
  avatar: string;
  isOnline: number;
  name: string;
  userId: number;
}
export enum DetailMessage {
  HIDDEN = 'hidden',
  GROUP = 'group',
  DIRECT = 'direct',
}
const ListConversations = ({ setOpenMessenger }) => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const { user } = useAppSelector((state: RootState) => state.app);
  const [isDetail, setShowDetail] = useState<DetailMessage>(
    DetailMessage.HIDDEN
  );
  // const [currentId, setCurrentId] = useState<number | null>(null);
  const [directMessageData, setDirectMessageData] = useState<IDirect | null>(
    null
  );
  const [groupMessageData, setGroupMessageData] = useState<IGroup | null>(null);
  const [directs, setDirects] = useState<IDirect[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  useEffect(() => {
    getListConversations().then((res) => {
      if (res && res.status === 200) {
        const directData = res.data.conversations.direct.filter(
          (perUser: IDirect) => perUser.userID !== user?.userID
        );
        setGroups(res.data.conversations.groups);

        setDirects(directData);
      } else {
      }
    });
  }, [user]);
  const onDetailMessage = ({
    groupId,
    directUserId,
    dataGroup,
    dataDirect,
  }: {
    groupId?: number;
    directUserId?: number;
    dataGroup?: IGroup;
    dataDirect?: IDirect;
  }) => {
    if (groupId && dataGroup) {
      setShowDetail(DetailMessage.GROUP);
      setGroupMessageData(dataGroup);
    }
    if (directUserId && dataDirect) {
      setShowDetail(DetailMessage.DIRECT);
      setDirectMessageData(dataDirect);
    }
  };
  const back = () => {
    setShowDetail(DetailMessage.HIDDEN);
  };
  return (
    <Flex vertical gap={4}>
      {isDetail === DetailMessage.HIDDEN && (
        <StyledListConversation screen_mode={screenMode}>
          <div className="header">Tin nhắn</div>
          {groups.length > 0 &&
            groups.map((group) => {
              return (
                <GroupMessage
                  key={group.id}
                  data={group}
                  goToDetail={onDetailMessage}
                />
              );
            })}
          {directs &&
            directs.length > 0 &&
            directs.map((direct) => {
              return (
                <DirectMessage
                  key={direct.userID}
                  data={direct}
                  goToDetail={onDetailMessage}
                />
              );
            })}
        </StyledListConversation>
      )}

      {isDetail === DetailMessage.GROUP && groupMessageData && (
        <>
          <DetailGroupMessage
            data={groupMessageData}
            back={back}
            setOpenMessenger={setOpenMessenger}
          />
        </>
      )}
      {isDetail === DetailMessage.DIRECT && directMessageData && (
        <>
          <DetailDirectMessage
            data={directMessageData}
            back={back}
            setOpenMessenger={setOpenMessenger}
          />
        </>
      )}
    </Flex>
  );
};

const DirectMessage = ({
  data,
  goToDetail,
}: {
  data: IDirect;
  goToDetail: ({
    groupId,
    directUserId,
    dataGroup,
    dataDirect,
  }: {
    groupId?: number;
    directUserId?: number;
    dataGroup?: IGroup;
    dataDirect?: IDirect;
  }) => void;
}) => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  return (
    <StyledDirectMessage screen_mode={screenMode}>
      <Flex
        align="center"
        gap={8}
        onClick={() =>
          goToDetail({ directUserId: data.userID, dataDirect: data })
        }
      >
        <img
          style={{
            width: '44px',
            height: '44px',
          }}
          className="direct-avatar"
          src={data.avatar}
        />
        <div className="direct-info">
          <Flex gap={6} align="center">
            {/* <Badge color="green" /> */}
            <p className="direct-info__name">{data.name}</p>
          </Flex>
          <p className="direct-info__last-message">
            <p className="last-message">{data.last_message_content}</p>
            <svg
              width="2"
              height="2"
              viewBox="0 0 2 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="1" cy="1" r="1" fill="#818498" />
            </svg>

            {getTimeBetween(data.last_message_time)}
          </p>
        </div>
      </Flex>
      <Flex align="center" gap={2}>
        <Badge size={12} color="#004AEA" />
      </Flex>
    </StyledDirectMessage>
  );
};

const GroupMessage = ({
  data,
  goToDetail,
}: {
  data: IGroup;
  goToDetail: ({
    groupId,
    directUserId,
    dataGroup,
    dataDirect,
  }: {
    groupId?: number;
    directUserId?: number;
    dataGroup?: IGroup;
    dataDirect?: IDirect;
  }) => void;
}) => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  return (
    <StyledGroupMessage screen_mode={screenMode}>
      <Flex
        justify="space-between"
        style={{ width: '100%' }}
        onClick={() => goToDetail({ groupId: data.id, dataGroup: data })}
      >
        <div className="group-info">
          <Flex gap={6} align="center">
            <img src={icons.HEADER_AVATAR_ICON} alt="" />
          </Flex>
          <p className="group-info__last-message">
            <p className="group-info__name">{data.name}</p>
            <div className="last-mess">
              {data.last_message_content}
              <svg
                width="2"
                height="2"
                viewBox="0 0 2 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="1" cy="1" r="1" fill="#818498" />
              </svg>

              <div className="time">
                {getTimeBetween(data.last_message_time)}
              </div>
            </div>
          </p>
        </div>
        {/* <Flex align="center" gap={6}>
          <Avatar.Group maxCount={4}>
            {data.members.map((member) => {
              return (
                <Tooltip
                  title={member.name}
                  placement="top"
                  key={member.userID}
                >
                  <Avatar
                    style={{ backgroundColor: '#87d068' }}
                    icon={<UserOutlined />}
                    src={member.avatar}
                    size={24}
                  />
                </Tooltip>
              );
            })}
          </Avatar.Group>
          <p className="member-count">{data.members?.length} thành viên</p>
        </Flex> */}
      </Flex>
    </StyledGroupMessage>
  );
};
