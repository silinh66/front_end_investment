/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { StyledChart } from './styles';
import { widget } from '@/charting_library';
import { useSelector } from 'react-redux';
import { screenModeSelector } from '@/redux/screen/selector';
import moment from 'moment/moment';
import { config } from '@/config/env';
import addNotification from 'react-push-notification';
import { useLocation } from 'react-router-dom';

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
}) => {
  const location = useLocation();
  const screenMode = useSelector(screenModeSelector);
  const chartContainerRef = useRef<any>(null);
  const [tvWidget, setTvWidget] = useState<any>(null);
  const [isChartReady, setIsChartReady] = useState(false);

  const [trendingLine, setTrendingLine] = useState<any>([]);
  const [prevTrendingLine, setPrevTrendingLine] = useState<any>([]);
  const [prevPrice, setPrevPrice] = useState<any>({ time_t: 0, price: 0 });
  const [curPrice, setCurPrice] = useState<any>({ time_t: 0, price: 0 });
  const [commonIndicator, setCommonIndicator] = useState([]);

  const code = useSelector((state) => state.search.code);

  const defaultProps = {
    symbol: 'SSI',
    interval: 'D',
    datafeedUrl: `${config.chart.VITE_REACT_CHART}`,
    libraryPath: '/charting_library/',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  // Khi curTab thay đổi, nếu chart đã sẵn sàng thì set symbol và resolution
  useEffect(() => {
    if (tvWidget && isChartReady && curTab) {
      const chart = tvWidget.activeChart();
      if (chart) {
        chart.setSymbol(curTab.symbol, () => {});
        chart.setResolution(curTab.resolution, () => {});
      }
    }
  }, [curTab, tvWidget, isChartReady]);

  useEffect(() => {
    // setCurSymbol(curTab);
    //set symbol

    tvWidget && tvWidget?.activeChart()?.setSymbol(curTab?.symbol);

    // //set resolution
    tvWidget && tvWidget?.activeChart()?.setResolution(curTab?.resolution);

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
  }, [curTab]);

  useEffect(() => {
    if (tvWidget && isChartReady) {
      tvWidget.changeTheme(screenMode);
      if (screenMode === 'light') {
        setTimeout(() => {
          const chart = tvWidget.activeChart();
          if (chart) {
            chart.applyOverrides({
              'paneProperties.vertGridProperties.color': '#D5D7DC',
              'paneProperties.horzGridProperties.color': '#D5D7DC',
            });
          }
        }, 100);
      }
    }
  }, [screenMode, tvWidget, isChartReady]);

  useEffect(() => {
    if (tvWidget && isChartReady) {
      tvWidget.changeTheme(theme);
    }
  }, [theme, tvWidget, isChartReady]);

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: defaultProps.symbol,
      debug: false,
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
        defaultProps.datafeedUrl
      ),
      interval: defaultProps.interval,
      container: chartContainerRef.current,
      library_path: defaultProps.libraryPath,
      // Không sử dụng save_load_adapter
      locale: getLanguageFromURL() || 'vi',
      // Bạn có thể bật/tắt tính năng khác tùy ý, ở đây tắt saveload_separate_drawings_storage vì ta tự lưu thủ công
      enabled_features: [
        'study_templates',
        'chart_template_storage',
        // 'saveload_separate_drawings_storage', // Không cần nếu ta tự lưu thủ công
      ],
      // Không cần auto_save_delay
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      studies_overrides: defaultProps.studiesOverrides,
      width: '500px',
      height: '300px',
      theme: theme,
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
      allow_symbol_change: true,
    };

    const chartWidget = new widget(widgetOptions);

    chartWidget.onChartReady(() => {
      setIsChartReady(true);
      setTvWidget(chartWidget);

      // Load chart từ localStorage nếu có
      const savedChart = localStorage.getItem('myChartData');
      if (savedChart) {
        const chartObj = JSON.parse(savedChart);
        chartWidget.load(chartObj);
      }

      chartWidget
        .activeChart()
        .onSymbolChanged()
        .subscribe(null, function (obj) {
          return onChangeSymbol(obj);
        });
      chartWidget
        .activeChart()
        .onIntervalChanged()
        .subscribe(null, function (obj) {
          onChangeResolution(obj);
        });
      chartWidget.activeChart().clearMarks();
      // chartWidget.subscribe('study', (event) => {});

      // Mỗi khi có thao tác vẽ, lưu chart thủ công
      chartWidget.subscribe('drawing_event', (id, params) => {
        if (params === 'create' || params === 'remove') {
          // Gọi save để lấy ra layout hiện tại
          chartWidget.save((obj: any) => {
            // obj là layout chart hiện tại
            const chartJson = JSON.stringify(obj);
            localStorage.setItem('myChartData', chartJson);
          });
        }
      });

      chartWidget.subscribe('undo_redo_state_changed', (id, params) => {
        chartWidget.save((obj: any) => {
          // obj là layout chart hiện tại
          const chartJson = JSON.stringify(obj);
          localStorage.setItem('myChartData', chartJson);
        });
      });

      chartWidget.subscribe('onTick', (event) => {
        setCurPrice({
          time_t: event?.time,
          price: event?.close,
        });
      });
    });

    return () => {
      // Cleanup nếu cần
    };
  }, []);

  return (
    <StyledChart
      style={{
        height: location.pathname === '/bieu-do' ? 'calc(100% - 40px)' : '100%',
      }}
      screen_mode={screenMode}
    >
      <div ref={chartContainerRef} className={'TVChartContainer'} />
    </StyledChart>
  );
};
