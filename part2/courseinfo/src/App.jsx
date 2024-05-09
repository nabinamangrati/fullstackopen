const App = () => {
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  //header component

  const Header = ({ course }) => {
    return <h2>{course.name}</h2>;
  };

  //part, exercises
  const Part = ({ part }) => {
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
    return <h3>Number of exercises {totalExercises}</h3>;
  };

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      <Header course={course[0]} />
      <Content parts={course[0].parts} />
      <Total parts={course[0].parts} />
      <Header course={course[1]} />
      <Content parts={course[1].parts} />
      <Total parts={course[1].parts} />
    </div>
  );
};

export default App;
