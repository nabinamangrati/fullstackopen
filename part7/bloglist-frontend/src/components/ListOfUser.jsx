import React from "react";
import { Link } from "react-router-dom";
export const ListOfUser = ({ singleUser }) => {
  if (!singleUser) return null;
  console.log(singleUser.blog, "Single user data");
  return (
    <div>
      <h1>{singleUser.name}</h1>

      <h1>added blogs</h1>

      {singleUser.blog && (
        <ul>
          {singleUser.blog.map((blog) => (
            <li key={blog.id}>
              {/* {blog.title} */}
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
