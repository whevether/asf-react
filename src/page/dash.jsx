import React from 'react';
import { head } from 'utils/head';
import { Chart } from 'components/index';

// 科技风 Mock 图表配置（渐变面积 + 发光线条）
const getTechChartOptions = () => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const mockTraffic = [320, 480, 610, 520, 780, 920, 850, 1010, 1180, 1320, 1280, 1450];
  const mockActive = [180, 260, 380, 290, 420, 550, 480, 620, 710, 820, 780, 890];
  const mockConvert = [12, 18, 24, 19, 28, 35, 31, 42, 48, 55, 52, 58];
  const cyan = 'rgba(0, 229, 255, ';
  const purple = 'rgba(138, 43, 226, ';
  const blue = 'rgba(30, 144, 255, ';
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(8, 24, 48, 0.92)',
      borderColor: 'rgba(0, 229, 255, 0.4)',
      borderWidth: 1,
      textStyle: { color: '#b0e0ff', fontSize: 12 },
      axisPointer: { type: 'cross', lineStyle: { color: 'rgba(0, 229, 255, 0.5)' } },
    },
    legend: {
      data: ['访问量', '活跃用户', '转化率'],
      bottom: 0,
      textStyle: { color: 'rgba(0, 229, 255, 0.9)', fontSize: 12 },
      itemGap: 24,
      itemWidth: 14,
      itemHeight: 10,
    },
    grid: { left: 48, right: 32, top: 40, bottom: 48, containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: months,
      axisLine: { lineStyle: { color: 'rgba(0, 229, 255, 0.25)' } },
      axisLabel: { color: 'rgba(0, 229, 255, 0.75)', fontSize: 11 },
      splitLine: { show: false },
    },
    yAxis: [
      { type: 'value', name: '数量', nameTextStyle: { color: 'rgba(0, 229, 255, 0.7)' }, axisLine: { show: false }, axisLabel: { color: 'rgba(0, 229, 255, 0.7)' }, splitLine: { lineStyle: { color: 'rgba(0, 229, 255, 0.08)' } } },
      { type: 'value', name: '转化率(%)', nameTextStyle: { color: 'rgba(138, 43, 226, 0.8)' }, axisLine: { show: false }, axisLabel: { color: 'rgba(138, 43, 226, 0.8)' }, splitLine: { show: false } },
    ],
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: mockTraffic,
        lineStyle: { width: 2, color: cyan + '1)', shadowBlur: 12, shadowColor: cyan + '0.8)' },
        itemStyle: { color: cyan + '1)', borderWidth: 1, borderColor: '#00e5ff', shadowBlur: 8, shadowColor: cyan + '0.6)' },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: cyan + '0.35)' }, { offset: 1, color: cyan + '0)' }] } },
      },
      {
        name: '活跃用户',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: mockActive,
        lineStyle: { width: 2, color: blue + '1)', shadowBlur: 12, shadowColor: blue + '0.8)' },
        itemStyle: { color: blue + '1)', borderWidth: 1, borderColor: '#1e90ff', shadowBlur: 8, shadowColor: blue + '0.6)' },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: blue + '0.3)' }, { offset: 1, color: blue + '0)' }] } },
      },
      {
        name: '转化率',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: mockConvert,
        lineStyle: { width: 2, color: purple + '1)', shadowBlur: 12, shadowColor: purple + '0.8)' },
        itemStyle: { color: purple + '1)', borderWidth: 1, borderColor: '#8a2be2', shadowBlur: 8, shadowColor: purple + '0.6)' },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: purple + '0.35)' }, { offset: 1, color: purple + '0)' }] } },
      },
    ],
  };
};

const Dash = () => {
    return (
        <div className="dash">
            {head('控制台')}
            <div style={{ width: '100%', minHeight: '360px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Chart options={getTechChartOptions()} typeObj={{ type: 'line' }} />
            </div>
        </div>
    );
};
Dash.propTypes = {
};
export default Dash;