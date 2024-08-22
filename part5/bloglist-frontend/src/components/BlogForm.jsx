import { useState } from "react";

const BlogForm = ({ handleAddBlog }) => {
  const [newBlogTitle, setnewBlogTitle] = useState("");
  const [newBlogAuthor, setnewBlogAuthor] = useState("");
  const [newBlogUrl, setnewBlogUrl] = useState("");
  const newBlog = async (event) => {
    event.preventDefault();
    handleAddBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });
    setnewBlogTitle("");
    setnewBlogAuthor("");
    setnewBlogUrl("");
  };
  return (
    <div className="blogform">
      <h2>create new</h2>
      <form onSubmit={newBlog} id="form">
        <div>
          Title:
          <input
            type="text"
            value={newBlogTitle}
            onChange={({ target }) => setnewBlogTitle(target.value)}
            placeholder="title"
            id="title"
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlogAuthor}
            onChange={({ target }) => setnewBlogAuthor(target.value)}
            placeholder="author"
            id="author"
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={newBlogUrl}
            onChange={({ target }) => setnewBlogUrl(target.value)}
            placeholder="url"
            id="url"
          />
        </div>

        <button type="submit" id="submit">
          create
        </button>
      </form>
      <br />
    </div>
  );
};
export default BlogForm;
