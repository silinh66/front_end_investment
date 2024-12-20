/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import StyledHeader from './styled';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Input,
  Switch,
  ConfigProvider,
  Button,
  Flex,
  Modal,
  Select,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import logo from '@assets/logo/dautubenvung.png';
import logo from '@assets/logo/Logo.svg';
import logoden from '@assets/logo/LogoWhite.svg';
// import logoden from '@assets/logo/logodautuden.png';
import useScreenMode from '@/redux/screen/hook';
import { FC, useCallback, useEffect, useState } from 'react';
import { HEADER_NAVIGATION, LIST_FUNCTION } from '@/constants/common';
import AuthGroup from './AuthGroup';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '@/redux/search/search';
import { GiHamburgerMenu } from 'react-icons/gi';
import api from '@/config/api';
import home_navbar from '@assets/icons/home_navbar.svg';
import chart_navbar from '@assets/icons/chart_navbar.svg';
import filter_navbar from '@assets/icons/filter_navbar.svg';
import macro_navbar from '@assets/icons/macro_navbar.svg';
import analytic_navbar from '@assets/icons/analytic_navbar.svg';
import community_navbar from '@assets/icons/community_navbar.svg';
import news_navbar from '@assets/icons/news_navbar.svg';
import search_icon from '@assets/icons/search_icon.svg';
import table_price_navbar from '@assets/icons/table_price_navbar.svg';

type Props = {
  screenMode: string;
  isOpenSignIn: any;
  setIsOpenSignIn: any;
};

const Header: FC<Props> = ({ screenMode, isOpenSignIn, setIsOpenSignIn }) => {
  const [openNavMb, setOpenNavMb] = useState(false);
  const { handleChangeScreenMode } = useScreenMode();
  const next = useNavigate();
  const dispatch = useDispatch();
  // const [searchGlobal, setSearchGlobal] = useState('');
  const code = useSelector((state: any) => state.search.code);
  const [listCompany, setListCompany] = useState<any>([]);
  const LIST_ICON_NAVBAR: any = {
    home: home_navbar,
    chart: chart_navbar,
    table: table_price_navbar,
    filter: filter_navbar,
    macro: macro_navbar,
    analytic: analytic_navbar,
    community: community_navbar,
    news: news_navbar,
  };
  let path = window.location.pathname;
  path = path.split('/')[1];
  const LIST_ICON_NAVBAR_SVG: any = {
    home: (
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.4127 8.58736L8.91288 1.08751C8.85872 1.03326 8.79425 0.990063 8.72345 0.960683C8.65258 0.931275 8.5766 0.916138 8.49988 0.916138C8.42315 0.916138 8.34717 0.931275 8.2763 0.960683C8.2055 0.990063 8.14103 1.03326 8.08688 1.08751L0.587024 8.58736C0.477529 8.69686 0.416016 8.84537 0.416016 9.00022C0.416016 9.15506 0.477529 9.30357 0.587024 9.41307C0.696519 9.52256 0.845026 9.58407 0.999875 9.58407C1.15472 9.58407 1.30323 9.52256 1.41273 9.41307L2.08321 8.74258V14.8336C2.08321 15.4303 2.32026 16.0026 2.74222 16.4245C3.16418 16.8465 3.73647 17.0836 4.33321 17.0836H12.6665C13.2633 17.0836 13.8356 16.8465 14.2575 16.4245C14.6795 16.0026 14.9165 15.4303 14.9165 14.8336V8.74259L15.587 9.41307C15.6965 9.52256 15.845 9.58407 15.9999 9.58407C16.1547 9.58407 16.3032 9.52256 16.4127 9.41307C16.5222 9.30357 16.5837 9.15506 16.5837 9.00022C16.5837 8.84537 16.5222 8.69686 16.4127 8.58736ZM8.49988 2.32592L13.7499 7.57592V14.8336C13.7499 15.1209 13.6357 15.3964 13.4326 15.5996C13.2294 15.8027 12.9539 15.9169 12.6665 15.9169H10.9617C10.9865 15.8379 10.9999 15.7539 10.9999 15.6667V10.6667C10.9999 10.2065 10.6268 9.83337 10.1665 9.83337H7.66653C7.2063 9.83337 6.8332 10.2065 6.8332 10.6667V15.6667C6.8332 15.7539 6.84658 15.8379 6.87141 15.9169H4.33321C4.04589 15.9169 3.77034 15.8027 3.56718 15.5996C3.36401 15.3964 3.24988 15.1209 3.24988 14.8336V7.57592L8.49988 2.32592ZM7.8332 15.5V10.8334H9.99987V15.5H7.8332Z"
          fill={
            path == ''
              ? screenMode === 'dark'
                ? '#99BAFF'
                : '#004AEA'
              : screenMode === 'dark'
                ? '#fff'
                : '#2E3138'
          }
        />
      </svg>
    ),
    chart: (
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.666992 0.166626C0.943135 0.166626 1.16699 0.390484 1.16699 0.666626V14.9523C1.16699 15.4536 1.36323 15.9328 1.71021 16.285C2.05693 16.637 2.5256 16.8333 3.01267 16.8333H16.5003C16.7765 16.8333 17.0003 17.0572 17.0003 17.3333C17.0003 17.6094 16.7765 17.8333 16.5003 17.8333H3.01267C2.25552 17.8333 1.53092 17.5279 0.997844 16.9868C0.465019 16.446 0.166992 15.714 0.166992 14.9523V0.666626C0.166992 0.390484 0.39085 0.166626 0.666992 0.166626ZM13.5682 2.54758C13.8444 2.54758 14.0682 2.77144 14.0682 3.04758V13.7619C14.0682 14.038 13.8444 14.2619 13.5682 14.2619C13.2921 14.2619 13.0682 14.038 13.0682 13.7619V3.04758C13.0682 2.77144 13.2921 2.54758 13.5682 2.54758ZM8.87687 6.11901C9.15301 6.11901 9.37687 6.34286 9.37687 6.61901V13.7619C9.37687 14.038 9.15301 14.2619 8.87687 14.2619C8.60073 14.2619 8.37687 14.038 8.37687 13.7619V6.61901C8.37687 6.34286 8.60073 6.11901 8.87687 6.11901ZM4.18551 9.69044C4.46165 9.69044 4.68551 9.91429 4.68551 10.1904V13.7619C4.68551 14.038 4.46165 14.2619 4.18551 14.2619C3.90937 14.2619 3.68551 14.038 3.68551 13.7619V10.1904C3.68551 9.91429 3.90937 9.69044 4.18551 9.69044Z"
          fill={
            path === 'bieu-do'
              ? screenMode === 'dark'
                ? '#99BAFF'
                : '#004AEA'
              : screenMode === 'dark'
                ? '#fff'
                : '#2E3138'
          }
        />
      </svg>
    ),
    table: (
      <svg
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 13.9859V2.01406C0 1.59781 0.148437 1.24156 0.445312 0.945312C0.742187 0.649062 1.09844 0.500625 1.51406 0.5H13.4859C13.9022 0.5 14.2584 0.648437 14.5547 0.945312C14.8509 1.24219 14.9994 1.59844 15 2.01406V13.9859C15 14.4022 14.8516 14.7584 14.5547 15.0547C14.2578 15.3509 13.9016 15.4994 13.4859 15.5H1.51406C1.09781 15.5 0.741562 15.3516 0.445312 15.0547C0.149062 14.7578 0.000625 14.4009 0 13.9859ZM0.9375 5.33281H14.0625V2.015C14.0625 1.84625 14.0084 1.70781 13.9003 1.59969C13.7922 1.49156 13.6541 1.4375 13.4859 1.4375H1.51406C1.34594 1.4375 1.20781 1.49156 1.09969 1.59969C0.991562 1.70781 0.9375 1.84625 0.9375 2.015V5.33281ZM5.62313 9.94812H9.37687V6.27031H5.62313V9.94812ZM5.62313 14.5634H9.37687V10.8856H5.62313V14.5634ZM0.9375 9.94719H4.68563V6.26938H0.9375V9.94719ZM10.3144 9.94719H14.0625V6.26938H10.3144V9.94719ZM1.515 14.5625H4.68563V10.8847H0.9375V13.9859C0.9375 14.1541 0.991562 14.2922 1.09969 14.4003C1.20781 14.5084 1.34625 14.5625 1.515 14.5625ZM10.3144 14.5625H13.485C13.6538 14.5625 13.7922 14.5084 13.9003 14.4003C14.0084 14.2922 14.0625 14.1541 14.0625 13.9859V10.8847H10.3144V14.5625Z"
          fill={
            path === 'bang-gia'
              ? screenMode === 'dark'
                ? '#99BAFF'
                : '#004AEA'
              : screenMode === 'dark'
                ? '#fff'
                : '#2E3138'
          }
        />
      </svg>
    ),
    filter: (
      <svg
        width="19"
        height="17"
        viewBox="0 0 19 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.8336 0.222168H1.16688C1.01954 0.222168 0.878233 0.2807 0.774047 0.384887C0.66986 0.489073 0.611328 0.630381 0.611328 0.777723V1.7055C0.61215 1.9704 0.718047 2.22415 0.905773 2.41106L7.278 8.87772V14.5444L8.38911 14.9666V8.5555C8.38953 8.48239 8.37551 8.40991 8.34787 8.34222C8.32022 8.27453 8.27948 8.21297 8.228 8.16106L1.72244 1.66106V1.33328H17.278V1.67217L10.7947 8.16106C10.7391 8.21109 10.6943 8.27181 10.6628 8.33959C10.6313 8.40737 10.6138 8.4808 10.6113 8.5555V15.8944L11.7224 16.3333V8.83328L18.0947 2.44439C18.1896 2.34987 18.2646 2.23723 18.3152 2.11317C18.3658 1.9891 18.3909 1.85614 18.3891 1.72217V0.777723C18.3891 0.630381 18.3306 0.489073 18.2264 0.384887C18.1222 0.2807 17.9809 0.222168 17.8336 0.222168Z"
          fill={
            path === 'loc-co-phieu'
              ? screenMode === 'dark'
                ? '#99BAFF'
                : '#004AEA'
              : screenMode === 'dark'
                ? '#fff'
                : '#2E3138'
          }
        />
      </svg>
    ),
    macro: (
      <svg
        width="17"
        height="19"
        viewBox="0 0 17 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.41703 9.0364V5.37628C4.41703 5.15808 4.49329 4.97189 4.64582 4.81771C4.7977 4.66353 4.98254 4.58644 5.20034 4.58644C5.41814 4.58644 5.60298 4.66353 5.75486 4.81771C5.90739 4.97189 5.98365 5.15808 5.98365 5.37628V9.0364C5.98365 9.25461 5.90739 9.4408 5.75486 9.59498C5.60234 9.74916 5.4175 9.82625 5.20034 9.82625C4.98319 9.82625 4.79835 9.74916 4.64582 9.59498C4.49329 9.4408 4.41703 9.25461 4.41703 9.0364ZM8.6312 10.3211V1.45843C8.6312 1.23892 8.70714 1.05207 8.85902 0.897895C9.01155 0.743716 9.19639 0.666626 9.41354 0.666626C9.63134 0.666626 9.81618 0.743716 9.96806 0.897895C10.1206 1.05207 10.1969 1.23892 10.1969 1.45843V10.3211C10.1969 10.5851 10.1167 10.783 9.95643 10.915C9.7955 11.0469 9.61551 11.1129 9.41645 11.1129C9.21739 11.1129 9.03643 11.0469 8.87356 10.915C8.71069 10.783 8.62991 10.5851 8.6312 10.3211ZM0.166992 12.4202V9.29805C0.166992 9.07854 0.242932 8.8917 0.394811 8.73752C0.547337 8.58334 0.732501 8.50625 0.950302 8.50625C1.1681 8.50625 1.35294 8.58334 1.50482 8.73752C1.6567 8.8917 1.73264 9.07854 1.73264 9.29805V12.4212C1.73264 12.6851 1.6525 12.8827 1.49222 13.014C1.33194 13.146 1.15195 13.212 0.952241 13.212C0.753182 13.212 0.572219 13.146 0.409353 13.014C0.247779 12.8827 0.166992 12.6851 0.166992 12.4212M1.21884 18.1666C1.00233 18.1666 0.852711 18.067 0.769986 17.8677C0.68726 17.6691 0.724745 17.4898 0.882441 17.3297L4.67103 13.5011C4.81127 13.3587 4.98416 13.2793 5.18968 13.2629C5.3952 13.2466 5.57778 13.3097 5.73741 13.4521L8.6312 15.9657L15.1779 9.34705H13.4406C13.3029 9.34705 13.1879 9.30001 13.0955 9.20594C13.0031 9.11186 12.9565 8.99525 12.9559 8.85609C12.9552 8.71694 13.0018 8.60065 13.0955 8.50723C13.1892 8.41381 13.3042 8.3671 13.4406 8.3671H16.0503C16.2727 8.3671 16.4588 8.44288 16.6087 8.59445C16.7587 8.74601 16.8337 8.93416 16.8337 9.1589V11.7969C16.8337 11.9361 16.7871 12.0524 16.6941 12.1458C16.601 12.2392 16.4856 12.2863 16.348 12.2869C16.2103 12.2876 16.0953 12.2405 16.0028 12.1458C15.9104 12.0511 15.8642 11.9348 15.8642 11.7969V10.0409L9.17118 16.8065C9.03094 16.9482 8.85805 17.0273 8.65253 17.0436C8.44701 17.0599 8.26443 16.9969 8.10479 16.8545L5.21101 14.3409L1.56881 18.0236C1.52744 18.0628 1.47542 18.0964 1.41273 18.1245C1.35004 18.1526 1.28541 18.1666 1.21884 18.1666Z"
          fill={
            path === 'vi-mo'
              ? screenMode === 'dark'
                ? '#99BAFF'
                : '#004AEA'
              : screenMode === 'dark'
                ? '#fff'
                : '#2E3138'
          }
        />
      </svg>
    ),

    analytic: (
      <svg
        width="19"
        height="17"
        viewBox="0 0 19 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.4925 13L14.6575 16.75H13.215L11.05 13H7.9575L5.7925 16.75H4.35L6.515 13H2.625C2.45924 13 2.30027 12.9342 2.18306 12.8169C2.06585 12.6997 2 12.5408 2 12.375V1.75H0.75C0.58424 1.75 0.425268 1.68415 0.308058 1.56694C0.190848 1.44973 0.125 1.29076 0.125 1.125C0.125 0.95924 0.190848 0.800269 0.308058 0.683058C0.425268 0.565848 0.58424 0.5 0.75 0.5H18.25C18.4158 0.5 18.5747 0.565848 18.6919 0.683058C18.8092 0.800269 18.875 0.95924 18.875 1.125C18.875 1.29076 18.8092 1.44973 18.6919 1.56694C18.5747 1.68415 18.4158 1.75 18.25 1.75H17V12.375C17 12.5408 16.9342 12.6997 16.8169 12.8169C16.6997 12.9342 16.5408 13 16.375 13H12.4925ZM15.75 1.75H3.25V11.75H15.75V1.75ZM6.375 6.75C6.54076 6.75 6.69973 6.81585 6.81694 6.93306C6.93415 7.05027 7 7.20924 7 7.375V8.625C7 8.79076 6.93415 8.94973 6.81694 9.06694C6.69973 9.18415 6.54076 9.25 6.375 9.25C6.20924 9.25 6.05027 9.18415 5.93306 9.06694C5.81585 8.94973 5.75 8.79076 5.75 8.625V7.375C5.75 7.20924 5.81585 7.05027 5.93306 6.93306C6.05027 6.81585 6.20924 6.75 6.375 6.75ZM9.5 5.5C9.66576 5.5 9.82473 5.56585 9.94194 5.68306C10.0592 5.80027 10.125 5.95924 10.125 6.125V8.625C10.125 8.79076 10.0592 8.94973 9.94194 9.06694C9.82473 9.18415 9.66576 9.25 9.5 9.25C9.33424 9.25 9.17527 9.18415 9.05806 9.06694C8.94085 8.94973 8.875 8.79076 8.875 8.625V6.125C8.875 5.95924 8.94085 5.80027 9.05806 5.68306C9.17527 5.56585 9.33424 5.5 9.5 5.5ZM12.625 4.25C12.7908 4.25 12.9497 4.31585 13.0669 4.43306C13.1842 4.55027 13.25 4.70924 13.25 4.875V8.625C13.25 8.79076 13.1842 8.94973 13.0669 9.06694C12.9497 9.18415 12.7908 9.25 12.625 9.25C12.4592 9.25 12.3003 9.18415 12.1831 9.06694C12.0658 8.94973 12 8.79076 12 8.625V4.875C12 4.70924 12.0658 4.55027 12.1831 4.43306C12.3003 4.31585 12.4592 4.25 12.625 4.25Z"
          fill={
            path === 'phan-tich'
              ? screenMode === 'dark'
                ? '#99BAFF'
                : '#004AEA'
              : screenMode === 'dark'
                ? '#fff'
                : '#2E3138'
          }
        />
      </svg>
    ),
    community: (
      <svg
        width="19"
        height="13"
        viewBox="0 0 19 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 13V11.3819C0 10.926 0.121225 10.534 0.363675 10.2059C0.606799 9.87838 0.933433 9.61639 1.34358 9.41989C2.21976 9.01381 3.08989 8.69025 3.95396 8.44921C4.81735 8.20818 5.85652 8.08767 7.07146 8.08767C8.2864 8.08767 9.32591 8.20818 10.19 8.44921C11.054 8.69025 11.9242 9.01381 12.8004 9.41989C13.2098 9.61639 13.5361 9.87838 13.7792 10.2059C14.0217 10.534 14.1429 10.926 14.1429 11.3819V13H0ZM16.1633 13V11.3367C16.1633 10.7669 16.0448 10.2294 15.8077 9.72446C15.5714 9.21881 15.2353 8.78522 14.7996 8.42367C15.2959 8.52192 15.7741 8.65815 16.2341 8.83238C16.6934 9.00726 17.148 9.20342 17.5978 9.42087C18.0356 9.63505 18.3787 9.90916 18.6272 10.2432C18.8757 10.5772 19 10.9417 19 11.3367V13H16.1633ZM7.07146 5.89578C6.23837 5.89578 5.52517 5.60694 4.93184 5.02925C4.33851 4.45156 4.04151 3.75761 4.04083 2.9474C4.04016 2.13719 4.33716 1.44357 4.93184 0.866537C5.52651 0.289501 6.23972 0.000656089 7.07146 1.11139e-06C7.9032 -0.000653866 8.61674 0.288191 9.21209 0.866537C9.80744 1.44488 10.1041 2.1385 10.1021 2.9474C10.1001 3.7563 9.8034 4.45057 9.21209 5.03023C8.62078 5.60989 7.90724 5.89808 7.07146 5.8948M14.4157 2.9474C14.4157 3.75826 14.1187 4.45254 13.5247 5.03023C12.9307 5.60792 12.2175 5.89611 11.385 5.8948C11.3419 5.8948 11.2874 5.89022 11.2214 5.88105C11.1554 5.87188 11.1008 5.8614 11.0577 5.84961C11.4005 5.44221 11.6635 4.99028 11.8467 4.4938C12.0306 3.99668 12.1225 3.48055 12.1225 2.94544C12.1225 2.41032 12.0265 1.89944 11.8346 1.41279C11.6427 0.92614 11.3837 0.470603 11.0577 0.0461774C11.1123 0.0271831 11.1668 0.0147384 11.2214 0.00884361C11.2759 0.00294881 11.3305 1.11139e-06 11.385 1.11139e-06C12.2181 1.11139e-06 12.9313 0.288846 13.5247 0.866537C14.118 1.44423 14.415 2.13785 14.4157 2.9474ZM1.01021 12.0175H13.1327V11.3819C13.1327 11.1513 13.0734 10.9499 12.9549 10.7777C12.8364 10.6054 12.6236 10.4403 12.3165 10.2825C11.5628 9.89082 10.7681 9.59084 9.93237 9.38256C9.09659 9.17428 8.14295 9.07013 7.07146 9.07013C5.99996 9.07013 5.04599 9.17428 4.20954 9.38256C3.37443 9.59084 2.57974 9.89082 1.82545 10.2825C1.51902 10.4397 1.30654 10.6047 1.18801 10.7777C1.06947 10.9499 1.01021 11.1513 1.01021 11.3819V12.0175ZM7.07146 4.91332C7.62707 4.91332 8.10288 4.72075 8.49888 4.33563C8.89489 3.9505 9.09255 3.48776 9.09188 2.9474C9.0912 2.40704 8.89354 1.94463 8.49888 1.56016C8.10423 1.17569 7.62842 0.983123 7.07146 0.982468C6.5145 0.981813 6.03903 1.17438 5.64505 1.56016C5.25106 1.94594 5.05306 2.40835 5.05104 2.9474C5.04902 3.48645 5.24702 3.94919 5.64505 4.33563C6.04307 4.72206 6.51854 4.9143 7.07146 4.91233"
          fill={
            path === 'cong-dong'
              ? screenMode === 'dark'
                ? '#99BAFF'
                : '#004AEA'
              : screenMode === 'dark'
                ? '#fff'
                : '#2E3138'
          }
        />
      </svg>
    ),
    news: (
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.5 1.33337C0.5 1.05723 0.723858 0.833374 1 0.833374H12.6667C12.9428 0.833374 13.1667 1.05723 13.1667 1.33337V4.16671H16C16.2761 4.16671 16.5 4.39056 16.5 4.66671V13C16.5 13.5747 16.2717 14.1258 15.8654 14.5321C15.4591 14.9384 14.908 15.1667 14.3333 15.1667H2.66667C2.09203 15.1667 1.54093 14.9384 1.1346 14.5321C0.728273 14.1258 0.5 13.5747 0.5 13V1.33337ZM12.5076 14.1667H2.66667C2.35725 14.1667 2.0605 14.0438 1.84171 13.825C1.62292 13.6062 1.5 13.3095 1.5 13V1.83337H12.1667V13C12.1667 13.4167 12.2867 13.821 12.5076 14.1667ZM13.1667 5.16671V13C13.1667 13.3095 13.2896 13.6062 13.5084 13.825C13.7272 14.0438 14.0239 14.1667 14.3333 14.1667C14.6428 14.1667 14.9395 14.0438 15.1583 13.825C15.3771 13.6062 15.5 13.3095 15.5 13V5.16671H13.1667ZM3.83333 4.66671C3.83333 4.39056 4.05719 4.16671 4.33333 4.16671H9.33333C9.60948 4.16671 9.83333 4.39056 9.83333 4.66671C9.83333 4.94285 9.60948 5.16671 9.33333 5.16671H4.33333C4.05719 5.16671 3.83333 4.94285 3.83333 4.66671ZM5.5 8.00004C5.5 7.7239 5.72386 7.50004 6 7.50004H9.33333C9.60948 7.50004 9.83333 7.7239 9.83333 8.00004C9.83333 8.27618 9.60948 8.50004 9.33333 8.50004H6C5.72386 8.50004 5.5 8.27618 5.5 8.00004Z"
          fill={
            path === 'tin-tuc'
              ? screenMode === 'dark'
                ? '#99BAFF'
                : '#004AEA'
              : screenMode === 'dark'
                ? '#fff'
                : '#2E3138'
          }
        />
      </svg>
    ),
  };

  useEffect(() => {
    api
      .get(`/list-company`)
      .then((resListCompany) => setListCompany(resListCompany?.data?.data));
  }, []);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (code) {
      next('/bieu-do');
    }
  }, [code]);
  const onChangeCode = (e) => {
    // setSearchGlobal(e.target.value);
    setInput(e.target.value);
  };
  const newListCompany = listCompany?.map((obj: any) => ({
    name: obj.organTypeCode,
    value: obj.comTypeCode,
  }));
  const [options, setOptions] = useState(newListCompany);
  const [functions, setFunction] = useState(LIST_FUNCTION);
  const handleSelectCompany = useCallback((value: string) => {
    dispatch(setSearch(value));
  }, []);
  const handleSelectFunction = useCallback((value: string) => {
    //change route
    switch (value) {
      case 'bien-dong':
        next('/', { state: { tab: 'bien-dong' } });
        break;
      case 'nuoc-ngoai':
        next('/', { state: { tab: 'nuoc-ngoai' } });
        break;
      case 'tu-doanh':
        next('/', { state: { tab: 'tu-doanh' } });
        break;
      case 'thanh-khoan':
        next('/', { state: { tab: 'thanh-khoan' } });
        break;
      case 'bien-dong-nganh':
        next('/', { state: { tab: 'bien-dong-nganh' } });
        break;
      case 'dien-bien-dong-tien-nganh':
        next('/', { state: { tab: 'dien-bien-dong-tien-nganh' } });
        break;
      case 'lai-suat':
        next('/', { state: { tab: 'lai-suat' } });
        break;
      case 'gia-vang':
        next('/', { state: { tab: 'gia-vang' } });
        break;
      case 'ty-gia':
        next('/', { state: { tab: 'ty-gia' } });
        break;
      case 'the-gioi':
        next('/', { state: { tab: 'the-gioi' } });
        break;
      case 'hang-hoa':
        next('/', { state: { tab: 'hang-hoa' } });
        break;
      case 'xang-dau':
        next('/', { state: { tab: 'xang-dau' } });
        break;
      case 'gia-heo':
        next('/', { state: { tab: 'gia-heo' } });
        break;
      case 'gia-thep':
        next('/', { state: { tab: 'gia-thep' } });
        break;
      case 'gia-gao':
        next('/', { state: { tab: 'gia-gao' } });
        break;
      case 'ca-tra':
        next('/', { state: { tab: 'ca-tra' } });
        break;
      case 'gia-phan':
        next('/', { state: { tab: 'gia-phan' } });
        break;
      case 'gia-dien':
        next('/', { state: { tab: 'gia-dien' } });
        break;
      case 'chi-tiet':
        next('/bieu-do', { state: { tab: 'chi-tiet' } });
        break;
      case 'thong-ke':
        next('/bieu-do', { state: { tab: 'thong-ke' } });
        break;
      case 'bo-loc-chi-tieu':
        next('/loc-co-phieu', { state: { tab: 'bo-loc-chi-tieu' } });
        break;
      case 'bo-loc-ky-thuat':
        next('/loc-co-phieu', { state: { tab: 'bo-loc-ky-thuat' } });
        break;
      case 'cai-dat-tin-hieu':
        next('/loc-co-phieu', { state: { tab: 'cai-dat-tin-hieu' } });
        break;
      case 'gdp':
        next('/vi-mo', { state: { tab: 'gdp' } });
        break;
      case 'cpi':
        next('/vi-mo', { state: { tab: 'cpi' } });
        break;
      case 'xuat-nhap-khau':
        next('/vi-mo', { state: { tab: 'xuat-nhap-khau' } });
        break;
      case 'dau-tu-cong':
        next('/vi-mo', { state: { tab: 'dau-tu-cong' } });
        break;
      case 'fdi':
        next('/vi-mo', { state: { tab: 'fdi' } });
        break;
      case 'pmi-iip':
        next('/vi-mo', { state: { tab: 'pmi-iip' } });
        break;
      case 'tong-quan':
        next('/phan-tich', { state: { tab: 'tong-quan' } });
        break;
      case 'ho-so':
        next('/phan-tich', { state: { tab: 'ho-so' } });
        break;
      case 'tai-chinh-phan-tich':
        next('/phan-tich', { state: { tab: 'tai-chinh-phan-tich' } });
        break;
      case 'thong-ke-giao-dich':
        next('/phan-tich', { state: { tab: 'thong-ke-giao-dich' } });
        break;
      case 'bieu-do-tai-chinh':
        next('/phan-tich', { state: { tab: 'bieu-do-tai-chinh' } });
        break;
      case 'moi-nhat':
        next('/cong-dong/forum/forum', { state: { tab: 'moi-nhat' } });
        break;
      case 'nhieu-tuong-tac':
        next('/cong-dong/forum/forum', { state: { tab: 'nhieu-tuong-tac' } });
        break;
      case 'tin-tuc-chinh':
        next('/tin-tuc', { state: { tab: 'tin-tuc-chinh' } });
        break;
      case 'chung-khoan':
        next('/tin-tuc', { state: { tab: 'chung-khoan' } });
        break;
      case 'bat-dong-san':
        next('/tin-tuc', { state: { tab: 'bat-dong-san' } });
        break;
      case 'tai-chinh-tin-tuc':
        next('/tin-tuc', { state: { tab: 'tai-chinh-tin-tuc' } });
        break;
      case 'ngan-hang':
        next('/tin-tuc', { state: { tab: 'ngan-hang' } });
        break;
      case 'kinh-te-viet-nam':
        next('/tin-tuc', { state: { tab: 'kinh-te-viet-nam' } });
        break;
      case 'vi-mo':
        next('/tin-tuc', { state: { tab: 'vi-mo' } });
        break;
      case 'xa-hoi':
        next('/tin-tuc', { state: { tab: 'xa-hoi' } });
        break;
      case 'doanh-nhan':
        next('/tin-tuc', { state: { tab: 'doanh-nhan' } });
        break;
      case 'khoi-nghiep':
        next('/tin-tuc', { state: { tab: 'khoi-nghiep' } });
        break;
      case 'kinh-te-quoc-te':
        next('/tin-tuc', { state: { tab: 'kinh-te-quoc-te' } });
        break;

      default:
        break;
    }
  }, []);

  useEffect(() => {
    const newListCompanyMap = listCompany?.map((obj: any) => ({
      name: obj.organTypeCode,
      value: obj.comTypeCode,
    }));
    setOptions(newListCompanyMap);
  }, [listCompany]);

  const handleSearchFunction = (input) => {
    const filtered = LIST_FUNCTION.filter(
      (company) =>
        company.title.toLowerCase().includes(input.toLowerCase()) ||
        company.title.toLowerCase().includes(input.toLowerCase())
    );
    setFunction(filtered);
  };
  const handleSearch = (input) => {
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
  };
  return (
    <StyledHeader screen_mode={screenMode}>
      <div className="list-nav">
        <GiHamburgerMenu
          style={{ cursor: 'pointer' }}
          onClick={() => setOpenNavMb(!openNavMb)}
        />
        {openNavMb ? (
          <div className="navigation-mobile">
            <div className="search-bar">
              <Select
                style={{ width: '300px' }}
                showSearch
                // defaultValue="VIC"
                onChange={handleSelectCompany}
                onSearch={handleSearch}
                filterOption={false}
                placeholder="Tìm kiếm mã cổ phiếu"
                className="custom-select-placeholder"
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
            </div>
            <div className="navigation-children">
              {HEADER_NAVIGATION.map((item, i) => (
                <NavLink to={item.link} key={i}>
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="auth">
              <AuthGroup
                isOpenSignIn={isOpenSignIn}
                setIsOpenSignIn={setIsOpenSignIn}
                screenMode={screenMode}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="header-layout">
        <Link to="/" className="page-logo">
          <img
            style={{ width: '100%', height: '28px' }}
            src={screenMode === 'dark' ? logo : logoden}
            alt=""
          />
        </Link>
        <div className="navigation">
          <div className="navigation-children">
            {HEADER_NAVIGATION.map((item, i) => {
              return (
                <NavLink to={item.link} key={i}>
                  {/* <img src={LIST_ICON_NAVBAR[item?.icon]} /> */}
                  {LIST_ICON_NAVBAR_SVG[item?.icon]}
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
      <div className="auth">
        <div className="search-bar">
          <form autoComplete="off">
            <Select
              showSearch
              suffixIcon={<img style={{}} src={search_icon} />}
              onChange={handleSelectFunction}
              onSearch={handleSearchFunction}
              filterOption={false}
              placeholder="Tìm kiếm chức năng"
              className="custom-select-placeholder"
            >
              {functions.map((item: any) => {
                return (
                  <Option key={item.tab} value={item.tab} label={item.tab}>
                    {item?.title}
                  </Option>
                );
              })}
            </Select>
            {/* <Select
              showSearch
              suffixIcon={<img style={{}} src={search_icon} />}
              onChange={handleSelectCompany}
              onSearch={handleSearch}
              filterOption={false}
              placeholder="Tìm kiếm mã cổ phiếu"
              className="custom-select-placeholder"
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
            </Select> */}
          </form>

          <AuthGroup
            isOpenSignIn={isOpenSignIn}
            setIsOpenSignIn={setIsOpenSignIn}
            screenMode={screenMode}
          />
          {/* <Input
            value={input}
            onChange={(e) => onChangeCode(e)}
            placeholder="Tìm kiếm..."
            prefix={<SearchOutlined />}
            // width={100}
            height={36}
            style={{
              width: ' 100% ',
              color: screenMode === 'dark' ? '#fff' : 'black',
            }}
          /> */}
        </div>
        {/* <AuthGroup screenMode={screenMode} /> */}
      </div>
      {/* <div className="screen-mode">
        <ConfigProvider
          direction="rtl"
          theme={{
            components: {
              Tabs: {
                inkBarColor: 'green',
                itemActiveColor: 'green',
                itemSelectedColor: 'green',
              },
            },
          }}
        >
          <Switch
            unCheckedChildren="Tối"
            checkedChildren="Sáng"
            checked={screenMode === 'light'}
            onChange={handleChangeScreenMode}
          />
        </ConfigProvider>
      </div> */}
    </StyledHeader>
  );
};

export default Header;
