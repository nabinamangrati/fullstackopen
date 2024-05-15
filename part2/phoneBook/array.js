console.log("hello");
let array = [1, 2, "hello"];
console.log(array);
let newarr = array.map((x) => x + 1);
console.log(newarr);

let filter = array.filter((y) => y === 1);
console.log(filter);

let find = array.find((x) => x === "hellos");
console.log(find);
