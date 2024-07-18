function parent(callingname) {
  let count = 0;
  return function child(childname) {
    count++;
    if (count % 2 === 0) {
      console.log(`this ${callingname} has been called ${count} times.`);
      console.log(`this ${childname} has been called ${count} times.`);
    }
  };
}
let child = parent("first");
let child2 = parent("second");
child("sabina");
child("nabina");
child2("hello");
child2("tej");
child("development");
child("frontend");
