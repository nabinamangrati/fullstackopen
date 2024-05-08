import StatisticsLine from "./StatisticsLine";
const Statistics = ({ clicks, clicksTotal, average, percentage }) => {
  if (clicksTotal > 0) {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <StatisticsLine text="good" value={clicks.good} />
            </tr>
            <tr>
              <StatisticsLine text="neutral" value={clicks.neutral} />
            </tr>
            <tr>
              <StatisticsLine text="bad" value={clicks.bad} />
            </tr>
            <tr>
              <StatisticsLine text="total clicks" value={clicksTotal} />
            </tr>
            <tr>
              <StatisticsLine text="average" value={average} />
            </tr>
            <tr>
              <StatisticsLine text="percentage" value={`${percentage} %`} />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return <p>No feedback yet</p>;
};
export default Statistics;
