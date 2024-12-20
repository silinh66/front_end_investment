/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import React, { FC, useEffect, useRef, useState } from 'react';
// import './ChartHomeScreen.css';
import { widget } from '@/charting_library';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { config } from '@/config/env';
import { StyledChartHome } from './styles';
import { screenModeSelector } from '@/redux/screen/selector';
import { set } from 'lodash';

function getLanguageFromURL() {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
declare global {
  interface Window {
    Datafeeds: any; // Use a more specific type if you know the exact structure of Datafeeds
  }
}

export const ChartHomeScreen: FC<any> = ({
  theme,
  onChangeSymbol,
  onChangeResolution,
  listTabs,
  curTab,
  onChangeTrendingLine,
  onChangePosition,
}: any) => {
  const screenMode = theme;
  // const screenMode = useSelector(screenModeSelector);

  const chartContainerHomeRef = useRef<any>();
  let [tvWidget, setTvWidget] = useState<any>(null);
  const [curSymbol, setCurSymbol] = useState({});
  const [trendingLine, setTrendingLine] = useState([]);
  const [prevPrice, setPrevPrice] = useState({ time_t: 0, price: 0 });
  const [curPrice, setCurPrice] = useState({ time_t: 0, price: 0 });

  const defaultProps = {
    // symbol: "AAPL",
    symbol: 'VNINDEX',
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
    studiesOverrides: {
      'paneProperties.vertGridProperties.color': '#D5D7DC',
      'paneProperties.horzGridProperties.color': '#D5D7DC',
    },
  };

  useEffect(() => {
    setCurSymbol(curTab);
    //set symbol

    tvWidget && tvWidget?.activeChart().setSymbol(curTab?.symbol);

    // //set resolution
    tvWidget && tvWidget?.activeChart().setResolution(curTab?.resolution);

    tvWidget &&
      tvWidget.save((obj: any) => {
        const listSource = obj?.charts[0]?.panes[0]?.sources;
        const trendingLine = listSource.filter((item: any) => {
          return item.type === 'LineToolTrendLine';
        });
        for (let i = 0; i < trendingLine.length; i++) {
          const element = trendingLine[i];
          //reset trending line
          tvWidget && tvWidget?.activeChart().removeEntity(element?.id);
        }
      });
    tvWidget &&
      tvWidget?.activeChart().applyOverrides({
        'paneProperties.vertGridProperties.color': '#D5D7DC',
        'paneProperties.horzGridProperties.color': '#D5D7DC',
      });
  }, [curTab]);

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

  useEffect(() => {
    //time at present
    const curTime = moment().format('HH:mm:ss');
    const curPriceMap = {
      time_t: Math.round(curPrice.time_t) * 1000,
      price: curPrice.price,
    };
    if (trendingLine.length > 0) {
      const trendingLineMap = trendingLine.map((item: any, index) => {
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

        return {
          ...line,
          position: position,
          curPrice: curPrice?.price,
          time: curTime,
        };
      });
      onChangePosition(trendingLineMap);
    }

    setPrevPrice(curPrice);
  }, [curPrice]);

  useEffect(() => {
    if (tvWidget !== null) {
      tvWidget && tvWidget?.changeTheme(screenMode);
      if (screenMode === 'light') {
        setTimeout(() => {
          // Apply overrides after theme change
          tvWidget?.activeChart().applyOverrides({
            'paneProperties.vertGridProperties.color': '#D5D7DC',
            'paneProperties.horzGridProperties.color': '#D5D7DC',
          });
        }, 100); // Adjust delay time (100ms) if necessary
      }

      // let curSymbol = tvWidget.activeChart().symbolExt();
      // let curResolution = tvWidget.activeChart().resolution();
      // let curSymbolInfo = {
      //   ...curSymbol,
      //   resolution: curResolution,
      // };
      // onChangeSymbol(curSymbolInfo);
    }
  }, [screenMode]);

  useEffect(() => {
    if (tvWidget !== null) {
      // tvWidget?.changeTheme(screenMode);
      // let curSymbol = tvWidget.activeChart().symbolExt();
      // let curResolution = tvWidget.activeChart().resolution();
      // let curSymbolInfo = {
      //   ...curSymbol,
      //   resolution: curResolution,
      // };
      // onChangeSymbol(curSymbolInfo);
    }
  }, [tvWidget]);

  useEffect(() => {
    const widgetOptions: any = {
      // debug: true,
      symbol: defaultProps.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
        defaultProps.datafeedUrl
      ),
      interval: defaultProps.interval,
      container: chartContainerHomeRef.current,
      library_path: defaultProps.libraryPath,

      locale: getLanguageFromURL() || 'vi',
      //   disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ['study_templates', ' chart_template_storage'],
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
      // width: '500px',
      // height: '300px',
      theme: screenMode,
      // overrides: {
      //   "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0)",
      // },
      timeframe: '1M',
      timezone: 'Asia/Ho_Chi_Minh',
      time_frames: [
        { text: '5y', resolution: '1W', description: '5 Years', title: '5y' },
        { text: '1y', resolution: '1W', description: '1 Year', title: '1y' },
        { text: '6m', resolution: '120', description: '6 Months', title: '6m' },
        { text: '3m', resolution: '60', description: '3 Months', title: '3m' },
        { text: '1m', resolution: '30', description: '1 Months', title: '1m' },
        { text: '5n', resolution: '5', description: '5 Days', title: '5n' },
        { text: '1n', resolution: '1', description: '1 Day', title: '1n' },
      ],
      symbol_search_request_delay: 300,
      // custom_css_url: "css/style.css",
      allow_symbol_change: true,
    };

    tvWidget = new widget(widgetOptions);
    setTvWidget(tvWidget);

    tvWidget.onChartReady(() => {
      // Load chart từ localStorage nếu có
      const savedChart = localStorage.getItem('myChartDataHome');
      if (savedChart) {
        const chartObj = JSON.parse(savedChart);
        tvWidget.load(chartObj);
      }

      tvWidget?.changeTheme(screenMode);
      if (screenMode === 'light') {
        setTimeout(() => {
          // Apply overrides after theme change
          tvWidget?.activeChart().applyOverrides({
            'paneProperties.vertGridProperties.color': '#D5D7DC',
            'paneProperties.horzGridProperties.color': '#D5D7DC',
          });
        }, 100); // Adjust delay time (100ms) if necessary
      }

      // tvWidget
      //   .activeChart()
      //   .onSymbolChanged()
      //   .subscribe(null, function (obj) {
      //     onChangeSymbol(obj);
      //   });
      // tvWidget
      //   .activeChart()
      //   .onIntervalChanged()
      //   .subscribe(null, function (obj) {
      //     onChangeResolution(obj);
      //   });
      // tvWidget.activeChart().clearMarks();
      // tvWidget.subscribe("study", (event) => {
      // });
      tvWidget.subscribe('undo_redo_state_changed', (id, params) => {
        tvWidget.save((obj: any) => {
          // obj là layout chart hiện tại
          const chartJson = JSON.stringify(obj);
          localStorage.setItem('myChartDataHome', chartJson);
        });
      });
      tvWidget.subscribe('drawing_event', (id, params) => {
        if (params === 'create' || params === 'remove') {
          // Gọi save để lấy ra layout hiện tại
          tvWidget.save((obj: any) => {
            // obj là layout chart hiện tại
            const chartJson = JSON.stringify(obj);
            localStorage.setItem('myChartDataHome', chartJson);
          });
        }
      });
      // tvWidget.subscribe("onTick", (event) => {
      //   setCurPrice({
      //     time_t: event?.time,
      //     price: event?.close,
      //   });
      // });

      // tvWidget.activeChart().applyOverrides({
      //   'paneProperties.background': theme === 'dark' ? 'pink' : 'pink',
      //   'paneProperties.backgroundType': 'solid',
      //   'paneProperties.vertGridProperties.color':
      //     theme === 'dark' ? '#252834' : '#F2F3F3',
      //   'paneProperties.horzGridProperties.color':
      //     theme === 'dark' ? '#252834' : '#F2F3F3',
      //   // "mainSeriesProperties.style": 2,
      // });
      // if (!!tvWidget) {
      //   tvWidget.changeTheme("dark");
      // }
      // tvWidget.headerReady().then(() => {
      //   const button = tvWidget.createButton();
      //   button.setAttribute("title", "Click to show a notification popup");
      //   button.classList.add("apply-common-tooltip");
      //   button.addEventListener("click", () =>
      //     tvWidget.showNoticeDialog({
      //       title: "Notification",
      //       body: "TradingView Charting Library API works correctly",
      //       callback: () => {
      //       },
      //     })
      //   );

      //   button.innerHTML = "Check API";
      // });
    });

    return () => {
      // tvWidget?.remove();
      setTvWidget(null);
    };
  }, []);

  return (
    <StyledChartHome
      style={{ width: '100%', height: '100%' }}
      screen_mode={screenMode}
    >
      <div
        ref={chartContainerHomeRef}
        className={'TVChartContainerHomeScreen'}
      />
    </StyledChartHome>
  );
};
