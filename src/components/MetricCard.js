import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    margin: 4,
    width: 200,
    padding: 16,
  },
  cardTitle: {
    margin: '0 0 8px',
  },
  cardValue: {
    margin: 0,
  }
});

const MetricCard = ({ title, measurements }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <h4 className={classes.cardTitle}>{title}</h4>
      <h2 className={classes.cardValue}>{measurements[measurements.length - 1].value}</h2>
    </Card>
  )
}

export default MetricCard;
