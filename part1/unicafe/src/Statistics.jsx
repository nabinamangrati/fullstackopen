const Statistics = ({ clicks, clicksTotal, average, percentage }) => {
  if (clicksTotal > 0) {
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
  }
  return <p>No feedback yet</p>;
};
export default Statistics;
