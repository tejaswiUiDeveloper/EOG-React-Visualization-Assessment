import React from 'react';
import MetricCard from './MetricCard'
import GridList from '@material-ui/core/GridList';

const MetricCardList = ({ metrics }) => {
  return (
    <GridList>
      {metrics.map(metricObj => (
        <MetricCard
          key={metricObj.metric}
          title={metricObj.metric}
          measurements={metricObj.measurements}
        />
      ))}
    </GridList>
  )
}

export default MetricCardList;