const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  //header component

  const Header = ({ course }) => {
    return <h1>{course}</h1>;
  };

  //part, exercises
  const Part = ({ part, exercises }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };
  //content component
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
      </div>
    );
  };

  //total component
  const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p>Number of exercises {totalExercises}</p>;
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total parts={[part1, part2, part3]} />
    </div>
  );
};

export default App;
