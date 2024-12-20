import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { StyledHeaderNews } from './styled';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';

export const HeaderNews = ({ typeProps }) => {
  const { id } = useParams();
  const [type, setType] = useState('');
  const screenMode = useSelector(screenModeSelector);
  useEffect(() => {
    if (id) {
      setType(id);
    } else if (typeProps) {
      setType(typeProps);
    }
  }, [id, typeProps]);

  const location = useLocation();
  const next = useNavigate();
  useEffect(() => {
    const tab = location.state?.tab || 'general';
    switch (tab) {
      case 'tin-tuc-chinh':
        setType('');
        next('/tin-tuc');
        break;
      case 'chung-khoan':
        setType('chung-khoan');
        next('/tab-news/chung-khoan');
        break;
      case 'bat-dong-san':
        setType('bat-dong-san');
        next('/tab-news/bat-dong-san');
        break;
      case 'tai-chinh-tin-tuc':
        setType('tai-chinh');
        next('/tab-news/tai-chinh');
        break;
      case 'ngan-hang':
        setType('ngan-hang');
        next('/tab-news/ngan-hang');
        break;
      case 'kinh-te-viet-nam':
        setType('kinh-te-viet-nam');
        next('/tab-news/kinh-te-viet-nam');
        break;
      case 'vi-mo':
        setType('vi-mo');
        next('/tab-news/vi-mo');
        break;
      case 'xa-hoi':
        setType('xa-hoi');
        next('/tab-news/xa-hoi');
        break;
      case 'doanh-nhan':
        setType('doanh-nhan');
        next('/tab-news/doanh-nhan');
        break;
      case 'khoi-nghiep':
        setType('khoi-nghiep');
        next('/tab-news/khoi-nghiep');
        break;
      case 'kinh-te-quoc-te':
        setType('kinh-te-quoc-te');
        next('/tab-news/kinh-te-quoc-te');
        break;

      default:
        break;
    }
  }, [location, next]);
  return (
    <StyledHeaderNews screen_mode={screenMode}>
      <div className="box-tab-nav">
        <ul>
          <Link to="/tin-tuc" className={type === '' ? 'active' : 'tab-item'}>
            Tin tức chính
          </Link>
          <Link
            to="/tab-news/chung-khoan"
            className={type === 'chung-khoan' ? 'active' : 'tab-item'}
          >
            Chứng khoán
          </Link>
          <Link
            to="/tab-news/bat-dong-san"
            className={type === 'bat-dong-san' ? 'active' : 'tab-item'}
          >
            Bất động sản
          </Link>
          <Link
            to="/tab-news/tai-chinh"
            className={type === 'tai-chinh' ? 'active' : 'tab-item'}
          >
            Tài chính
          </Link>
          <Link
            to="/tab-news/ngan-hang"
            className={type === 'ngan-hang' ? 'active' : 'tab-item'}
          >
            Ngân hàng
          </Link>
          <Link
            to="/tab-news/kinh-te-viet-nam"
            className={type === 'kinh-te-viet-nam' ? 'active' : 'tab-item'}
          >
            Kinh tế Việt Nam
          </Link>
          <Link
            to="/tab-news/vi-mo"
            className={type === 'vi-mo' ? 'active' : 'tab-item'}
          >
            Vĩ mô
          </Link>
          <Link
            to="/tab-news/xa-hoi"
            className={type === 'xa-hoi' ? 'active' : 'tab-item'}
          >
            Xã hội
          </Link>
          <Link
            to="/tab-news/doanh-nhan"
            className={type === 'doanh-nhan' ? 'active' : 'tab-item'}
          >
            Doanh nhân
          </Link>
          <Link
            to="/tab-news/khoi-nghiep"
            className={type === 'khoi-nghiep' ? 'active' : 'tab-item'}
          >
            Khởi nghiệp
          </Link>
          <Link
            to="/tab-news/kinh-te-quoc-te"
            className={type === 'kinh-te-quoc-te' ? 'active' : 'tab-item'}
          >
            Kinh tế quốc tế
          </Link>
        </ul>
      </div>
    </StyledHeaderNews>
  );
};
