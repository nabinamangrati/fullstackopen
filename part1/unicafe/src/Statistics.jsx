import StatisticsLine from "./StatisticsLine";
const Statistics = ({ clicks, clicksTotal, average, percentage }) => {
  if (clicksTotal > 0) {
    return (
      <div>
        {/* after refactoring and using statline component */}
        <StatisticsLine text="good" value={clicks.good} />
        <StatisticsLine text="neutral" value={clicks.neutral} />
        <StatisticsLine text="bad" value={clicks.bad} />
        <StatisticsLine text="total clicks" value={clicksTotal} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="percentage" value={`${percentage} %`} />

        {/* before refactoring the statistics  */}
        {/* <div>good: {clicks.good}</div>
        <div>neutral: {clicks.neutral}</div>
        <div>bad :{clicks.bad}</div>
        <div>total clicks: {clicksTotal}</div>
        <div>average:{average}</div>
        <div>percentage: {percentage}%</div> */}
      </div>
    );
  }
  return <p>No feedback yet</p>;
};
export default Statistics;
