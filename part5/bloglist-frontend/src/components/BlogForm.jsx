const blogForm = () => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          Title:
          <input
            type="text"
            value={newBlogTitle}
            onChange={({ target }) => setnewBlogTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlogAuthor}
            onChange={({ target }) => setnewBlogAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={newBlogUrl}
            onChange={({ target }) => setnewBlogUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
      <br />
    </div>
  );
};
export default blogForm;
