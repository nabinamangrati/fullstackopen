const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite;
  }, blogs[0]);
};
const maxBlogsAuthor = (blogs) => {
  const blogCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(blogCounts).reduce((a, b) => {
    return blogCounts[a] > blogCounts[b] ? a : b;
  });
};
const mostLikes = (blogs) => {
  const likesByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  return Object.keys(likesByAuthor).reduce((a, b) => {
    return likesByAuthor[a] > likesByAuthor[b] ? a : b;
  });
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  maxBlogsAuthor,
  mostLikes,
};
