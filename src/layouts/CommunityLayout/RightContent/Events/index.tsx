/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getCompanyCommunity,
  getListFollowingGroup,
  postFollowTopic,
  postUnFollowTopic,
} from '@/services/servicesApi/serviceApi';
import { FixedSizeList as List } from 'react-window';

import { Flex, Select, Tooltip } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import ImageDefault from '/default.jpg';
import { StyledEventItem, StyledEvents } from './styled';
import { Link, useParams } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import api from '@/config/api';
import axios from 'axios';
import { config } from '@/config/env';
import { useAppSelector } from '@/redux/hooks';
import { refreshAPI } from '@/redux/app';

interface IEvent {
  categoryCode: string;
  createDate: string;
  fullContent: string;
  id: number;
  imageUrl: string;
  newId: string;
  newsSource: string;
  newsSourceLink: string;
  publicDate: string;
  shortContent: string;
  sourceCode: string;
  symbol: string;
  title: string;
  updateDate: string;
}
const Events = () => {
  const { id } = useParams();

  const [events, setEvents] = useState([]);
  const [followingGroup, setFollowingGroup] = useState<IForum[]>([]);
  const token = localStorage.getItem('token');
  const { refresh } = useAppSelector((state: RootState) => state.app);
  const screenMode = useSelector(screenModeSelector, shallowEqual);
  const dispatch = useDispatch();
  const getListCompanyGroup = () => {
    getCompanyCommunity().then((res) => {
      if (res && res.status === 200) {
        setEvents(res.data.data);
      }
    });
  };
  const getListFollow = () => {
    if (token) {
      getListFollowingGroup().then((res) => {
        if (res && res.status === 200) {
          setFollowingGroup(res?.data?.data);
        }
      });
    } else {
      getCompanyCommunity().then((res) => {
        if (res && res.status === 200) {
          setFollowingGroup(res?.data?.data);
        }
      });
    }
  };
  useEffect(() => {
    // getListCompanyGroup();
    getListFollow();
  }, [refresh]);
  const [listCompany, setListCompany] = useState<any>([]);

  const [company, setCompany] = useState<string>('VIC');

  useEffect(() => {
    if (token) {
      getListFollowingGroup().then((resListCompany) => {
        setListCompany(resListCompany?.data?.data);
      });
    } else {
      getCompanyCommunity().then((resListCompany) => {
        setListCompany(resListCompany?.data?.data);
      });
    }
  }, [company]);
  const newListCompany = listCompany?.map((obj: any) => ({
    name: obj.companyName,
    value: obj.symbol,
  }));

  const [options, setOptions] = useState(newListCompany);

  const [searchInput, setSearchInput] = useState('');

  const filterValues = options.map((item) => item.value);

  // Lọc mảng dataArray dựa trên giá trị của symbol
  const filteredDataArray =
    searchInput === ''
      ? followingGroup
      : followingGroup
          .filter((item) =>
            item.symbol.toLowerCase().includes(searchInput.toLowerCase())
          )
          .sort((a, b) => {
            if (a.symbol.toLowerCase() === searchInput.toLowerCase()) return -1;
            if (b.symbol.toLowerCase() === searchInput.toLowerCase()) return 1;
            return 0;
          });

  const handleSearch = (input) => {
    setSearchInput(input);
    if (input === '') {
      // If input is empty, reset options to newListCompany
      setOptions(newListCompany);
    } else {
      const filtered = newListCompany
        .filter(
          (company) =>
            company.value.toLowerCase().includes(input.toLowerCase()) ||
            company.name.toLowerCase().includes(input.toLowerCase())
        )
        .sort((a, b) => {
          if (a.value.toLowerCase() === input.toLowerCase()) return -1;
          if (b.value.toLowerCase() === input.toLowerCase()) return 1;
          return 0;
        });
      setOptions(filtered);
    }
  };
  const handleSelectCompany = useCallback((value: string) => {
    setCompany(value);
  }, []);
  const handleFollowTopic = (topic: any) => {
    postFollowTopic(topic)
      .then((result) => {
        getListCompanyGroup();
        dispatch(refreshAPI());
      })
      .catch((err) => {});
  };
  const handleUnFollowTopic = (topic: any) => {
    postUnFollowTopic(topic)
      .then((result) => {
        getListCompanyGroup();
        dispatch(refreshAPI());
      })
      .catch((err) => {});
  };
  return (
    <StyledEvents screen_mode={screenMode}>
      <Flex className="box-list" vertical gap={20}>
        <Select
          placeholder="Tìm kiếm cộng đồng"
          style={{ width: '100%' }}
          showSearch
          // defaultValue="VIC"
          onChange={handleSelectCompany}
          onSearch={handleSearch}
          filterOption={false}
        >
          {options.map((company) => (
            <Option
              key={company.value}
              value={company.value}
              label={company.value}
            >
              {company.value} - {company.name}
            </Option>
          ))}
        </Select>
        <List
          style={{
            padding: '0 8px 10px 8px',
            borderBottom:
              screenMode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid #D5D7DC',
          }}
          height={700}
          itemCount={filteredDataArray?.length}
          itemSize={90}
          width={'100%'}
        >
          {({ index, style }) => {
            const event = filteredDataArray[index];
            return (
              <StyledEventItem
                style={style}
                key={index}
                screen_mode={screenMode}
              >
                <div
                  // to={`/detail-company/${data.symbol}`}
                  // target="_blank"
                  className="card"
                >
                  <Link
                    to={`/detail-company/${event.symbol}`}
                    className="header"
                  >
                    <img
                      src={event.image || ImageDefault}
                      alt="Vingroup Logo"
                      className="logo"
                    />
                  </Link>
                  <Link
                    to={`/detail-company/${event.symbol}`}
                    className="content"
                  >
                    <div className="header-group">
                      {' '}
                      <Tooltip className="title" title={event.companyName}>
                        {event.companyName.length > 26
                          ? `${event.companyName.slice(0, 26)}...`
                          : event.companyName}
                      </Tooltip>
                      {/* <p className="title">{event.companyName}</p> */}
                      {!event.isFollow ? (
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFollowTopic(event.symbol);
                          }}
                          className="btn-join"
                        >
                          Tham gia
                        </div>
                      ) : (
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleUnFollowTopic(event.symbol);
                          }}
                          className="btn-join"
                        >
                          Rời nhóm
                        </div>
                      )}
                    </div>

                    <p className="desc">{event.symbol}</p>
                    {/* <div className="footer">
                      <span>13:27</span>
                    </div> */}
                  </Link>
                </div>
              </StyledEventItem>
            );
          }}
        </List>
      </Flex>
    </StyledEvents>
  );
};

export default Events;

// const EventItem = ({
//   data,
//   index,
//   getListCompanyGroup,
// }: {
//   data: IEvent;
//   getListCompanyGroup: any;
// }) => {
//   const screenMode = useSelector(screenModeSelector, shallowEqual);

//   return (

//   );
// };
