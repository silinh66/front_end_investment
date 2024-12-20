/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { widget } from '@/charting_library';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import moment from 'moment/moment';
import { config } from '@/config/env';
import addNotification from 'react-push-notification';
import { StyledChartFilter } from './styles';
function getLanguageFromURL() {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export const TVChartContainer: FC<any> = ({
  theme,
  onChangeSymbol,
  onChangeResolution,
  listTabs,
  curTab,
  onChangeTrendingLine,
  onChangePosition,
  activeTab,
  onChangeIndicator,
  trendingLineMessage,
  setCurTab,
}) => {
  const screenMode = useSelector(screenModeSelector);
  const chartContainerRef = useRef<any>();
  let [tvWidget, setTvWidget] = useState<any>(null);
  const [curSymbol, setCurSymbol] = useState<any>({});
  const [trendingLine, setTrendingLine] = useState<any>([]);
  const [prevTrendingLine, setPrevTrendingLine] = useState<any>([]);
  const [prevPrice, setPrevPrice] = useState<any>({ time_t: 0, price: 0 });
  const [curPrice, setCurPrice] = useState<any>({ time_t: 0, price: 0 });
  const [commonIndicator, setCommonIndicator] = useState([]);
  const code = useSelector((state) => state.search.code);
  const defaultProps = {
    // symbol: "AAPL",
    symbol: 'SSI',
    interval: 'D',
    datafeedUrl: `${config.chart.VITE_REACT_CHART}`,
    // datafeedUrl: "https://demo_feed.tradingview.com",
    libraryPath: '/charting_library/',
    // chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };
  const curTabRef = useRef(curTab);

  useEffect(() => {
    // setCurSymbol(curTab);
    //set symbol
    if (tvWidget) {
      tvWidget && tvWidget?.activeChart()?.setSymbol(curTab?.symbol);

      // //set resolution
      tvWidget && tvWidget?.activeChart()?.setResolution(curTab?.resolution);
      // Load chart từ localStorage nếu có
      let signalInfo = curTab?.SignalInfo;
      if (signalInfo) {
        const chartObj = JSON.parse(signalInfo);
        let chartObjParse = JSON.parse(chartObj);
        tvWidget.load(chartObjParse);
      } else {
        const savedChart = localStorage.getItem('myChartDataFilter');
        if (savedChart) {
          const chartObj = JSON.parse(savedChart);
          let symbol = chartObj?.charts[0]?.panes[0]?.sources[0]?.state?.symbol;

          onChangeSymbol({
            name: symbol,
            isPicked: true,
            isHover: false,
          });
          tvWidget.load(chartObj);
          setCurTab((prevCurTab: any) => {
            return {
              ...prevCurTab,
              SignalInfo: null,
              SignalID: null,
              forceChange: null,
            };
          });
        }
      }
      // tvWidget &&
      //   tvWidget?.save((obj: any) => {
      //     const listSource = obj?.charts[0]?.panes[0]?.sources;
      //     const trendingLine = listSource.filter((item: any) => {
      //       return item.type === 'LineToolTrendLine';
      //     });
      //     for (let i = 0; i < trendingLine.length; i++) {
      //       const element = trendingLine[i];
      //       //reset trending line
      //       tvWidget && tvWidget?.activeChart().removeEntity(element?.id);
      //     }
      //   });
    }
  }, [curTab?.SignalInfo, curTab?.symbol, curTab?.resolution]);

  useEffect(() => {
    // curTabRef.current = curTab;
    // console.log('curTabRef.current: ', curTabRef.current);
    // setCurTab((prevCurTab: any) => {
    //   return {
    //     ...prevCurTab,
    //     forceChange: curTab?.forceChang,
    //   };
    // });
    if (curTab?.forceChange) {
      // Load chart từ localStorage nếu có
      const savedChart = localStorage.getItem('myChartDataFilter');
      if (savedChart) {
        const chartObj = JSON.parse(savedChart);
        let symbol = chartObj?.charts[0]?.panes[0]?.sources[0]?.state?.symbol;

        // onChangeSymbol({
        //   name: symbol,
        //   isPicked: true,
        //   isHover: false,
        // });
        tvWidget.load(chartObj);
      }
    }
  }, [curTab?.forceChange]);

  function isAbove(C: any, B: any, A: any) {
    const a = (B.price - A.price) / (B.time_t - A.time_t);
    const b = A.price - a * A.time_t;

    // Thay giá trị C.time_t vào x để tính y
    const y = a * C.time_t + b;

    // So sánh giá trị C.price với y để đưa ra kết luận
    if (C.price >= y) {
      return 1;
    } else {
      return 0;
    }
  }

  function requestNotificationPermission() {
    return new Promise((resolve: any, reject: any) => {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  function showNotification(message: any) {
    if (Notification.permission === 'granted') {
      addNotification({
        title: 'Thông báo thay đổi giá',
        message: `${message}`,
        duration: 4000,
        native: true,
        icon: 'path_to_your_icon.png',
      });
      // navigator.serviceWorker.ready.then(function (registration) {
      //   registration.showNotification('Thông báo thay đổi giá', {
      //     body: `${message}`,
      //     icon: 'path_to_your_icon.png',
      //   });
      // });
    } else {
    }
  }

  useEffect(() => {
    //time at present
    const curTime = moment().format('HH:mm:ss');
    const curPriceMap = {
      time_t: Math.round(curPrice.time_t) * 1000,
      price: curPrice.price,
    };
    if (trendingLine.length > 0) {
      const trendingLineMap = trendingLine.map((item: any, index: any) => {
        const line = item?.points;
        const A = {
          ...line[0],
          time_t: line[0].time_t + line[0].offset * 86400,
        };
        const B = {
          ...line[1],
          time_t: line[1].time_t + line[1].offset * 86400,
        };
        const C = curPriceMap;

        const position = isAbove(C, B, A);

        const message = `Giá cổ phiếu ${curTab?.symbol} nằm ${
          position ? 'trên' : 'dưới'
        } đường ${trendingLineMessage[index]?.message ? trendingLineMessage[index]?.message : index + 1} với giá ${curPrice?.price} vào lúc ${curTime}`;
        const prevPosition = prevTrendingLine[index]?.position;
        const prevSymbol = prevTrendingLine[index]?.symbol;
        if (prevPosition !== position || prevSymbol !== curTab?.symbol) {
          if (Notification.permission === 'default') {
            requestNotificationPermission().then(() => {
              showNotification(message);
            });
          } else {
            showNotification(message);
          }
        }
        // if (Notification.permission === "default") {
        //   requestNotificationPermission().then(() => {
        //     showNotification(message);
        //   });
        // } else {
        //   showNotification(message);
        // }
        return {
          ...line,
          position: position,
          curPrice: curPrice?.price,
          time: curTime,
          symbol: curTab?.symbol,
          message: trendingLineMessage[index]?.message
            ? trendingLineMessage[index]?.message
            : index + 1,
        };
      });
      onChangePosition(trendingLineMap);
      setPrevTrendingLine(trendingLineMap);
    }

    setPrevPrice(curPrice);
  }, [curPrice]);

  useEffect(() => {
    if (tvWidget !== null) {
      tvWidget && tvWidget?.changeTheme(theme);
      // const curSymbol = tvWidget.activeChart().symbolExt();
      // let curResolution = tvWidget.activeChart().resolution();
      // let curSymbolInfo = {
      //   ...curSymbol,
      //   resolution: curResolution,
      // };
      // onChangeSymbol(curSymbolInfo);
    }
  }, [theme]);

  useEffect(() => {
    // let symbol = code ? code.toUpperCase() : ;
    const widgetOptions = {
      // debug: true,
      symbol: defaultProps.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
        defaultProps.datafeedUrl
      ),
      interval: defaultProps.interval,
      container: chartContainerRef.current,
      library_path: defaultProps.libraryPath,

      locale: getLanguageFromURL() || 'vi',
      //   disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ['study_templates'],
      charts_storage_url: defaultProps.chartsStorageUrl,
      charts_storage_api_version: defaultProps.chartsStorageApiVersion,
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      studies_overrides: defaultProps.studiesOverrides,
      // time_scale: {
      //   min_bar_spacing: 5,
      // },
      width: '500px',
      height: '300px',
      theme: theme,
      // overrides: {
      //   "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0)",
      // },
      timeframe: '1M',
      timezone: 'Asia/Ho_Chi_Minh',
      time_frames: [
        { text: '5y', resolution: '1W', description: '5 Years', title: '5y' },
        { text: '1y', resolution: '1W', description: '1 Year', title: '1y' },
        {
          text: '6m',
          resolution: '120',
          description: '6 Months',
          title: '6m',
        },
        {
          text: '3m',
          resolution: '60',
          description: '3 Months',
          title: '3m',
        },
        {
          text: '1m',
          resolution: '30',
          description: '1 Months',
          title: '1m',
        },
        { text: '5n', resolution: '5', description: '5 Days', title: '5n' },
        { text: '1n', resolution: '1', description: '1 Day', title: '1n' },
      ],
      symbol_search_request_delay: 300,
      // custom_css_url: "css/style.css",
      allow_symbol_change: true,
    };

    tvWidget = new widget(widgetOptions);
    setTvWidget(tvWidget);

    tvWidget?.onChartReady(() => {
      // Load chart từ localStorage nếu có
      const savedChart = localStorage.getItem('myChartDataFilter');
      if (savedChart) {
        const chartObj = JSON.parse(savedChart);
        let symbol = chartObj?.charts[0]?.panes[0]?.sources[0]?.state?.symbol;

        onChangeSymbol({
          name: symbol,
          isPicked: true,
          isHover: false,
        });
        tvWidget.load(chartObj);
      }
      tvWidget?.changeTheme(screenMode);
      tvWidget
        .activeChart()
        .onSymbolChanged()
        .subscribe(null, function (obj1) {
          tvWidget.save((obj: any) => {
            const latestCurTab = { symbol: obj1?.name };
            const listSource = obj?.charts[0]?.panes[0]?.sources;
            const trendingLine = listSource?.filter((item) => {
              return (
                (item.type === 'LineToolTrendLine' &&
                  //symbol = curTab?.symbol
                  item.state.symbol === latestCurTab?.symbol) ||
                item.state.symbol === `HOSE:${latestCurTab?.symbol}`
              );
            });
            // trendingLine = trendingLine?.map((item) => {
            //   return {
            //     ...item,
            //     message: 'Đường trendline',
            //   };
            // });
            const indicator1 = listSource.filter((item) => {
              return item.type === 'Study';
            });
            const listSourceIndicator = obj?.charts[0]?.panes[1]?.sources;
            const indicator2 =
              listSourceIndicator?.filter((item) => {
                return item.type === 'Study';
              }) || [];
            const listSourceIndicator2 = obj?.charts[0]?.panes[2]?.sources;
            const indicator3 =
              listSourceIndicator2?.filter((item) => {
                return item.type === 'Study';
              }) || [];

            const indicator = [...indicator1, ...indicator2, ...indicator3];

            setTrendingLine(trendingLine);
            setCommonIndicator(indicator);
            onChangeTrendingLine(trendingLine);
            onChangeIndicator(indicator);
          });
          return onChangeSymbol(obj1);
        });
      // tvWidget
      //   .activeChart()
      //   .onIntervalChanged()
      //   .subscribe(null, function (obj) {
      //     onChangeResolution(obj);
      //   });
      // tvWidget.activeChart().clearMarks();
      // tvWidget.subscribe('study', (event) => {});
      tvWidget.subscribe('undo_redo_state_changed', (id, params) => {
        tvWidget.save((obj: any) => {
          // obj là layout chart hiện tại
          const chartJson = JSON.stringify(obj);

          localStorage.setItem('myChartDataFilter', chartJson);
        });
        if (id?.originalUndoText !== 'change symbol') {
          tvWidget.save((obj) => {
            const listSource = obj?.charts[0]?.panes[0]?.sources;
            let curMainSeries = listSource?.find(
              (item) => item?.type === 'MainSeries'
            );
            let curSymbol = curMainSeries?.state?.symbol;
            let trendingLine = listSource.filter((item) => {
              return (
                (item.type === 'LineToolTrendLine' &&
                  //symbol = latestCurTab?.symbol
                  item.state.symbol === curSymbol) ||
                item.state.symbol === `HOSE:${curSymbol}`
              );
            });
            // const trendingLine = listSource?.filter((item) => {
            //   return (
            //     (item.type === 'LineToolTrendLine' &&
            //       //symbol = curTab?.symbol
            //       item.state.symbol === curTab?.symbol) ||
            //     item.state.symbol === `HOSE:${curTab?.symbol}`
            //   );
            // });
            // trendingLine = trendingLine?.map((item) => {
            //   return {
            //     ...item,
            //     message: 'Đường trendline',
            //   };
            // });
            const indicator1 = listSource.filter((item) => {
              return item.type === 'Study';
            });
            const listSourceIndicator = obj?.charts[0]?.panes[1]?.sources;
            const indicator2 =
              listSourceIndicator?.filter((item) => {
                return item.type === 'Study';
              }) || [];
            const listSourceIndicator2 = obj?.charts[0]?.panes[2]?.sources;
            const indicator3 =
              listSourceIndicator2?.filter((item) => {
                return item.type === 'Study';
              }) || [];

            const indicator = [...indicator1, ...indicator2, ...indicator3];

            setTrendingLine(trendingLine);
            setCommonIndicator(indicator);
            onChangeTrendingLine(trendingLine);
            onChangeIndicator(indicator);
          });
        }
      });
      tvWidget.subscribe('drawing_event', (id, params) => {
        if (params === 'create' || params === 'remove') {
          tvWidget.save((obj) => {
            // obj là layout chart hiện tại
            const chartJson = JSON.stringify(obj);
            localStorage.setItem('myChartDataFilter', chartJson);
            const listSource = obj?.charts[0]?.panes[0]?.sources;
            let curMainSeries = listSource?.find(
              (item) => item?.type === 'MainSeries'
            );
            let curSymbol = curMainSeries?.state?.symbol;
            let trendingLine = listSource.filter((item) => {
              return (
                (item.type === 'LineToolTrendLine' &&
                  //symbol = latestCurTab?.symbol
                  item.state.symbol === curSymbol) ||
                item.state.symbol === `HOSE:${curSymbol}`
              );
            });
            trendingLine = trendingLine?.map((item) => {
              return {
                ...item,
                // message: 'TrendLine',
              };
            });
            const indicator1 = listSource?.filter((item) => {
              return item.type === 'Study';
            });
            const listSourceIndicator = obj?.charts[0]?.panes[1]?.sources;
            const indicator2 =
              listSourceIndicator?.filter((item) => {
                return item.type === 'Study';
              }) || [];
            const listSourceIndicator2 =
              obj?.charts[0]?.panes[2]?.sources || [];
            const indicator3 =
              listSourceIndicator2?.filter((item) => {
                return item.type === 'Study';
              }) || [];

            const indicator = [...indicator1, ...indicator2, ...indicator3];

            onChangeTrendingLine(trendingLine);

            onChangeIndicator(indicator);
          });
        }
      });
      tvWidget.subscribe('onTick', (event) => {
        setCurPrice({
          time_t: event?.time,
          price: event?.close,
        });
      });

      // tvWidget.activeChart().applyOverrides({
      //   "paneProperties.background": theme === "dark" ? "#131722" : "#fff",
      //   "paneProperties.backgroundType": "solid",
      //   "paneProperties.vertGridProperties.color":
      //     theme === "dark" ? "#252834" : "#F2F3F3",
      //   "paneProperties.horzGridProperties.color":
      //     theme === "dark" ? "#252834" : "#F2F3F3",
      //   // "mainSeriesProperties.style": 2,
      // });
      // if (!!tvWidget) {
      //   tvWidget.changeTheme("dark");
      // }
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () =>
          tvWidget.showNoticeDialog({
            title: 'Notification',
            body: 'TradingView Charting Library API works correctly',
            callback: () => {},
          })
        );

        button.innerHTML = 'Check API';
      });
    });

    return () => {
      // tvWidget.remove();
    };
  }, []);

  return (
    <StyledChartFilter screen_mode={screenMode}>
      <div ref={chartContainerRef} className={'TVChartContainer'} />
    </StyledChartFilter>
  );
};
