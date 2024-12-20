/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getGoodsIndices,
  getWorldIndices,
} from '@/services/servicesApi/serviceApi';
import { Flex, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { StyledWorldIndices } from './styled';
import { shallowEqual, useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
interface PrimitiveIndices {
  pid: string;
  last_dir: 'redBg' | 'greenBg' | '';
  last_numeric: number;
  last: string;
  bid: string;
  ask: string;
  high: string;
  low: string;
  pc: string;
  pcp: string;
  pc_col: 'redFont' | 'greenFont';
  time: string;
  timestamp: number;
}
interface Indices {
  name: string;
  value: string;
  high: string;
  low: string;
  change: string;
  percent: string;
  time: string;
  pid: string;
}
const WorldIndices = () => {
  const screenMode = useSelector(screenModeSelector, shallowEqual);

  const [curTabBottom, setCurTabBottom] = useState<any>('chiSoTheGioi');
  const [listHangHoa, setListHangHoa] = useState(
    [
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
        flag: 'data:image/jpeg;base64,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',
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
    ]
    //   [
    //   {
    //     name: "VÀNG",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8830",
    //   },
    //   {
    //     name: "BẠC",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8836",
    //   },
    //   {
    //     name: "ĐỒNG",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8831",
    //   },
    //   {
    //     name: "DẦU THÔ",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8849",
    //   },
    //   {
    //     name: "DẦU BRENT",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8833",
    //   },
    //   {
    //     name: "KHÍ TỰ NHIÊN",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8862",
    //   },
    //   {
    //     name: "CÀ PHÊ",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8911",
    //   },
    //   {
    //     name: "LÚA MÌ",
    //     value: "",
    //     unit: "",
    //     change: "",
    //     percent: "",
    //     pid: "8917",
    //   },
    // ]
  );
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
  useEffect(() => {
    const ws = new WebSocket(
      'wss://streaming.forexpros.com/echo/416/os_yqv68/websocket'
    );
    ws.addEventListener('message', () => {
      ws.send(
        `{"_event":"bulk-subscribe","tzID":110,"message":"isOpenPair-8830:%%pid-8830:%%,isOpenPair-68:%%pid-68:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-8849:%%pid-8849:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-956470:%%pid-956470:%%,isOpenPair-:%%pid-:%%,isOpenPair-959211:%%pid-959211:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-:%%pid-:%%,isOpenPair-1062759:%%pid-1062759:%%,isOpenPair-168:%%pid-168:%%,isOpenPair-169:%%pid-169:%%,isOpenPair-14958:%%pid-14958:%%,isOpenPair-166:%%pid-166:%%,isOpenPair-179:%%pid-179:%%,isOpenPair-178:%%pid-178:%%,isOpenPair-174:%%pid-174:%%,isOpenPair-176:%%pid-176:%%,isOpenPair-40820:%%pid-40820:%%,isOpenPair-171:%%pid-171:%%,isOpenPair-995072:%%pid-995072:%%,isOpenPair-41064:%%pid-41064:%%,isOpenPair-41063:%%pid-41063:%%,isOpenPair-41062:%%pid-41062:%%,isOpenPair-995068:%%pid-995068:%%,isOpenPair-951248:%%pid-951248:%%,isOpenPair-172:%%pid-172:%%,isOpenPair-175:%%pid-175:"}`
      );

      ws.addEventListener('message', (event) => {
        if (event?.data === 'o') return;
        const parsedData = JSON.parse(event?.data.substring(1));
        const messageReceive = JSON.parse(parsedData[0]);
        const messageContent = messageReceive?.message.split('::');
        // const id = messageContent[0];
        const content = messageContent[1];
        const contentParse: PrimitiveIndices = JSON.parse(content);

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
    });
  }, []);
  useEffect(() => {
    getWorldIndices().then((res) => {
      if (res && res.status === 200) {
        setDataWorldIndices(res.data.data);
      }
    });
  }, []);
  useEffect(() => {
    getGoodsIndices().then((res) => {
      if (res && res.status === 200) {
        setDataGoodsIndices(res.data.data);
      }
    });
  }, []);
  return (
    <StyledWorldIndices screen_mode={screenMode}>
      {/* <Flex vertical gap={20}>
        <div>
          <h5>Chỉ số</h5>
          <Table
            pagination={false}
            scroll={{ y: 136 }}
            dataSource={dataWorldIndices}
            columns={[
              {
                title: 'Tên TTCK',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Giá trị',
                dataIndex: 'value',
                key: 'value',
              },
              {
                title: 'Thay đổi',
                dataIndex: 'change',
                key: 'change',
                render: (text, record) => {
                  return (
                    <b
                      style={
                        Number(record.change) > 0
                          ? { color: '#42A732' }
                          : Number(record.change) < 0
                            ? { color: '#E43637' }
                            : { color: '#CCAA00' }
                      }
                    >
                      {record.change} / {record.percent}
                    </b>
                  );
                },
              },
            ]}
          />
        </div>
        <div>
          <h5>Hàng hóa</h5>
          <Table
            pagination={false}
            scroll={{ y: 136 }}
            dataSource={dataGoodsIndices}
            columns={[
              {
                title: 'Tên TTCK',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Giá trị',
                dataIndex: 'value',
                key: 'value',
              },
              {
                title: 'Thay đổi',
                dataIndex: 'change',
                key: 'change',
                render: (text, record) => {
                  return (
                    <b
                      style={
                        Number(record.change) > 0
                          ? { color: '#42A732' }
                          : Number(record.change) < 0
                            ? { color: '#E43637' }
                            : { color: '#CCAA00' }
                      }
                    >
                      {record.change} / {record.percent}
                    </b>
                  );
                },
              },
            ]}
          />
        </div>
      </Flex> */}
      <div
        style={{
          width: '100%',
          backgroundColor: screenMode === 'dark' ? '#1F232C' : '#FDFDFD',
          // padding: '6px',
          borderRadius: '24px',
          boxSizing: 'border-box',
          height: '275.5px',
          // marginTop: '16px',
        }}
      >
        <div
          style={
            {
              // backgroundColor: 'pink',
              // height: '45%',
              // padding: '8px',
            }
          }
        >
          {/* <div
                  style={{
                    fontFamily: 'roboto',
                    fontWeight: '700',
                    fontSize: '20px',
                    color: screenMode === 'dark' ? '#fff' : '#080808',
                  }}
                >
                  CHỈ SỐ THẾ GIỚI
                </div> */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'center',
                // width: '100%',
              }}
            >
              <div
                className={
                  curTabBottom === 'chiSoTheGioi'
                    ? 'bottom-tab-active'
                    : 'bottom-tab'
                }
                onClick={() => [setCurTabBottom('chiSoTheGioi')]}
                style={{
                  color:
                    curTabBottom === 'chiSoTheGioi'
                      ? '#fff'
                      : screenMode === 'dark'
                        ? '#fff'
                        : '#080808',
                  padding: '6px 12px',
                  // border: '1px solid #192228',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: curTabBottom === 'chiSoTheGioi' ? '500' : '400',
                  // backgroundColor:
                  //   curTabRight === 'bienDongNganh'
                  //     ? '#197FBF'
                  //     : screenMode === 'dark'
                  //       ? '#1F232C'
                  //       : '#FDFDFD',
                  marginRight: '8px',
                  cursor: 'pointer',
                }}
              >
                {'chỉ số'.toUpperCase()}
              </div>
              <div
                className={
                  curTabBottom === 'chiSoHangHoa'
                    ? 'bottom-tab-active'
                    : 'bottom-tab'
                }
                onClick={() => [setCurTabBottom('chiSoHangHoa')]}
                style={{
                  color:
                    curTabBottom === 'chiSoHangHoa'
                      ? '#fff'
                      : screenMode === 'dark'
                        ? '#fff'
                        : '#080808',
                  padding: '6px 12px',
                  // border: '1px solid #192228',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: curTabBottom === 'chiSoHangHoa' ? '500' : '400',
                  // backgroundColor:
                  //   curTabRight === 'dienBienDongTienNganh'
                  //     ? '#197FBF'
                  //     : screenMode === 'dark'
                  //       ? '#1F232C'
                  //       : '#FDFDFD',
                  marginRight: '8px',
                }}
              >
                {'hàng hoá'.toUpperCase()}
              </div>
              {/* <div
                className={
                  curTabBottom === 'tyGia' ? 'bottom-tab-active' : 'bottom-tab'
                }
                onClick={() => [setCurTabBottom('tyGia')]}
                style={{
                  color:
                    curTabBottom === 'tyGia'
                      ? '#fff'
                      : screenMode === 'dark'
                        ? '#fff'
                        : '#080808',
                  padding: '6px 12px',
                  // border: '1px solid #192228',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: curTabBottom === 'tyGia' ? '500' : '400',
                  // backgroundColor:
                  //   curTabRight === 'dienBienDongTienNganh'
                  //     ? '#197FBF'
                  //     : screenMode === 'dark'
                  //       ? '#1F232C'
                  //       : '#FDFDFD',
                  marginRight: '8px',
                }}
              >
                {'Tỷ giá'.toUpperCase()}
              </div> */}
            </div>
          </div>
          {curTabBottom === 'chiSoTheGioi' && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '8px',
                  borderRadius: '4px',
                  padding: ' 2.5px 0 ',
                  backgroundColor:
                    screenMode === 'dark' ? '#2A2E39' : '#F0F3FA',
                  //   justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontFamily: 'roboto',
                    fontWeight: '500',
                    fontSize: '14px',
                    color: screenMode === 'dark' ? '#C8C3BC' : '#66676B',
                    width: '124px',
                    // marginRight: '14px',
                  }}
                >
                  Tên
                </div>
                <div
                  style={{
                    fontFamily: 'roboto',
                    fontWeight: '500',
                    fontSize: '14px',
                    color: screenMode === 'dark' ? '#C8C3BC' : '#66676B',
                    width: '100px',
                  }}
                >
                  Giá trị
                </div>
                <div
                  style={{
                    fontFamily: 'roboto',
                    fontWeight: '500',
                    fontSize: '14px',
                    color: screenMode === 'dark' ? '#C8C3BC' : '#66676B',
                    width: '80px',
                  }}
                >
                  Thay đổi
                </div>
                <div
                  style={{
                    fontFamily: 'roboto',
                    fontWeight: '500',
                    fontSize: '14px',
                    color: screenMode === 'dark' ? '#C8C3BC' : '#66676B',
                    width: '90px',
                    textAlign: 'center',
                  }}
                >
                  %
                </div>
              </div>
              <div style={{ height: '193.5px', overflowY: 'scroll' }}>
                {listNuocNgoai.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        // marginTop: '8px',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderRadius: '4px',
                        backgroundColor:
                          index % 2 === 0
                            ? screenMode === 'dark'
                              ? '#1F232C'
                              : '#F0F3FA'
                            : screenMode === 'dark'
                              ? '#2A2E39'
                              : '#FDFDFD',
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
                      <Tooltip title={item.name}>
                        <div
                          style={{
                            fontFamily: 'roboto',
                            fontWeight: '700',
                            fontSize: '12px',
                            color: '#3594EF',
                            width: '30.3%',
                            marginRight: '0px',
                          }}
                        >
                          {item.name?.length > 7
                            ? `${item.name?.slice(0, 7)?.toLocaleUpperCase()}...`
                            : item.name?.toUpperCase()}
                        </div>
                      </Tooltip>
                      <div
                        style={{
                          fontFamily: 'roboto',
                          fontWeight: '400',
                          fontSize: '12px',
                          color: screenMode === 'dark' ? '#FFFFFF' : '#080808',
                          width: '30.3%',
                        }}
                      >
                        {item?.value}{' '}
                        {/* <span style={{ fontWeight: "500", color: "#3594EF" }}>
                        {item?.unit}
                      </span> */}
                      </div>
                      <div
                        style={{
                          fontFamily: 'roboto',
                          fontWeight: '400',
                          fontSize: '12px',
                          width: '25.3%',
                          color: +item?.change > 0 ? '#42A732' : '#E43637',
                        }}
                      >
                        {item?.change}
                      </div>
                      <div
                        style={{
                          fontFamily: 'roboto',
                          fontWeight: '400',
                          fontSize: '12px',
                          width: '15.1%',
                          marginRight: '8px',
                          color: +item?.change > 0 ? '#42A732' : '#E43637',
                        }}
                      >
                        {item?.percent}
                      </div>
                      <svg
                        style={{ marginRight: '4px' }}
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="16"
                        height="16"
                        viewBox="0 0 48 48"
                        fill={+item?.change > 0 ? '#42A732' : '#E43637'}
                      >
                        <path d="M24,4C12.972,4,4,12.972,4,24s8.972,20,20,20s20-8.972,20-20S35.028,4,24,4z M28.561,30.561	C28.268,30.854,27.884,31,27.5,31s-0.768-0.146-1.061-0.439l-5-5C21.158,25.279,21,24.898,21,24.5v-11c0-0.829,0.671-1.5,1.5-1.5	s1.5,0.671,1.5,1.5v10.379l4.561,4.561C29.146,29.025,29.146,29.975,28.561,30.561z"></path>
                      </svg>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {curTabBottom === 'chiSoHangHoa' && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '8px',
                  // marginBottom: '4px',
                  borderRadius: '4px',
                  padding: ' 2.5px 0 ',
                  backgroundColor:
                    screenMode === 'dark' ? '#2A2E39' : '#F0F3FA',
                  //   justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontFamily: 'roboto',
                    fontWeight: '500',
                    fontSize: '14px',
                    color: screenMode === 'dark' ? '#C8C3BC' : '#66676B',
                    width: '138px',
                  }}
                >
                  Tên
                </div>
                <div
                  style={{
                    fontFamily: 'roboto',
                    fontWeight: '500',
                    fontSize: '14px',
                    color: screenMode === 'dark' ? '#C8C3BC' : '#66676B',

                    width: '114px',
                  }}
                >
                  Giá trị
                </div>
                <div
                  style={{
                    fontFamily: 'roboto',
                    fontWeight: '500',
                    fontSize: '14px',
                    color: screenMode === 'dark' ? '#C8C3BC' : '#66676B',
                    width: '100px',
                  }}
                >
                  Thay đổi
                </div>
                <div
                  style={{
                    fontFamily: 'roboto',
                    fontWeight: '500',
                    fontSize: '14px',
                    color: screenMode === 'dark' ? '#C8C3BC' : '#66676B',
                    width: '90px',
                    textAlign: 'center',
                  }}
                >
                  %
                </div>
              </div>
              <div style={{ height: '193.5px', overflowY: 'scroll' }}>
                {listHangHoa.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: '8px 0',
                        borderRadius: '4px',
                        // marginTop: '8px',
                        backgroundColor:
                          index % 2 === 0
                            ? screenMode === 'dark'
                              ? '#1F232C'
                              : '#F0F3FA'
                            : screenMode === 'dark'
                              ? '#2A2E39'
                              : '#FDFDFD',
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
                      <Tooltip title={item.name}>
                        <div
                          style={{
                            fontFamily: 'roboto',
                            fontWeight: '700',
                            fontSize: '12px',
                            color: '#3594EF',
                            width: '30.3%',
                            marginRight: '0px',
                          }}
                        >
                          {item.name?.length > 7
                            ? `${item.name?.slice(0, 7)?.toLocaleUpperCase()}...`
                            : item.name?.toUpperCase()}
                        </div>
                      </Tooltip>
                      <div
                        style={{
                          fontFamily: 'roboto',
                          fontWeight: '400',
                          fontSize: '12px',
                          color: screenMode === 'dark' ? '#FFFFFF' : '#080808',
                          width: '30.3%',
                        }}
                      >
                        {item?.value}{' '}
                        {/* <span style={{ fontWeight: "500", color: "#3594EF" }}>
                      {item?.unit}
                    </span> */}
                      </div>
                      <div
                        style={{
                          fontFamily: 'roboto',
                          fontWeight: '400',
                          fontSize: '12px',
                          width: '25.3%',
                          color: +item?.change > 0 ? '#42A732' : '#E43637',
                        }}
                      >
                        {item?.change}
                      </div>
                      <div
                        style={{
                          fontFamily: 'roboto',
                          fontWeight: '400',
                          fontSize: '12px',
                          width: '15.1%',
                          marginRight: '8px',
                          color: +item?.change > 0 ? '#42A732' : '#E43637',
                        }}
                      >
                        {item?.percent}
                      </div>
                      <svg
                        style={{ marginRight: '4px' }}
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="16"
                        height="16"
                        viewBox="0 0 48 48"
                        fill={+item?.change > 0 ? '#42A732' : '#E43637'}
                      >
                        <path d="M24,4C12.972,4,4,12.972,4,24s8.972,20,20,20s20-8.972,20-20S35.028,4,24,4z M28.561,30.561	C28.268,30.854,27.884,31,27.5,31s-0.768-0.146-1.061-0.439l-5-5C21.158,25.279,21,24.898,21,24.5v-11c0-0.829,0.671-1.5,1.5-1.5	s1.5,0.671,1.5,1.5v10.379l4.561,4.561C29.146,29.025,29.146,29.975,28.561,30.561z"></path>
                      </svg>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </StyledWorldIndices>
  );
};

export default WorldIndices;
