import StatisticsLine from "./StatisticsLine";
const Statistics = ({ clicks, clicksTotal, average, percentage }) => {
  if (clicksTotal > 0) {
    return (
      <div>
        {/* for the exercise 1.11 we have to create a table for statistics */}
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{clicks.good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{clicks.neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{clicks.bad}</td>
            </tr>
            <tr>
              <td>total clicks</td>
              <td>{clicksTotal}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{average}</td>
            </tr>
            <tr>
              <td>percentage</td>
              <td>{`${percentage} %`}</td>
            </tr>
          </tbody>
        </table>

        {/* after refactoring and using statline component */}

        {/* <StatisticsLine text="good" value={clicks.good} />
        <StatisticsLine text="neutral" value={clicks.neutral} />
        <StatisticsLine text="bad" value={clicks.bad} />
        <StatisticsLine text="total clicks" value={clicksTotal} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="percentage" value={`${percentage} %`} /> */}

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
