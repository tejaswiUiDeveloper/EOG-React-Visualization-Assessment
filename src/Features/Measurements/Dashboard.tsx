import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { actions } from './reducer';
import Measurements from '../../components/MeasurementsGraph';
import SelectMetrics from '../../components/SelectMetrics';
import MetricCardList from '../../components/MetricCardList';
import { OptionTypeBase } from 'react-select';
import { IState } from '../../store';
import { Provider, createClient, useQuery } from 'urql';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query ($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
    }
  }
}
`;

const getMetricData = (state: IState) => {
  const { selectedMetrics } = state.measurements;
  return {
    selectedMetrics
  };  
};

export default () => {
  return (
    <Provider value={client}>
      <Dashboard />
    </Provider>
  );
};

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(2),
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedMetrics } = useSelector(getMetricData);

  const handleSelectionChange = (selections: OptionTypeBase[]) => {
    dispatch(actions.updateSelections(selections || []));
  }

  const [result] = useQuery({
    query,
    variables: {
      input: selectedMetrics.map(metric => ({ metricName: metric.value})),
    },
  });

  const { fetching, data } = result;

  return (
    <Grid container className={classes.control}>
      <Grid item xs={12} className={classes.control}>
        {fetching && (
          <LinearProgress />
        )}
      </Grid>
      <Grid item md={6} xs={12}>
        {data && (
          <MetricCardList metrics={data.getMultipleMeasurements}/>
        )}
      </Grid>
      <Grid item md={6} xs={12}>
        <SelectMetrics onChange={handleSelectionChange} />
      </Grid>
      <Grid item xs={12}>
        {data && (
          <Measurements measurements={data.getMultipleMeasurements}/>
        )}
      </Grid>
    </Grid>
  );
};
