const supertest = require("supertest");
const app = require("../app");
const assert = require("assert");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helpers");

const api = supertest(app);

// describe("when there is initially one user in db", () => {
//   beforeEach(async () => {
//     await User.deleteMany({});

//     const passwordHash = await bcrypt.hash("sekret", 10);
//     const user = new User({ username: "root", passwordHash });

//     await user.save();
//   });

describe("user ", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = { username: "root", name: "Admin", password: "sekret" };

    await api.post("/api/users").send(user);
  });

  test("post a new user successfully", async () => {
    const newUser = { username: "@raju", name: "Raju", password: "rajudai123" };

    const result = await api.post("/api/users").send(newUser);

    expect(result.status).toBe(201);

    const users = await User.find({});
    expect(users.length).toBe(2);
  });

  test("error if password and username are not 3 charcters long and username is not unique", async () => {
    const newUser = { username: "@raju", name: "Raju", password: "ra" };

    const result = await api.post("/api/users").send(newUser);

    expect(result.status).toBe(400);

    const users = await User.find({});
    expect(users.length).toBe(1);
  });
});
