/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Flex, Row, Skeleton, Tooltip } from 'antd';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { config } from '@/config/env';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import DOMPurify from 'dompurify';
import { LIST_INDUSTRY, LIST_MAP_GOLD_NAME } from '@/constants/common';
import USD from '/usd.png';
import EUR from '/eur.png';
import GBP from '/gbp.png';
import AUD from '/aud.png';
import CAD from '/cad.png';
import CHF from '/chf.png';
import CNY from '/cny.png';
import DKK from '/dkk.png';
import HKD from '/hkd.png';
import INR from '/inr.png';
import JPY from '/jpy.png';
import KRW from '/krw.png';
import KWD from '/kwd.png';
import MYR from '/myr.png';
import NOK from '/nok.png';
import RUB from '/rub.png';
import SAR from '/sar.png';
import SEK from '/sek.png';
import SGD from '/sgd.png';
import THB from '/thb.png';
import GOLD_ICON from '/gold_icon.png';
import FUEL from '/fuel.png';
import PORK from '/pork.png';
import STEEL from '/steel-bar.png';
import RICE from '/rice.png';
import FISH from '/fish.png';
import STOOL from '/stool.png';
import ELECTRIC from '/electric.png';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import moment from 'moment';
import { StyledNewsDetail } from './styled';
import { getNews, getNewsType } from '@/services/servicesApi/serviceApi';
import { FooterNews } from '../FooterNews/FooterNews';
import { HeaderNews } from '../HeaderNews/HeaderNews';
import { groupBy } from 'lodash';
export const DetailNews = () => {
  const [newsDetail, setNewsDetail] = useState(null);
  const { id } = useParams();

  const { state } = useLocation();

  const [type, setType] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setType(state?.item?.type);
    window.scrollTo(0, 0);
  }, [id]);
  const LIST_NGOAI_TE = {
    USD,
    EUR,
    GBP,
    AUD,
    CAD,
    CHF,
    CNY,
    DKK,
    HKD,
    INR,
    JPY,
    KRW,
    KWD,
    MYR,
    NOK,
    RUB,
    SAR,
    SEK,
    SGD,
    THB,
  };
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  const screenMode = useSelector(screenModeSelector);
  const [listGiaVang, setListGiaVang] = useState([]);
  const [listLaiSuat, setListLaiSuat] = useState([]);
  const [typeLaiSuat, setTypeLaiSuat] = useState<any>('guiTaiQuay');
  const [soThangGui, setSoThangGui] = useState<any>('18,24,36');
  const [isPickLaiSuat, setIsPickLaiSuat] = useState<any>(false);
  const [news, setNews] = useState<IFeaturedPost[]>([]);

  const [isPickSoThang, setIsPickSoThang] = useState<any>(false);
  const [listLaiSuatOnline, setListLaiSuatOnline] = useState([]);

  const [listGiaXangDau, setListGiaXangDau] = useState([]);
  const [listGiaXangDauHistory, setListGiaXangDauHistory] = useState([]);
  const [listGiaHeo, setListGiaHeo] = useState([]);
  const [listGiaThep, setListGiaThep] = useState([]);
  const [listGiaGao, setListGiaGao] = useState([]);
  const [listGiaCaTra, setListGiaCaTra] = useState([]);
  const [listGiaPhan, setlistGiaPhan] = useState([]);
  const [listGiaDien, setListGiaDien] = useState([]);
  const [curTabBottom, setCurTabBottom] = useState<any>('chiSoTheGioi');
  const [listTyGiaNgoaiTe, setTyGiaNgoaiTe] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const scrollContainerRef = useRef(null);
  useEffect(() => {
    getNews().then((res) => {
      setNews(res.data.data);
    });
  }, []);

  function formatGoldPrice(num: number) {
    // For numbers in the millions or larger
    if (num >= 1000000) {
      return (num / 1000000).toFixed(3) + ' TR';
    } else {
      // For smaller numbers, convert to string with comma as decimal separator
      // Intl.NumberFormat can be used to format numbers based on locale
      // 'de-DE' uses comma as decimal separator and period for thousands
      return new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num);
    }
  }
  const scrollHorizontally = (direction) => {
    // Assuming 200px is the scroll amount you want per click
    const scrollAmount = 100;
    if (direction === 'left') {
      scrollContainerRef?.current?.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    } else if (direction === 'right') {
      scrollContainerRef?.current?.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // setLoading(false);
    }, 500);
  }, []);
  const [listHangHoa, setListHangHoa] = useState([
    {
      name: 'Vàng',
      value: '1,959.25',
      high: '1,965.50',
      low: '1,958.05',
      change: '-10.55',
      percent: '-0.54%',
      time: '16:44:45',
      pid: '8830',
      flag: 'https://i.ibb.co/55cWx9P/gold.png',
    },
    {
      name: 'XAU/USD',
      value: '1,954.71',
      high: '1,960.84',
      low: '1,953.59',
      change: '-3.89',
      percent: '-0.20%',
      time: '16:44:40',
      pid: '68',
      flag: 'https://i.ibb.co/55cWx9P/gold.png',
    },
    {
      name: 'Bạc',
      value: '22.622',
      high: '22.797',
      low: '22.610',
      change: '-0.283',
      percent: '-1.24%',
      time: '16:44:03',
      pid: '',
      flag: 'https://i.ibb.co/fvPgc4p/Silver.png',
    },
    {
      name: 'Đồng',
      value: '3.6168',
      high: '3.6448',
      low: '3.6123',
      change: '-0.0237',
      percent: '-0.65%',
      time: '16:44:08',
      pid: '',
      flag: 'https://media.istockphoto.com/id/1356864515/vector/copper-metal-texture-brown-shiny-banner-vector-reflection-gradient.jpg?s=612x612&w=0&k=20&c=aErWCfx8WO5eEfGMWKprxfEmXAciSa_1dBk9f5TeSvA=',
    },
    {
      name: 'Platin',
      value: '856.05',
      high: '864.70',
      low: '854.60',
      change: '-6.75',
      percent: '-0.78%',
      time: '16:43:36',
      pid: '',
      flag: 'https://media.istockphoto.com/id/619048186/vector/brushed-metal-background.jpg?s=612x612&w=0&k=20&c=Io6kffBki7089r6XQJHi0cZTKa45zqNTfBio2Jbmcvo=',
    },
    {
      name: 'Paladi',
      value: '961.78',
      high: '1,003.78',
      low: '951.03',
      change: '-47.32',
      percent: '-4.69%',
      time: '16:44:04',
      pid: '',
      flag: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhIVFRUXFRUVFRUVDw8VFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZExk3NysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAQIDBAUH/8QAKxAAAgIBBAEDAwUBAQEAAAAAAAECESEDEjFBUWFxgZGx8BMiocHRBOFC/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD8lU8WNNd9/VfQzDDtYZuWrb4V+iq/hY+hR3lqp8JJ908fTo4wW791v09jnCPfZ2lrXh1fnhv38+/IHo/VVJUk/TC+V/hwvfK7wsKn32cVG22/ZHd6tJLHo+//AEDrGSiqrPnt+/k4a090tqeFl/0jlL90s8L7nZSUV+fcDcUo2+/PZx/6tRuorl8+iMa8tzUeuX/h0SUcgI6STt5flmdfWpY5fH+mP+jUdJLl/wAIsNJICR0sK8lnqUiaurS+xjT0sZAzCDaz7nS0hKaRxhFvLARuV+DajRcI5K5MA5NvHBpQou2jnKVvHACc+kWMCqFGZz6QCc+kIxEYCc+kAlKjKjZYxLKVAG6MciKNN0A4Mt2Ks1wBKoy5WG7NVQE2kcg5GtoE2kcg5FSAiQtByCXkD1xlfHPjsRVe/wDZKK9W3Td1hX9rA3PXt5dvzi/l9mYx5tU/DJ+m1yvUPW4V4X8AdZ6/Cb9r5+pzSt217f6RQfLXPHj6lerSq8AdHq0q69f6Ocsv0+7M1bvro057UB03bUctWV0l8mZPd7dnS0sgaikjlqauMdmZztUvk6RikBNPSSRJ6uHXsZnq2sF09PAGdLT8m3NIzLV5ozpQ8gSEbyzphEc0jnGNu2BOWdNtFbSOTywE5WzSiVpI5zd+wF1JdIsYlUTE5dICzl0iRiahEkpeAEpUZjEsIllKgDdGOSxiaboBwYuwlZt4AlGXKxyaoCJEcg3ZpICJEcg2WIHeMzWyuf6f8mTKnkDX6maNKD5ffyiKFeH7My5ZA1LUrAUG89fnPgKHePz0MzlQG5Tr5JVv0RFG8jUlQGpSrJh/upL5FXRqTpAa4OUp2sdkbbwdKoCxjRh6t3RlzbRuEaAmlp0Hqc+hHqc18DS0/IE04eTUpJOiPUzXgzCPbAkVbtm5NITlWDFW7YEeWdOEJOjm8sBN37G4ocIxJ2AlLwWETUUYlK+ALKXgkIlhEkp+ALKVcGYxEImpS8AJOjCVlUSydAV4MchKzbwBDLY5NAEjLkGaiB0TZrbXd/UhhNgXdk2o+v8ApKX4jLeQLKWTSXd/BEjMmBrUkRK8lS7JqMC6kqRmroJXyam6QFbpHO21Qqzd0gKlRz3N2RW0dIqgEI0YepnBNzdm4RoCacBKeaI55wIQARjm2XUlWCTlmiKObAlW7NydImpKjNWAeTfCEnSMNWAbs1FFWEc27ArlYhE1FGXKwDl4EYlhEkp+ALKXgyoljESl4ASdESCiak6APBhoqRpugIZz0KNJAaVm8dEMKwLbs2qIYfIFk8mlXyF/JmfIFmwl5C9SajAuo8ESvkJeSzeALJ0jCRUvJpvABYMRtiKNrACKoxutki2zcVQCEaMylnBN1s1GNASMS6kuiTlnAUewJt7NTlSJqS6RNvYDbZpypCcqRlRsCVZtYF0jCVgOTUVRVgxyBXKyxiWKoy5WAlPwIxKoklPwBZS6RFERgWUukAlKjO0qgalKsARujO2yqJrAESN2RMwkBezVi/zBh5YFlyaCZieWBZml6k4JqeALqPAivIRJvAGpSwZjERRd2ALZiKEImkwLEwsskUbQBKjLdsnLNJUASompLNEk7ZqgG3sakuiaj6G3yA2llKkScsUFEBGNlukHKkSMQIlZtYJdGYqwHJtKhwZWQG6zSgFGjLlbArlfBVAqiZlK+OALOXSJGBqMCSl0gDlWEZUDcdMu5II50a3EUibQpRrcTcRoBJZLdCxJWAmOBdElkCzeAlQ4DdrABvAigkFLABSJCIjEqkBUzCViMTW7IC8mXlismmwDwZm7YllleAFUNR9Em7LVIAoiUsCbwIoBCIcsBywIRAkIm7ozu8EhEBFWbWBuMRVgVZZ02pE4McsC3bOmwlJGZO2BZSv2NR0zSgqMSleOghKXSEdM6w08ZMvV8IDhQ3DcKClCybi0AaDdEbKwDyGGR5ArdgMl2BbtBIJETAqkSMSxRFICqREhFDdkC3klZCQbArdElkNZLIA8Ek7EsleEAWESTtB5KlgBBDdgl4LCICESqfJlSLCIEhE3uyRSJGIFgs5OjaRhyyRJ3kC8s6ulRmUqpEpt2Abt+nR3UUlbMul8kab9giSbeOjtDRwbSUY2zH6kv/ngDxUSxZaCpQbFigAbDYAPIYkAHJWRiwCZUCJgEyxQSImAUgkIol5AreRQSEnkBJhgSYFkR5DEuAK+CcjkvQBETwEWICMSRkIsRiBYRLvySMsiMQLGJpyp0ZcshRyBpR7OspVSOc5ZSG3NhG6bd/iPROajH1f4zjOVUjWxvIGnFy9lwj1aOhg5ynsj6vC/tjdJ8NxXhFHzDNlBFA2QoANhhgGGGRgUMMgFTCBEAiypBETAJlSCJeQDeSgkuQEmVkYkBZAMS4APgiBegKuDKYiWIFiZTETUUBIobskTKlkCpFcsmW8mksgaUezWpKmkjnOWTVd9hHTbeTrq6lRSXL+xx1JcL5OijeXyB1jDdluqXwfQ/wCfQ/afP157YpLl/Y2puSTbfjDaKPmEAIqhgAAwAAYAAAAEEABEVAAQoAEfIAASDAASAAFfBEABVwSIAFiSIAFXJLyABrsN5AAshN5RQEb+/nJrXnhIAo0sq3nxlnv0IYAA/9k=',
    },
    {
      name: 'Dầu Thô WTI',
      value: '76.41',
      high: '76.44',
      low: '75.31',
      change: '+0.67',
      percent: '+0.88%',
      time: '16:45:02',
      pid: '8849',
      flag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzVN7_6EJdvBr7sTU_IMv3n4VlI4Gm0G0Y5g&usqp=CAU',
    },
    {
      name: 'Dầu Brent',
      value: '80.80',
      high: '81.48',
      low: '79.44',
      change: '+0.79',
      percent: '+0.99%',
      time: '16:43:45',
      pid: '',
      flag: 'https://media.istockphoto.com/id/1216567143/photo/oil-barrels-black-color-on-world-map-background-3d-illustration.jpg?s=612x612&w=0&k=20&c=d7XuKgzFW3Bbpuu51XYushedb0J2tr1eYGzf8GL3iG8=',
    },
    {
      name: 'Khí Tự nhiên',
      value: '3.042',
      high: '3.054',
      low: '3.003',
      change: '+0.001',
      percent: '+0.03%',
      time: '16:44:21',
      pid: '',
      flag: 'https://img.pikbest.com/back_our/20210915/bg/14b9ba4a69c19.png!w700wp',
    },
    {
      name: 'Dầu Nhiên liệu',
      value: '2.7540',
      high: '2.7540',
      low: '2.6989',
      change: '+0.0349',
      percent: '+1.28%',
      time: '16:43:45',
      pid: '',
      flag: 'https://i.ibb.co/55cWx9P/gold.png',
    },
    {
      name: 'Xăng RBOB',
      value: '2.1860',
      high: '2.1860',
      low: '2.1539',
      change: '+0.0252',
      percent: '+1.17%',
      time: '16:44:50',
      pid: '',
      flag: 'https://i.ibb.co/55cWx9P/gold.png',
    },
    {
      name: 'Nhôm',
      value: '2,228.00',
      high: '2,247.00',
      low: '2,225.50',
      change: '-14.50',
      percent: '-0.65%',
      time: '16:44:06',
      pid: '',
      flag: 'https://png.pngtree.com/thumb_back/fh260/background/20210907/pngtree-silver-foil-aluminum-foil-silver-rough-texture-image_795818.jpg',
    },
    {
      name: 'Kẽm',
      value: '2,607.00',
      high: '2,621.00',
      low: '2,587.50',
      change: '+4.50',
      percent: '+0.17%',
      time: '16:44:01',
      pid: '956470',
      flag: 'https://static.vecteezy.com/system/resources/previews/007/009/664/non_2x/texture-of-green-zinc-sheet-abstract-background-free-photo.jpg',
    },
    {
      name: 'Ni-ken',
      value: '17,547.00',
      high: '17,686.00',
      low: '17,530.00',
      change: '-266.00',
      percent: '-1.49%',
      time: '16:43:51',
      pid: '',
      flag: 'https://phelieuvietduc.com/wp-content/uploads/2020/04/ung-dung-cua-niken.jpg',
    },
    {
      name: 'Copper',
      value: '8,090.00',
      high: '8,142.00',
      low: '8,082.00',
      change: '-57.00',
      percent: '-0.70%',
      time: '16:43:45',
      pid: '959211',
      flag: 'https://img.freepik.com/premium-vector/copper-color-background-with-blur-smooth-texture-festive-metallic-graphic-design-element_120819-2252.jpg',
    },
    {
      name: 'Lúa mì Hoa Kỳ',
      value: '577.60',
      high: '581.88',
      low: '575.38',
      change: '-2.40',
      percent: '-0.41%',
      time: '16:43:38',
      pid: '',
      flag: 'https://htmlcolorcodes.com/assets/images/colors/wheat-color-solid-background-1920x1080.png',
    },
    {
      name: 'Thóc',
      value: '16.440',
      high: '16.510',
      low: '16.440',
      change: '-0.075',
      percent: '-0.45%',
      time: '08:37:19',
      pid: '',
      flag: 'https://img.freepik.com/free-photo/close-up-white-rice-wallpaper-details_1150-34308.jpg',
    },
    {
      name: 'Bắp Hoa Kỳ',
      value: '467.88',
      high: '469.00',
      low: '467.12',
      change: '-0.12',
      percent: '-0.03%',
      time: '16:43:25',
      pid: '',
      flag: 'https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8497.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706918400&semt=ais',
    },
    {
      name: 'Nước Cam',
      value: '370.65',
      high: '371.85',
      low: '362.55',
      change: '+20.37',
      percent: '+5.82%',
      time: '02:00:04',
      pid: '',
      flag: 'https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30447.jpg',
    },
    {
      name: 'Bê',
      value: '174.30',
      high: '180.07',
      low: '174.13',
      change: '-5.10',
      percent: '-2.84%',
      time: '02:04:59',
      pid: '',
      flag: 'https://htmlcolorcodes.com/assets/images/colors/light-brown-color-solid-background-1920x1080.png',
    },
    {
      name: 'Heo nạc',
      value: '71.47',
      high: '72.50',
      low: '71.10',
      change: '-0.03',
      percent: '-0.03%',
      time: '02:04:57',
      pid: '',
      flag: 'https://www.icolorpalette.com/download/solidcolorimage/fdd7e4_solid_color_background_icolorpalette.png',
    },
    {
      name: 'Bê đực non',
      value: '224.53',
      high: '240.18',
      low: '224.39',
      change: '-6.30',
      percent: '-2.73%',
      time: '04:46:03',
      pid: '',
      flag: 'https://htmlcolorcodes.com/assets/images/colors/light-brown-color-solid-background-1920x1080.png',
    },
    {
      name: 'Gỗ',
      value: '525.50',
      high: '525.50',
      low: '518.50',
      change: '+10.00',
      percent: '+1.94%',
      time: '03:44:37',
      pid: '',
      flag: 'https://media.istockphoto.com/id/1170926172/vector/dark-brown-color-wood-textured-vector-stock-illustration.jpg?s=612x612&w=0&k=20&c=swyWiH7py5rildEWqKJ5L2anflIIuQ-kNW7NT0thKQU=',
    },
    {
      name: 'Yến mạch',
      value: '350.50',
      high: '350.70',
      low: '348.30',
      change: '-0.20',
      percent: '-0.06%',
      time: '15:09:25',
      pid: '',
      flag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9EPV2BNEpP69UDj-U8b6T2oJDKNXfa0F7SGzWcS3QGSyEmlCVMlWuO13S4vENU5xmBis&usqp=CAU',
    },
  ]);

  const [listNuocNgoai, setListNuocNgoai] = useState([
    {
      name: 'USD/VND',
      value: '24,655.0',
      high: '24,655.0',
      low: '24,655.0',
      change: '+15.0',
      percent: '+0.06%',
      time: '15:03:17',
      pid: '1062753',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png',
    },
    {
      name: 'Dow Jones',
      value: '38,654.42',
      high: '38,783.62',
      low: '38,336.57',
      change: '+134.58',
      percent: '+0.35%',
      time: '02/02',
      pid: '169',
      flag: 'https://cdn1.fialda.com/web/static/media/US.d6e2427c.svg',
    },
    {
      name: 'AEX',
      value: '822.53',
      high: '827.57',
      low: '821.69',
      change: '+0.44',
      percent: '+0.05%',
      time: '02/02',
      pid: '168',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/langvi-1500px-Flag_of_the_Netherlands.svg.png',
    },

    {
      name: 'Nasdaq',
      value: '15,628.95',
      high: '15,664.21',
      low: '15,366.78',
      change: '+267.31',
      percent: '+1.74%',
      time: '02/02',
      pid: '14958',
      flag: 'https://cdn1.fialda.com/web/static/media/US.d6e2427c.svg',
    },
    {
      name: 'S&P 500',
      value: '4,958.61',
      high: '4,975.29',
      low: '4,907.99',
      change: '+52.42',
      percent: '+1.07%',
      time: '02/02',
      pid: '166',
      flag: 'https://cdn1.fialda.com/web/static/media/US.d6e2427c.svg',
    },
    {
      name: 'Hang Seng',
      value: '15,533.56	',
      high: '15,912.61',
      low: '15,435.85	',
      change: '-32.65',
      percent: '-0.21%',
      time: '02/02',
      pid: '179',
      flag: 'https://cdn1.fialda.com/web/static/media/HK.61f78ccf.svg',
    },
    {
      name: 'Nikkei 225',
      value: '36,158.02',
      high: '36,450.00',
      low: '36,090.00',
      change: '-109.71',
      percent: '-0.30%',
      time: '02/02',
      pid: '178',
      flag: 'https://cdn1.fialda.com/web/static/media/JP.2d595f3f.svg',
    },
    {
      name: 'IBEX 35',
      value: '10,062.50',
      high: '10,132.80',
      low: '10,033.70',
      change: '+48.50',
      percent: '+0.48%',
      time: '02/02',
      pid: '174',
      flag: 'https://vietkieu.com.vn/wp-content/uploads/2020/01/y-nghia-cua-la-co-tay-ban-nha-va-cac-bieu-tuong-3.jpg',
    },
    {
      name: 'SMI',
      value: '11,239.68	',
      high: '11,300.86',
      low: '11,231.49',
      change: '+25.77',
      percent: '+0.23%',
      time: '02/02',
      pid: '176',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg',
    },
    {
      name: 'Shanghai',
      value: '2,730.15',
      high: '2,791.68',
      low: '2,666.33',
      change: '-40.59',
      percent: '-1.46%',
      time: '02/02',
      pid: '40820',
      flag: 'https://cdn1.fialda.com/web/static/media/CN.e9b8b9a7.svg',
    },
    {
      name: 'S&P/ASX 200',
      value: '7,699.40',
      high: '7,703.60',
      low: '7,588.20',
      change: '+111.20',
      percent: '+1.47%',
      time: '02/02',
      pid: '171',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg',
    },
    {
      name: 'HNX30',
      value: '493.24',
      high: '493.24',
      low: '493.24',
      change: '-0.44',
      percent: '-0.09%',
      time: '02/02',
      pid: '995072',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png',
    },
    {
      name: 'VN30',
      value: '1,174.76',
      high: '1,174.76',
      low: '1,174.76',
      change: '+1.41',
      percent: '+0.12%',
      time: '14:58:33',
      pid: '41064',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png',
    },
    {
      name: 'VNI',
      value: '1,172.55',
      high: '1,172.55',
      low: '1,172.55',
      change: '-0.47',
      percent: '-0.04%',
      time: '02/02',
      pid: '41063',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png',
    },
    {
      name: 'HNX',
      value: '230.56',
      high: '230.56',
      low: '230.56',
      change: '-0.01',
      percent: '-0.01%',
      time: '02/02',
      pid: '41062',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png',
    },
    {
      name: 'VN100',
      value: '1,179.49',
      high: '1,179.49',
      low: '1,179.49',
      change: '+1.04',
      percent: '+0.09%',
      time: '02/02',
      pid: '995068',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png',
    },
    {
      name: 'FTSE MIB',
      value: '	30,717.95',
      high: '30,913.07',
      low: '30,684.18',
      change: '+28.84',
      percent: '+0.09%',
      time: '19/01',
      pid: '951248',
      flag: 'https://vietkieu.com.vn/wp-content/uploads/2020/01/y-nghia-cua-la-co-tay-ban-nha-va-cac-bieu-tuong-3.jpg',
    },
    {
      name: 'DAX',
      value: '16,918.21',
      high: '17,004.55',
      low: '16,894.67',
      change: '+59.17',
      percent: '+0.35%',
      time: '02/02',
      pid: '172',
      flag: 'https://cdn1.fialda.com/web/static/media/DE.22d50712.svg',
    },
    {
      name: 'Euro Stoxx 50',
      value: '4,655.15',
      high: '4,675.75',
      low: '4,648.95',
      change: '++16.55',
      percent: '+0.36%',
      time: '02/02',
      pid: '175',
      flag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBSHS8rB7zceKYAhKOPMiJ2eUZq4NwkUNJw&usqp=CAU',
    },
  ]);

  const getIndustryChange = async () => {
    const response = await axios.get(
      `https://mkw-socket-v2.vndirect.com.vn/mkwsocketv2/industrychange?`
    );
    const responseVonHoa = await axios.get(
      `https://api-finfo.vndirect.com.vn/v4/leader_laggard?q=tradingDate:${moment().format('YYYY-MM-DD')}~indexCode:0500,1300,1700,2300,2700,3300,3500,3700,4500,5300,5500,5700,6500,7500,8300,8500,8600,8700,9500&size=10000`
    );
    const responseIndustry = await axios.get(
      `https://api-finfo.vndirect.com.vn/v4/industry_classification?q=industryLevel:2`
    );
    const responseForeign = await axios.get(
      `https://api-finfo.vndirect.com.vn/v4/foreigns?q=tradingDate:${moment().format('YYYY-MM-DD')}~floor:UPCOM,HNX,HOSE~type:STOCK,IFC,ETF&size=10000`
    );
    const responsePE = await axios.get(
      `${config.app.VITE_APP_API_URL}/pe-nganh`
    );
    const dataForeign = responseForeign?.data?.data;
    const dataIndustry = responseIndustry?.data?.data;
    const dataPE = responsePE?.data?.data;
    const listStockIndustryMap = dataIndustry?.map((item: any) => {
      return {
        ...item,
        listStock: item?.codeList?.split(','),
        sumForeignSell: dataForeign?.reduce((acc: any, cur: any) => {
          if (item?.codeList?.split(',').includes(cur?.symbol)) {
            return acc + cur?.sellValue;
          } else return acc;
        }, 0),
        sumForeignBuy: dataForeign?.reduce((acc: any, cur: any) => {
          if (item?.codeList?.split(',').includes(cur?.symbol)) {
            return acc + cur?.buyValue;
          } else return acc;
        }, 0),
      };
    });

    // Tạo một bản đồ (Map) để lưu trữ tổng giá trị mua và bán cho mỗi mã
    const totalBuySellMap = new Map();

    dataForeign.forEach((stock: any) => {
      const { code, buyVal, sellVal } = stock;
      if (totalBuySellMap.has(code)) {
        const existingVals = totalBuySellMap.get(code);
        totalBuySellMap.set(code, {
          buyVal: existingVals.buyVal + buyVal,
          sellVal: existingVals.sellVal + sellVal,
        });
      } else {
        totalBuySellMap.set(code, { buyVal, sellVal });
      }
    });

    // Duyệt qua mỗi ngành trong listStockIndustryMap và tính tổng
    listStockIndustryMap.forEach((industry: any) => {
      let sumBuyVal = 0;
      let sumSellVal = 0;

      industry.listStock.forEach((stockCode: any) => {
        if (totalBuySellMap.has(stockCode)) {
          const { buyVal, sellVal } = totalBuySellMap.get(stockCode);
          sumBuyVal += buyVal;
          sumSellVal += sellVal;
        }
      });

      // Thêm tổng giá trị mua và bán vào mỗi ngành
      industry.sumBuyVal = sumBuyVal;
      industry.sumSellVal = sumSellVal;
    });

    // listStockIndustryMap giờ đã được cập nhật với sumBuyVal và sumSellVal

    const dataVonHoa = responseVonHoa?.data?.data;
    const dataVonHoaGroup = groupBy(dataVonHoa, 'indexCode');
    const dataVonHoaMap = Object.keys(dataVonHoaGroup).map((item) => {
      const data = dataVonHoaGroup[item];
      const vonHoa = data?.reduce((acc, cur) => {
        return acc + cur?.prevCmv;
      }, 0);

      return {
        indexCode: item,
        vonHoa: vonHoa,
      };
    });
    const data = response?.data?.data;
    const listIndustryMap = data?.map((item: any) => {
      let itemFind = dataPE?.find((itemPE: any) => {
        return itemPE?.icbCode === item?.indexCode;
      });
      let itemFindCode = dataIndustry?.find((itemIndustry: any) => {
        return itemIndustry?.industryCode === item?.indexCode;
      });
      return {
        ...item,
        vonHoa: formatToBillion(
          dataVonHoaMap.find((itemVonHoa) => {
            return itemVonHoa?.indexCode === item?.indexCode;
          })?.vonHoa
        ),
        codeList: itemFindCode?.codeList,
        buy: formatToBillion1Decimal(
          listStockIndustryMap.find((itemStock: any) => {
            return itemStock?.industryCode === item?.indexCode;
          })?.sumBuyVal
        ),
        sell: formatToBillion1Decimal(
          listStockIndustryMap.find((itemStock: any) => {
            return itemStock?.industryCode === item?.indexCode;
          })?.sumSellVal
        ),
        pe: dataPE?.find((itemPE: any) => {
          return itemPE?.icbCode === item?.indexCode;
        })?.pe,
        phanBoDongTien: [
          (
            (itemFind?.up / (itemFind?.up + itemFind?.ref + itemFind?.down)) *
            100
          ).toFixed(2),
          (
            (itemFind?.ref / (itemFind?.up + itemFind?.ref + itemFind?.down)) *
            100
          ).toFixed(2),
          (
            (itemFind?.down / (itemFind?.up + itemFind?.ref + itemFind?.down)) *
            100
          ).toFixed(2),
        ],
        oneDay: item?.indChgPctCr1D.toFixed(2),
        oneWeek: item?.indChgPctCr5D.toFixed(2),
        oneMonth: item?.indChgPctCr1M.toFixed(2),
        // buy: '84.304',
        // sell: '84.304',
        title: LIST_INDUSTRY[item?.indexCode],
      };
    });
    setListIndustryChange(listIndustryMap);
  };

  const getHeatMap = async () => {
    const responseHeatMap = await axios.get(
      `https://fiin-market.ssi.com.vn/HeatMap/GetHeatMap?language=vi&Exchange=All&Criteria=FrBuyVal`
    );
    const dataHeatMap = responseHeatMap?.data?.items[0]?.sectors;
    setListHeatMap(dataHeatMap);
  };

  const getGiaVang = async () => {
    const responseGiaVang = await axios.get(
      `${config.app.VITE_APP_API_URL}/giaVang`
    );
    const dataGiaVang = responseGiaVang?.data?.data;
    setListGiaVang(dataGiaVang);
  };

  const getLaiSuat = async () => {
    const responseLaiSuat = await axios.get(
      `${config.app.VITE_APP_API_URL}/lai_suat`
    );
    const dataLaiSuat = responseLaiSuat?.data?.data;
    setListLaiSuat(dataLaiSuat);
  };
  const getLaiSuatOnline = async () => {
    const responseLaiSuat = await axios.get(
      `${config.app.VITE_APP_API_URL}/lai_suat_online`
    );
    const dataLaiSuat = responseLaiSuat?.data?.data;
    setListLaiSuatOnline(dataLaiSuat);
  };

  const getGiaXangDau = async () => {
    const responseGiaXangDau = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_xang_dau`
    );
    const dataGiaXangDau = responseGiaXangDau?.data?.data;
    setListGiaXangDau(dataGiaXangDau);
  };
  const getGiaXangDauHistory = async () => {
    const responseGiaXangDau = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_xang_dau_history`
    );
    const dataGiaXangDau = responseGiaXangDau?.data?.data;
    setListGiaXangDauHistory(dataGiaXangDau);
  };

  const getTyGiaNgoaiTe = async () => {
    const responseTyGiaNgoaiTe = await axios.get(
      `${config.app.VITE_APP_API_URL}/ty_gia_ngoai_te`
    );
    const dataTyGiaNgoaiTe = responseTyGiaNgoaiTe?.data?.data;
    setTyGiaNgoaiTe(dataTyGiaNgoaiTe);
  };

  const getGiaHeo = async () => {
    const responseGiaHeo = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_heo`
    );
    const dataGiaHeo = responseGiaHeo?.data?.data;
    setListGiaHeo(dataGiaHeo);
  };

  const getGiaThep = async () => {
    const responseGiaThep = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_thep`
    );
    const dataGiaThep = responseGiaThep?.data?.data;
    setListGiaThep(dataGiaThep);
  };

  const getGiaGao = async () => {
    const responseGiaGao = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_gao`
    );
    const dataGiaGao = responseGiaGao?.data?.data;
    setListGiaGao(dataGiaGao);
  };

  const getGiaCaTra = async () => {
    const responseGiaCaTra = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_ca_tra`
    );
    const dataGiaCaTra = responseGiaCaTra?.data?.data;
    setListGiaCaTra(dataGiaCaTra);
  };

  const getgiaPhan = async () => {
    const responsegiaPhan = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_phan`
    );
    const datagiaPhan = responsegiaPhan?.data?.data;
    setlistGiaPhan(datagiaPhan);
  };

  const getGiaDien = async () => {
    const responseGiaDien = await axios.get(
      `${config.app.VITE_APP_API_URL}/gia_dien`
    );
    const dataGiaDien = responseGiaDien?.data?.data;
    setListGiaDien(dataGiaDien);
  };
  useEffect(() => {
    // getHeatMap();
    getIndustryChange();
    getGiaVang();
    getLaiSuat();
    getLaiSuatOnline();
    getGiaXangDau();
    // getGiaXangDauHistory();
    getTyGiaNgoaiTe();
    getGiaHeo();
    getGiaThep();
    getGiaGao();
    getGiaCaTra();
    getgiaPhan();
    getGiaDien();

    const ws = new WebSocket(
      'wss://streaming.forexpros.com/echo/416/os_yqv68/websocket'
    ); // replace widiv your server address
    ws.onopen = () => {
      const listCommodities = [...listNuocNgoai.map((item) => item.pid)];
      const message = listCommodities.map((item, index) => {
        if (index === listCommodities.length - 1)
          return `isOpenPair-${item}:%%pid-${item}:`;
        else return `isOpenPair-${item}:%%pid-${item}:%%`;
      });
      const messageStringify = message.join('');
      const dataStringify: string[] = [
        `{\"_event\":\"bulk-subscribe\",\"tzID\":110,\"message\":\"${message}\"}`,
      ];
      ws.send(dataStringify[0]);
    };
    ws.addEventListener('message', (event) => {
      if (event?.data === 'o') return;
      const parsedData = JSON.parse(event?.data.substring(1));
      const messageReceive = JSON.parse(parsedData[0]);
      const messageContent = messageReceive?.message.split('::');
      const id = messageContent[0];
      const content = messageContent[1];
      const contentParse = JSON.parse(content);

      setListNuocNgoai((prev) => {
        const item = prev.find((item) => {
          return item.pid === contentParse?.pid;
        });
        if (!!item) {
          item.value = contentParse?.last;
          item.change = contentParse?.pc;
          item.percent = contentParse?.pcp;
        }
        return [...prev];
      });
    });
  }, []);
  const timePeriods3 = {
    '18 tháng': 'value18Month',
    '24 tháng': 'value24Month',
    '36 tháng': 'value36Month',
  };
  const elementRef = useRef(null);
  // State to store the width
  const [width, setWidth] = useState(0);
  useEffect(() => {
    // Access the width of the element using the ref
    if (elementRef.current) {
      setWidth(elementRef.current.offsetWidth - 48);
    }
  }, []);
  const getNewDetail = () => {
    setIsLoading(false);
    axios
      .post(`${config.app.VITE_APP_API_URL}/news-detail`, {
        url: `https://${id}`,
      })
      .then((res) => {
        if (res.data?.data) {
          setIsLoading(true);
          let content = res.data.data.content;
          // content = content.replace(/<gure class="expNoEdit">/g, '');
          const sanitizedContent = DOMPurify.sanitize(content);
          setNewsDetail({
            ...res.data.data,
            content: sanitizedContent,
          });
        } else {
          console.error('Invalid response data:', res.data);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch news detail:', error);
      });
  };

  useEffect(() => {
    getNewDetail();
  }, [id]);
  const next = useNavigate();

  const nextLink = (item: any) => {
    next(
      `/detail-news/${encodeURIComponent(item?.url.replace('https://', ''))}`,
      { state: { item } }
    );
  };

  const [newsType, setNewsType] = useState<IFeaturedPost[]>([]);
  const [typeProps, setTypeProps] = useState([]);
  useEffect(() => {
    if (type === 'Chứng khoán') {
      setTypeProps('chung-khoan');
    } else if (type === 'Bất động sản') {
      setTypeProps('bat-dong-san');
    } else if (type === 'Tài chính') {
      setTypeProps('tai-chinh');
    } else if (type === 'Ngân hàng') {
      setTypeProps('ngan-hang');
    } else if (type === 'Kinh tế việt nam') {
      setTypeProps('kinh-te-viet-nam');
    } else if (type === 'Vĩ mô') {
      setTypeProps('vi-mo');
    } else if (type === 'Xã hội') {
      setTypeProps('xa-hoi');
    } else if (type === 'Doanh nhân') {
      setTypeProps('doanh-nhan');
    } else if (type === 'Khởi nghiệp') {
      setTypeProps('khoi-nghiep');
    } else if (type === 'Kinh tế quốc tế') {
      setTypeProps('kinh-te-quoc-te');
    }
  }, [type]);
  const listPostType = () => {
    getNewsType(type, 50).then((res) => {
      const filteredNews = res.data.data.filter((item) => item.image);
      setNewsType(filteredNews);
    });
  };
  useEffect(() => {
    listPostType();
  }, [id, type]);
  return (
    <StyledNewsDetail type_of={newsDetail?.follow} screen_mode={screenMode}>
      <HeaderNews typeProps={typeProps} />

      <Flex
        style={{
          // flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            maxWidth: '1093px',
            width: '100%',
            margin: '0 auto',
            flex: 1,
            gap: '16px',
            // background: "#F4F4F4",
          }}
        >
          <div className="news-content">
            {isLoading ? (
              <>
                <div className="first-content">
                  <div className="router">
                    Tin tức{' '}
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.910094 11.5886C0.584657 11.2632 0.584657 10.7355 0.910094 10.4101L5.32084 5.99935L0.910093 1.5886C0.584656 1.26317 0.584656 0.73553 0.910093 0.410094C1.23553 0.0846563 1.76317 0.0846562 2.0886 0.410094L7.0886 5.41009C7.41404 5.73553 7.41404 6.26317 7.0886 6.5886L2.08861 11.5886C1.76317 11.914 1.23553 11.914 0.910094 11.5886Z"
                        fill={screenMode === 'dark' ? '#E3E4E8' : '#565B67'}
                      />
                    </svg>{' '}
                    {type}{' '}
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.910094 11.5886C0.584657 11.2632 0.584657 10.7355 0.910094 10.4101L5.32084 5.99935L0.910093 1.5886C0.584656 1.26317 0.584656 0.73553 0.910093 0.410094C1.23553 0.0846563 1.76317 0.0846562 2.0886 0.410094L7.0886 5.41009C7.41404 5.73553 7.41404 6.26317 7.0886 6.5886L2.08861 11.5886C1.76317 11.914 1.23553 11.914 0.910094 11.5886Z"
                        fill={screenMode === 'dark' ? '#E3E4E8' : '#565B67'}
                      />
                    </svg>{' '}
                    <span>{newsDetail?.title}</span>
                  </div>
                  <h1 className="title">{newsDetail?.title}</h1>
                  <div className="time">{newsDetail?.date}</div>
                  <b className="intro">{newsDetail?.introduction}</b>
                </div>
                <blockquote
                  dangerouslySetInnerHTML={{
                    __html: newsDetail?.content?.replace(/\n/g, '<br/>'),
                  }}
                />
                <div className="source">
                  <Tooltip
                    color={'rgba(0,0,0,0.8)'}
                    title={
                      <div style={{ userSelect: 'text' }}>
                        Link bài viết gốc: <br />
                        {newsDetail?.sourceUrl}
                      </div>
                    }
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                  >
                    <a>{newsDetail?.follow}</a>
                  </Tooltip>
                </div>
                <div className="box-more">
                  <div className="header-more">
                    <div className="title-more">Tin tức khác</div>
                    <svg
                      width="1"
                      height="12"
                      viewBox="0 0 1 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="0.5"
                        y1="2.18557e-08"
                        x2="0.499999"
                        y2="12"
                        stroke={screenMode === 'dark' ? '#30323B' : '#D5D7DC'}
                      />
                    </svg>
                    <Link to={`/tab-news/${typeProps}`} className="more">
                      Xem thêm{'  '} {'  '}
                      <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.529247 9.47205C0.268897 9.21171 0.268897 8.7896 0.529247 8.52925L4.05784 5.00065L0.529247 1.47206C0.268897 1.21171 0.268897 0.789596 0.529246 0.529247C0.789596 0.268897 1.21171 0.268897 1.47206 0.529247L5.47206 4.52925C5.73241 4.7896 5.73241 5.21171 5.47206 5.47206L1.47206 9.47205C1.21171 9.7324 0.789596 9.7324 0.529247 9.47205Z"
                          fill={screenMode === 'dark' ? '#99BAFF' : '#004AEA'}
                        />
                      </svg>
                    </Link>
                  </div>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    {newsType
                      ?.filter((el) => el?.title !== newsDetail?.title)
                      ?.slice(0, 3)
                      .map((item) => (
                        <div className="item-three-header">
                          <div onClick={() => nextLink(item)}>
                            <img
                              src={item.image}
                              alt="image"
                              style={{
                                width: '100%',
                                height: '152.67px',
                                objectFit: 'cover',
                                borderRadius: '6px',
                                marginBottom: '16px',
                              }}
                            />
                          </div>
                          <div onClick={() => nextLink(item)}>
                            <Tooltip title={item.title}>
                              <a href={item.href} className="title">
                                {item.title.length > 45
                                  ? `${item.title.slice(0, 45)}...`
                                  : item.title}
                              </a>
                            </Tooltip>
                            <p>
                              {item.description.length > 50
                                ? `${item.description.slice(0, 50)}...`
                                : item.description}
                            </p>
                            <div className="time">{item?.date}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    {newsType
                      ?.filter((el) => el?.title !== newsDetail?.title)
                      ?.slice(4, 7)
                      .map((item) => (
                        <div className="item-three-header">
                          <div onClick={() => nextLink(item)}>
                            <img
                              src={item.image}
                              alt="image"
                              style={{
                                width: '100%',
                                height: '152.67px',
                                objectFit: 'cover',
                                borderRadius: '6px',
                                marginBottom: '16px',
                              }}
                            />
                          </div>
                          <div onClick={() => nextLink(item)}>
                            <Tooltip title={item.title}>
                              <a href={item.href} className="title">
                                {item.title.length > 45
                                  ? `${item.title.slice(0, 45)}...`
                                  : item.title}
                              </a>
                            </Tooltip>
                            <p>
                              {item.description.length > 50
                                ? `${item.description.slice(0, 50)}...`
                                : item.description}
                            </p>
                            <div className="time">{item?.date}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <Skeleton active />
            )}
          </div>
          <div className="mobile-right">
            <div className="hot-news">
              <div className="content">
                <h2 className="ds-section-headline">Tin tức đáng chú ý</h2>
                <div className="e14rcxam0">
                  {news
                    // .filter((el) => !el.description)
                    .slice(0, 10)
                    .map((item, index) => (
                      <div onClick={() => nextLink(item)}>
                        <div className="icon">
                          {' '}
                          <svg
                            width="16"
                            height="14"
                            viewBox="0 0 16 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.799805 1.00078C0.799805 0.752253 1.00128 0.550781 1.2498 0.550781H11.7498C11.9983 0.550781 12.1998 0.752253 12.1998 1.00078V3.55078H14.7498C14.9983 3.55078 15.1998 3.75225 15.1998 4.00078V11.5008C15.1998 12.018 14.9944 12.5139 14.6287 12.8796C14.263 13.2453 13.767 13.4508 13.2498 13.4508H2.7498C2.23263 13.4508 1.73664 13.2453 1.37095 12.8796C1.00525 12.5139 0.799805 12.018 0.799805 11.5008V1.00078ZM11.6066 12.5508H2.7498C2.47133 12.5508 2.20426 12.4402 2.00734 12.2432C1.81043 12.0463 1.6998 11.7793 1.6998 11.5008V1.45078H11.2998V11.5008C11.2998 11.8758 11.4078 12.2397 11.6066 12.5508ZM12.1998 4.45078V11.5008C12.1998 11.7793 12.3104 12.0463 12.5073 12.2432C12.7043 12.4402 12.9713 12.5508 13.2498 12.5508C13.5283 12.5508 13.7954 12.4402 13.9923 12.2432C14.1892 12.0463 14.2998 11.7793 14.2998 11.5008V4.45078H12.1998ZM3.7998 4.00078C3.7998 3.75225 4.00128 3.55078 4.2498 3.55078H8.7498C8.99833 3.55078 9.19981 3.75225 9.19981 4.00078C9.19981 4.24931 8.99833 4.45078 8.7498 4.45078H4.2498C4.00128 4.45078 3.7998 4.24931 3.7998 4.00078ZM5.2998 7.00078C5.2998 6.75225 5.50128 6.55078 5.7498 6.55078H8.7498C8.99833 6.55078 9.19981 6.75225 9.19981 7.00078C9.19981 7.24931 8.99833 7.45078 8.7498 7.45078H5.7498C5.50128 7.45078 5.2998 7.24931 5.2998 7.00078Z"
                              fill={
                                screenMode === 'dark' ? '#ABADBA' : '#565B67'
                              }
                            />
                          </svg>
                        </div>

                        <Tooltip title={item?.title}>
                          <a
                            className="title"
                            style={{
                              color: screenMode === 'dark' ? '#fff' : '#2E3138',
                            }}
                          >
                            {item?.title?.length > 105
                              ? `${item?.title?.slice(0, 105)}...`
                              : item?.title}
                          </a>
                        </Tooltip>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '24px',
                gap: '24px',
              }}
            >
              <div
                style={{
                  backgroundColor:
                    screenMode === 'dark' ? '#202127' : '#ECECEF',
                  padding: '4px 0px 24px 24px',
                  borderRadius: '6px',
                  width: '302px',
                  height: '520px',
                }}
              >
                <div
                  ref={scrollContainerRef}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <div className={'top-tab-active'}>Tiền tệ</div>
                </div>

                <div
                  style={{
                    height: '450.5px',
                    overflowY: 'scroll',
                    paddingRight: '24px',
                  }}
                >
                  {listNuocNgoai.map((item: any, index: any) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: '8px 0px',
                          justifyContent: 'space-between',
                          borderBottom:
                            screenMode === 'dark'
                              ? '1px solid #30323B'
                              : '1px solid #D5D7DC',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                          }}
                        >
                          <img
                            src={item?.flag}
                            style={{
                              width: '22px',
                              height: '12px',
                              borderRadius: '4px',
                              marginRight: '4px',
                            }}
                          />
                          <Tooltip
                            color={
                              screenMode === 'dark' ? '#25262D' : '#FFFFFF'
                            }
                            title={item.name}
                          >
                            <div
                              style={{
                                fontFamily: 'Roboto Flex',
                                fontWeight: '700',
                                fontSize: '12px',
                                color:
                                  screenMode === 'dark' ? '#FFFFFF' : '#2E3138',
                              }}
                            >
                              {item.name?.length > 7
                                ? `${item.name?.slice(0, 7)?.toLocaleUpperCase()}...`
                                : item.name?.toUpperCase()}
                            </div>
                          </Tooltip>
                        </div>

                        <div style={{ display: 'grid' }}>
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '13px',
                              lineHeight: '20px',

                              color:
                                screenMode === 'dark' ? '#FFFFFF' : '#2E3138',
                              textAlign: 'right',
                            }}
                          >
                            {item?.value}{' '}
                          </div>
                          <div
                            style={{
                              fontFamily: 'Roboto Flex',
                              fontWeight: '400',
                              fontSize: '13px',

                              lineHeight: '20px',

                              color:
                                +item?.change > 0
                                  ? screenMode === 'dark'
                                    ? '#5CD680'
                                    : '#45783A'
                                  : screenMode === 'dark'
                                    ? '#D15449'
                                    : '#A33929',
                            }}
                          >
                            {item?.change}({item?.percent})
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                style={{
                  backgroundColor:
                    screenMode === 'dark' ? '#202127' : '#ECECEF',
                  padding: '4px 0px 24px 24px',
                  borderRadius: '6px',
                  width: '302px',

                  height: '600px',
                }}
              >
                <div>
                  <div
                    ref={scrollContainerRef}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <div className={'top-tab-active'}>Giá vàng</div>
                  </div>

                  <div
                    className="scroll-none"
                    style={{
                      height: '525.5px',
                      overflowY: 'scroll',
                      paddingRight: '24px',
                    }}
                  >
                    {listGiaVang
                      ?.filter((item: any) => {
                        const timesArray = listGiaVang
                          ?.filter((itemHistory: any) => {
                            return item?.type_code === itemHistory?.type_code;
                          })
                          ?.slice(1, 5)
                          ?.map((itemHistory: any) => {
                            return moment
                              .unix(itemHistory?.update_time)
                              .format('HH:mm:ss');
                          });

                        return (
                          item?.yesterday_buy !== null &&
                          item?.type_code === 'XAUUSD'
                        );
                      })
                      .map((item: any, index: number) => {
                        const isUp =
                          +item?.buy >
                          +listGiaVang
                            ?.filter((itemHistory: any) => {
                              return item?.type_code === itemHistory?.type_code;
                            })
                            ?.slice(1, 5)[1]?.buy;
                        const isUpSell =
                          +item?.sell >
                          +listGiaVang
                            ?.filter((itemHistory: any) => {
                              return item?.type_code === itemHistory?.type_code;
                            })
                            ?.slice(1, 5)[1]?.sell;

                        // let listHistory = listGiaVang?.filter((b: any) => {
                        //   return item?.type_code === b?.type_code;
                        // });

                        return (
                          <Tooltip
                            placement=""
                            overlayStyle={{ maxWidth: '700px' }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div
                              key={index}
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '6px',
                                borderBottom:
                                  screenMode === 'dark'
                                    ? '1px solid #30323B'
                                    : '1px solid #D5D7DC',
                                padding: '12px 0',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Tooltip
                                title={LIST_MAP_GOLD_NAME[item?.type_code]}
                              >
                                <div
                                  style={{
                                    fontWeight: '500',
                                    fontSize: '13px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    display: 'flex',
                                    gap: '6px',
                                    marginRight: '0px',
                                  }}
                                >
                                  <img
                                    src={GOLD_ICON}
                                    style={{
                                      width: '16px',
                                      height: '16px',
                                      borderRadius: '4px',
                                      marginRight: '4px',
                                    }}
                                  />
                                  {LIST_MAP_GOLD_NAME[item?.type_code]?.length >
                                  6
                                    ? `${LIST_MAP_GOLD_NAME[item?.type_code]?.slice(0, 6)?.toLocaleUpperCase()}...`
                                    : LIST_MAP_GOLD_NAME[
                                        item?.type_code
                                      ]?.toUpperCase()}
                                </div>
                              </Tooltip>

                              <div
                                style={{
                                  fontWeight: 600,
                                  fontSize: '13px',
                                  // color:
                                  //   screenMode === 'dark'
                                  //     ? '#FFFFFF'
                                  //     : '#080808',
                                  color: isUp
                                    ? screenMode === 'dark'
                                      ? '#5CD680'
                                      : '#45783A'
                                    : screenMode === 'dark'
                                      ? '#D15449'
                                      : '#A33929',

                                  alignItems: 'center',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: '6px',
                                }}
                              >
                                <span
                                  style={{
                                    color:
                                      screenMode === 'dark'
                                        ? '#ABADBA'
                                        : '#747B8B',
                                  }}
                                >
                                  Giá mua:
                                </span>{' '}
                                {formatGoldPrice(item?.buy)}
                                {isUp ? (
                                  <svg
                                    width="8"
                                    height="9"
                                    viewBox="0 0 8 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3.99925 0.724609L0.861249 3.86261C0.799352 3.92451 0.750253 3.99799 0.716755 4.07886C0.683257 4.15973 0.666016 4.24641 0.666016 4.33394C0.666016 4.42148 0.683257 4.50815 0.716755 4.58903C0.750253 4.6699 0.799352 4.74338 0.861249 4.80528C0.923145 4.86717 0.996627 4.91627 1.0775 4.94977C1.15837 4.98327 1.24505 5.00051 1.33258 5.00051C1.42012 5.00051 1.50679 4.98327 1.58767 4.94977C1.66854 4.91627 1.74202 4.86717 1.80392 4.80528L3.33258 3.27661V8.33394C3.33258 8.51075 3.40282 8.68032 3.52784 8.80535C3.65287 8.93037 3.82244 9.00061 3.99925 9.00061C4.17606 9.00061 4.34563 8.93037 4.47065 8.80535C4.59568 8.68032 4.66592 8.51075 4.66592 8.33394V3.27661L6.19458 4.80528C6.25635 4.8674 6.32979 4.9167 6.41068 4.95034C6.49157 4.98398 6.57831 5.0013 6.66592 5.0013C6.75352 5.0013 6.84026 4.98398 6.92115 4.95034C7.00204 4.9167 7.07548 4.8674 7.13725 4.80528C7.26223 4.68026 7.33244 4.51072 7.33244 4.33394C7.33244 4.15717 7.26223 3.98763 7.13725 3.86261L3.99925 0.724609Z"
                                      fill={
                                        screenMode === 'dark'
                                          ? '#5CD680'
                                          : '#45783A'
                                      }
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    width="8"
                                    height="9"
                                    viewBox="0 0 8 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3.99921 9.00061L7.13721 5.86261C7.1991 5.80071 7.2482 5.72723 7.2817 5.64636C7.3152 5.56549 7.33244 5.47881 7.33244 5.39128C7.33244 5.30374 7.3152 5.21706 7.2817 5.13619C7.2482 5.05532 7.1991 4.98184 7.13721 4.91994C7.07531 4.85805 7.00183 4.80895 6.92096 4.77545C6.84009 4.74195 6.75341 4.72471 6.66587 4.72471C6.57834 4.72471 6.49166 4.74195 6.41079 4.77545C6.32992 4.80895 6.25644 4.85805 6.19454 4.91994L4.66587 6.44861L4.66587 1.39128C4.66587 1.21447 4.59563 1.0449 4.47061 0.919871C4.34559 0.794847 4.17602 0.724609 3.99921 0.724609C3.8224 0.724609 3.65283 0.794847 3.5278 0.919871C3.40278 1.0449 3.33254 1.21447 3.33254 1.39128L3.33254 6.44861L1.80387 4.91994C1.7421 4.85782 1.66866 4.80852 1.58777 4.77488C1.50689 4.74124 1.42015 4.72392 1.33254 4.72392C1.24493 4.72392 1.15819 4.74124 1.0773 4.77488C0.996416 4.80852 0.922975 4.85782 0.861206 4.91994C0.736225 5.04496 0.666016 5.2145 0.666016 5.39128C0.666016 5.56805 0.736225 5.73759 0.861206 5.86261L3.99921 9.00061Z"
                                      fill={
                                        screenMode === 'dark'
                                          ? '#D15449'
                                          : '#A33929'
                                      }
                                    />
                                  </svg>
                                )}
                              </div>

                              {item?.type_code !== 'XAUUSD' && (
                                <div
                                  style={{
                                    fontFamily: 'roboto',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                    width: '26.1%',
                                    marginRight: '8px',
                                    color: isUpSell
                                      ? screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A'
                                      : screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',
                                    alignItems: 'center',
                                  }}
                                >
                                  {formatGoldPrice(item?.sell)}
                                  {isUp ? (
                                    <UpOutlined
                                      style={{
                                        fontSize: '9px',
                                        marginLeft: '2px',
                                      }}
                                    />
                                  ) : (
                                    <DownOutlined
                                      style={{
                                        fontSize: '9px',
                                        marginLeft: '2px',
                                      }}
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          </Tooltip>
                        );
                      })}
                    {listGiaVang
                      ?.filter((item: any) => {
                        return (
                          item?.yesterday_buy !== null &&
                          item?.type_code !== 'XAUUSD' &&
                          item?.type_code !== 'USDX'
                        );
                      })
                      .map((item: any, index: number) => {
                        const isUp =
                          +item?.buy >
                          +listGiaVang
                            ?.filter((itemHistory: any) => {
                              return item?.type_code === itemHistory?.type_code;
                            })
                            ?.slice(1, 5)[1]?.buy;
                        const isUpSell =
                          +item?.sell >
                          +listGiaVang
                            ?.filter((itemHistory: any) => {
                              return item?.type_code === itemHistory?.type_code;
                            })
                            ?.slice(1, 5)[1]?.sell;

                        return (
                          <Tooltip
                            placement=""
                            overlayStyle={{ maxWidth: '700px' }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div
                              key={index}
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderBottom:
                                  screenMode === 'dark'
                                    ? '1px solid #30323B'
                                    : '1px solid #D5D7DC',
                                padding: '12px 0',
                              }}
                            >
                              <Tooltip
                                title={LIST_MAP_GOLD_NAME[item?.type_code]}
                              >
                                <div
                                  style={{
                                    fontWeight: '500',
                                    fontSize: '13px',
                                    color:
                                      screenMode === 'dark'
                                        ? '#FFFFFF'
                                        : '#2E3138',
                                    display: 'flex',
                                    gap: '6px',
                                    marginRight: '0px',
                                  }}
                                >
                                  <img
                                    src={GOLD_ICON}
                                    style={{
                                      width: '16px',
                                      height: '16px',
                                      borderRadius: '4px',
                                      marginRight: '4px',
                                    }}
                                  />
                                  {LIST_MAP_GOLD_NAME[item?.type_code]?.length >
                                  6
                                    ? `${LIST_MAP_GOLD_NAME[item?.type_code]?.slice(0, 6)?.toLocaleUpperCase()}...`
                                    : LIST_MAP_GOLD_NAME[
                                        item?.type_code
                                      ]?.toUpperCase()}
                                </div>
                              </Tooltip>

                              <div>
                                <div
                                  style={{
                                    fontWeight: 600,
                                    fontSize: '13px',
                                    // color:
                                    //   screenMode === 'dark'
                                    //     ? '#FFFFFF'
                                    //     : '#080808',
                                    color: isUp
                                      ? screenMode === 'dark'
                                        ? '#5CD680'
                                        : '#45783A'
                                      : screenMode === 'dark'
                                        ? '#D15449'
                                        : '#A33929',

                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '6px',
                                  }}
                                >
                                  <span
                                    style={{
                                      color:
                                        screenMode === 'dark'
                                          ? '#ABADBA'
                                          : '#747B8B',
                                    }}
                                  >
                                    Giá mua:
                                  </span>{' '}
                                  {formatGoldPrice(item?.buy)}
                                  {isUp ? (
                                    <svg
                                      width="8"
                                      height="9"
                                      viewBox="0 0 8 9"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3.99925 0.724609L0.861249 3.86261C0.799352 3.92451 0.750253 3.99799 0.716755 4.07886C0.683257 4.15973 0.666016 4.24641 0.666016 4.33394C0.666016 4.42148 0.683257 4.50815 0.716755 4.58903C0.750253 4.6699 0.799352 4.74338 0.861249 4.80528C0.923145 4.86717 0.996627 4.91627 1.0775 4.94977C1.15837 4.98327 1.24505 5.00051 1.33258 5.00051C1.42012 5.00051 1.50679 4.98327 1.58767 4.94977C1.66854 4.91627 1.74202 4.86717 1.80392 4.80528L3.33258 3.27661V8.33394C3.33258 8.51075 3.40282 8.68032 3.52784 8.80535C3.65287 8.93037 3.82244 9.00061 3.99925 9.00061C4.17606 9.00061 4.34563 8.93037 4.47065 8.80535C4.59568 8.68032 4.66592 8.51075 4.66592 8.33394V3.27661L6.19458 4.80528C6.25635 4.8674 6.32979 4.9167 6.41068 4.95034C6.49157 4.98398 6.57831 5.0013 6.66592 5.0013C6.75352 5.0013 6.84026 4.98398 6.92115 4.95034C7.00204 4.9167 7.07548 4.8674 7.13725 4.80528C7.26223 4.68026 7.33244 4.51072 7.33244 4.33394C7.33244 4.15717 7.26223 3.98763 7.13725 3.86261L3.99925 0.724609Z"
                                        fill={
                                          screenMode === 'dark'
                                            ? '#5CD680'
                                            : '#45783A'
                                        }
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      width="8"
                                      height="9"
                                      viewBox="0 0 8 9"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3.99921 9.00061L7.13721 5.86261C7.1991 5.80071 7.2482 5.72723 7.2817 5.64636C7.3152 5.56549 7.33244 5.47881 7.33244 5.39128C7.33244 5.30374 7.3152 5.21706 7.2817 5.13619C7.2482 5.05532 7.1991 4.98184 7.13721 4.91994C7.07531 4.85805 7.00183 4.80895 6.92096 4.77545C6.84009 4.74195 6.75341 4.72471 6.66587 4.72471C6.57834 4.72471 6.49166 4.74195 6.41079 4.77545C6.32992 4.80895 6.25644 4.85805 6.19454 4.91994L4.66587 6.44861L4.66587 1.39128C4.66587 1.21447 4.59563 1.0449 4.47061 0.919871C4.34559 0.794847 4.17602 0.724609 3.99921 0.724609C3.8224 0.724609 3.65283 0.794847 3.5278 0.919871C3.40278 1.0449 3.33254 1.21447 3.33254 1.39128L3.33254 6.44861L1.80387 4.91994C1.7421 4.85782 1.66866 4.80852 1.58777 4.77488C1.50689 4.74124 1.42015 4.72392 1.33254 4.72392C1.24493 4.72392 1.15819 4.74124 1.0773 4.77488C0.996416 4.80852 0.922975 4.85782 0.861206 4.91994C0.736225 5.04496 0.666016 5.2145 0.666016 5.39128C0.666016 5.56805 0.736225 5.73759 0.861206 5.86261L3.99921 9.00061Z"
                                        fill={
                                          screenMode === 'dark'
                                            ? '#D15449'
                                            : '#A33929'
                                        }
                                      />
                                    </svg>
                                  )}
                                </div>

                                {item?.type_code !== 'XAUUSD' && (
                                  <div
                                    style={{
                                      fontWeight: 600,
                                      fontSize: '13px',
                                      // color:
                                      //   screenMode === 'dark'
                                      //     ? '#FFFFFF'
                                      //     : '#080808',
                                      color: isUpSell
                                        ? screenMode === 'dark'
                                          ? '#5CD680'
                                          : '#45783A'
                                        : screenMode === 'dark'
                                          ? '#D15449'
                                          : '#A33929',

                                      alignItems: 'center',
                                      display: 'flex',
                                      flexDirection: 'row',
                                      gap: '6px',
                                    }}
                                  >
                                    <span
                                      style={{
                                        color:
                                          screenMode === 'dark'
                                            ? '#ABADBA'
                                            : '#747B8B',
                                        marginRight: '4px',
                                      }}
                                    >
                                      Giá bán:
                                    </span>{' '}
                                    {formatGoldPrice(item?.sell)}{' '}
                                    {isUpSell ? (
                                      <svg
                                        width="8"
                                        height="9"
                                        viewBox="0 0 8 9"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M3.99925 0.724609L0.861249 3.86261C0.799352 3.92451 0.750253 3.99799 0.716755 4.07886C0.683257 4.15973 0.666016 4.24641 0.666016 4.33394C0.666016 4.42148 0.683257 4.50815 0.716755 4.58903C0.750253 4.6699 0.799352 4.74338 0.861249 4.80528C0.923145 4.86717 0.996627 4.91627 1.0775 4.94977C1.15837 4.98327 1.24505 5.00051 1.33258 5.00051C1.42012 5.00051 1.50679 4.98327 1.58767 4.94977C1.66854 4.91627 1.74202 4.86717 1.80392 4.80528L3.33258 3.27661V8.33394C3.33258 8.51075 3.40282 8.68032 3.52784 8.80535C3.65287 8.93037 3.82244 9.00061 3.99925 9.00061C4.17606 9.00061 4.34563 8.93037 4.47065 8.80535C4.59568 8.68032 4.66592 8.51075 4.66592 8.33394V3.27661L6.19458 4.80528C6.25635 4.8674 6.32979 4.9167 6.41068 4.95034C6.49157 4.98398 6.57831 5.0013 6.66592 5.0013C6.75352 5.0013 6.84026 4.98398 6.92115 4.95034C7.00204 4.9167 7.07548 4.8674 7.13725 4.80528C7.26223 4.68026 7.33244 4.51072 7.33244 4.33394C7.33244 4.15717 7.26223 3.98763 7.13725 3.86261L3.99925 0.724609Z"
                                          fill={
                                            screenMode === 'dark'
                                              ? '#5CD680'
                                              : '#45783A'
                                          }
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        width="8"
                                        height="9"
                                        viewBox="0 0 8 9"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M3.99921 9.00061L7.13721 5.86261C7.1991 5.80071 7.2482 5.72723 7.2817 5.64636C7.3152 5.56549 7.33244 5.47881 7.33244 5.39128C7.33244 5.30374 7.3152 5.21706 7.2817 5.13619C7.2482 5.05532 7.1991 4.98184 7.13721 4.91994C7.07531 4.85805 7.00183 4.80895 6.92096 4.77545C6.84009 4.74195 6.75341 4.72471 6.66587 4.72471C6.57834 4.72471 6.49166 4.74195 6.41079 4.77545C6.32992 4.80895 6.25644 4.85805 6.19454 4.91994L4.66587 6.44861L4.66587 1.39128C4.66587 1.21447 4.59563 1.0449 4.47061 0.919871C4.34559 0.794847 4.17602 0.724609 3.99921 0.724609C3.8224 0.724609 3.65283 0.794847 3.5278 0.919871C3.40278 1.0449 3.33254 1.21447 3.33254 1.39128L3.33254 6.44861L1.80387 4.91994C1.7421 4.85782 1.66866 4.80852 1.58777 4.77488C1.50689 4.74124 1.42015 4.72392 1.33254 4.72392C1.24493 4.72392 1.15819 4.74124 1.0773 4.77488C0.996416 4.80852 0.922975 4.85782 0.861206 4.91994C0.736225 5.04496 0.666016 5.2145 0.666016 5.39128C0.666016 5.56805 0.736225 5.73759 0.861206 5.86261L3.99921 9.00061Z"
                                          fill={
                                            screenMode === 'dark'
                                              ? '#D15449'
                                              : '#A33929'
                                          }
                                        />
                                      </svg>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Tooltip>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Flex>
      <FooterNews />
    </StyledNewsDetail>
  );
};
