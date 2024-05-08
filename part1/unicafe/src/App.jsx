import { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";

const App = () => {
  let initialState = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  let [clicks, setClicks] = useState(initialState);
  let [clicksTotal, setTotal] = useState(0);

  let increaseByOneGood = () => {
    let newGood = clicks.good + 1;
    setClicks({ good: newGood, neutral: clicks.neutral, bad: clicks.bad });
    setTotal(newGood + clicks.neutral + clicks.bad);
  };

  let increaseByOneNeutral = () => {
    let newNeutral = clicks.neutral + 1;
    setClicks({ good: clicks.good, neutral: newNeutral, bad: clicks.bad });
    setTotal(clicks.good + newNeutral + clicks.bad);
  };

  let increaseByOneBad = () => {
    let newBad = clicks.bad + 1;
    setClicks({ good: clicks.good, neutral: clicks.neutral, bad: newBad });
    setTotal(clicks.good + clicks.neutral + newBad);
  };
  let average =
    (clicks.good * 1 + clicks.neutral * 0 + clicks.bad * -1) / clicksTotal;
  let percentage = (clicks.good / clicksTotal) * 100;

  return (
    <div>
      <h2>give feedBack</h2>

      <Button text="good" onClick={() => increaseByOneGood("good")} />
      <Button text="neutral" onClick={() => increaseByOneNeutral("neutral")} />
      <Button text="bad" onClick={() => increaseByOneBad("bad")} />

      <h2>Statistics</h2>

      <div>
        <Statistics
          clicks={clicks}
          clicksTotal={clicksTotal}
          average={average}
          percentage={percentage}
        />
      </div>
    </div>
  );
};

export default App;
