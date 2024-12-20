import { Avatar, Badge, Button, Flex, Input } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { IFriend, IGroup } from '../RealtimeContent/Messenger';
import { StyledMemberSetting } from './styled';
import {
  getFriends,
  postAddMemberToGroup,
} from '@/services/servicesApi/serviceApi';
import { CloseOutlined } from '@ant-design/icons';
import useDebounce from '@/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux';
import { refreshAPI, setLogout } from '@/redux/app';
const MemberSetting = ({ dataGroup }: { dataGroup: IGroup }) => {
  const { refresh } = useAppSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();
  const [selects, setSelects] = useState<IFriend[]>([]);
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [queryFriend, setQueryFriend] = useState('');
  const debouncedValue = useDebounce(queryFriend, 500);
  useEffect(() => {
    getFriends().then((res) => {
      if (res && res.status === 200) {
        const friendsNotInGroup = res.data.friends.filter(
          (item: IFriend) =>
            !dataGroup.members.find((member) => member.userID === item.userId)
        );
        setFriends(friendsNotInGroup);
      } else {
      }
    });
  }, [refresh, dataGroup.members]);
  const onAddMemberToGroup = () => {
    const userIds = [...selects].map((item) => item.userId);
    postAddMemberToGroup(dataGroup.id, userIds).then((res) => {
      if (res && res.status === 200) {
        dispatch(refreshAPI());
        setSelects([]);
      }
    });
  };
  const onSelect = (user: IFriend) => {
    const isExisted =
      selects.length > 0 && selects.some((item) => item.userId === user.userId);
    if (isExisted) {
      const newSelects = [...selects].filter(
        (item) => item.userId !== user.userId
      );
      setSelects(newSelects);
    } else {
      setSelects((prev) => [...prev, user]);
    }
  };
  const onUnSelect = (id: number) => {
    const newSelects = [...selects].filter((item) => item.userId !== id);
    setSelects(newSelects);
  };
  const isSelected = (id: number) => {
    const isExisted = selects.some((item) => item.userId === id);
    return isExisted;
  };
  const filterQueryFriends = useCallback(
    (data: IFriend[]) => {
      if (debouncedValue && debouncedValue.length > 0) {
        const newFriends = [...friends].filter((item) => {
          return item.name.toLowerCase().includes(debouncedValue.toLowerCase());
        });
        return newFriends;
      } else {
        return data;
      }
    },
    [debouncedValue, friends]
  );
  return (
    <StyledMemberSetting>
      <h5 className="title" onClick={() => setLogout()}>
        Thêm người
      </h5>
      <Input
        className="search-input"
        placeholder="Tìm kiếm"
        value={queryFriend}
        onChange={(e) => setQueryFriend(e.target.value)}
      />
      {selects.length === 0 ? (
        <p className="notice-text">Chưa chọn người dùng nào</p>
      ) : (
        <div>
          <div className="selected-list">
            {selects.length > 0 &&
              selects.map((friend) => {
                return (
                  <Badge
                    count={
                      <span className="close-icon">
                        <CloseOutlined
                          onClick={() => onUnSelect(friend.userId)}
                          style={{ color: 'white', fontSize: '12px' }}
                        />
                      </span>
                    }
                  >
                    <Avatar size={36} shape="circle" src={friend.avatar} />
                  </Badge>
                );
              })}
          </div>
          <Button
            onClick={onAddMemberToGroup}
            style={{
              marginTop: '12px',
              background: '#42A732',
              border: 'none',
              outline: 'none',
              color: 'white',
              width: '100%',
              height: '32px',
            }}
          >
            Thêm người
          </Button>
        </div>
      )}
      <div className="suggest-title">Gợi ý</div>
      <Flex vertical gap={12} style={{ marginTop: '8px' }}>
        {filterQueryFriends(friends).map((member) => {
          return (
            <Flex justify="space-between" align="center" key={member.userId}>
              <Flex align="center" gap={8}>
                <Avatar shape="circle" src={member.avatar} />
                <Flex vertical justify="center">
                  <h4>{member.name}</h4>
                  <span>Hoạt động 12 giờ trước</span>
                </Flex>
              </Flex>
              <div
                className={`select-btn ${
                  isSelected(member.userId) ? 'active' : ''
                }`}
                onClick={() => onSelect(member)}
              >
                <span />
              </div>
            </Flex>
          );
        })}
      </Flex>
    </StyledMemberSetting>
  );
};

export default MemberSetting;
