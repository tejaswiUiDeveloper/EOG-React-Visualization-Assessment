import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import ReactSelect from 'react-select';
import { actions } from '../Features/Measurements/reducer';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const getMetricsOptions = (state) => {
  const { metrics } = state.measurements;
  return {
    metrics
  };
};

export default (props) => {
  return (
    <Provider value={client}>
      <SelectMetrics {...props}/>
    </Provider>
  );  
};

const SelectMetrics = ({ onChange }) => {
  const dispatch = useDispatch();
  const { metrics } = useSelector(getMetricsOptions);

  const [result] = useQuery({
    query: `
      query {
        getMetrics
      }
    `,
  });

  const { fetching, data } = result;
  useEffect(() => {
    if (!data) return;
    const options = data.getMetrics.map((metric) => ({
      label: metric,
      value: metric,
    }));
    dispatch(actions.updateMetrics(options));
  }, [dispatch, data]);

  if (fetching) return <div />;

  return <ReactSelect
    isMulti
    name="colors"
    onChange={onChange}
    options={metrics}
    className="basic-multi-select"
    classNamePrefix="select"
  />
}