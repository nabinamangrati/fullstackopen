const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("assert");
const listHelper = require("../utils/list_helper");
const Blog = require("../models/blog");
const helpers = require("./test_helpers");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total  and favorite blog", () => {
  test("when list has only one blog, equals the likes of that", async () => {
    const blogs = await helpers.blogsInDb();
    const result = listHelper.totalLikes(helpers.blogs);
    assert.strictEqual(result, 41);
  });

  test("finds the blog with the most likes", () => {
    const result = listHelper.favoriteBlog(helpers.blogs);
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };

    assert.deepStrictEqual(
      { title: result.title, author: result.author, likes: result.likes },
      expected
    );
  });

  test("when list is empty, returns null", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });

  test("when list has one blog, returns that blog", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(listWithOneBlog);
    const expected = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    };

    assert.deepStrictEqual(
      { title: result.title, author: result.author, likes: result.likes },
      expected
    );
  });
  test("returns the author with the maximum number of blogs", () => {
    const result = listHelper.maxBlogsAuthor(helpers.blogs);
    assert.strictEqual(result, "Robert C. Martin");
  });
  test("returns the max like of the author", () => {
    const result = listHelper.mostLikes(helpers.blogs);
    assert.strictEqual(result, "Edsger W. Dijkstra");
  });
});
beforeEach(async () => {
  await Blog.deleteMany({});
  const blogPromises = helpers.blogs.map((blog) => {
    const blogObject = new Blog(blog);
    return blogObject.save();
  });
  await Promise.all(blogPromises);
});
const api = supertest(app);
test("blogs are returned as json", async () => {
  await api.get("/api/blogs").expect(200);
});
test("there is seven blog", async () => {
  const response = await helpers.blogsInDb();

  assert.strictEqual(response.length, helpers.blogs.length);
});

test("if like is missing default to 0 ", async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  };

  const response = await api.post("/api/blogs").send(newBlog);

  assert.strictEqual(response.body.likes, 0);
});
test("missing title or url then status to 400", async () => {
  const missed = {
    author: "Robert C. Martin",
    likes: 5,
  };
  const response = await api.post("/api/blogs").send(missed).expect(400);
});
test("deleting single blog test", async () => {
  const blogsAtStart = await helpers.blogsInDb();
  const blogToDelete = blogsAtStart[0];
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
});
test("updating the likes", async () => {
  const blogsAtStart = await helpers.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  await api.put(`/api/blogs/${blogToUpdate.id}`).expect(200);
});
test("fails with status code 401 if token is missing", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "https://testblog.com",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});
