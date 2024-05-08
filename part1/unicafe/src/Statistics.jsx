const Statistics = ({ clicks, clicksTotal, average, percentage }) => {
  return (
    <div>
      <div>good: {clicks.good}</div>
      <div>neutral: {clicks.neutral}</div>
      <div>bad :{clicks.bad}</div>
      <div>total clicks: {clicksTotal}</div>
      <div>average:{average}</div>
      <div>percentage: {percentage}%</div>
    </div>
  );
};
export default Statistics;
