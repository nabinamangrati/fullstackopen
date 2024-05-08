const Statistics = (props) => {
  return (
    <div>
      <div>good: {clicks.good}</div>
      <div>neutral: {clicks.neutral}</div>
      <div>bad :{clicks.bad}</div>
      <div>total clicks: {clicksTotal}</div>
      <div>average:{average}</div>
      <div>percentage: {(clicks.good / clicksTotal) * 100}%</div>
    </div>
  );
};
export default Statistics;
