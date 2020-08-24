import React from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';

const Measurements = ({ measurements }) => {
  
  if (measurements.length === 0) return <div>Select a metric to see the graph</div>
  
  const option = {
    title: {
      text: 'Measurements',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLabel: {
        showMinLabel: false,
        showMaxLabel: false,
        formatter: value => moment(value).format('hh:mm a'),
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      name: 'F',
      min: value => value.min - 20,
      max: value => value.max + 20,
      axisLabel: {
        showMinLabel: false,
        showMaxLabel: false,
      },
      splitLine: {
        show: false,
      },
    },
    series: measurements.map(metricObj => ({
      type: 'line',
      name: metricObj.metric,
      showSymbol: false,
      hoverAnimation: false,
      data: metricObj
        .measurements
        .slice(-3000)
        .map(item => ({
          name: new Date(item.at),
          value: [new Date(item.at), item.value],
        }))
    }))
  };

  return (
    <ReactEcharts
      notMerge
      lazyUpdate
      style={{ height: '75vh', width: '100%' }}
      option={option}
    />
  )
}

export default Measurements