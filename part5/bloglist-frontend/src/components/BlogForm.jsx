const BlogForm = ({
  handleAddBlog,
  newBlogTitle,
  handlenewBlogTitle,
  newBlogAuthor,
  handlenewBlogAuthor,
  newBlogUrl,
  handlenewBlogUrl,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          Title:
          <input
            type="text"
            value={newBlogTitle}
            onChange={handlenewBlogTitle}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlogAuthor}
            onChange={handlenewBlogAuthor}
          />
        </div>
        <div>
          Url:
          <input type="text" value={newBlogUrl} onChange={handlenewBlogUrl} />
        </div>

        <button type="submit">create</button>
      </form>
      <br />
    </div>
  );
};
export default BlogForm;
