import React from "react";

import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "The Joel Test: 12 Steps to Better Code",
    author: "Joel Spolsky",
    url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/",
    likes: 112,
  };

  const { container } = render(<Blog blog={blog} />);
  const div = container.querySelector(".blog-div");

  expect(div).toHaveTextContent("The Joel Test: 12 Steps to Better Code");
  expect(div).toHaveTextContent("Joel Spolsky");
  expect(screen.queryByText("likes")).toBeNull();
  expect(screen.queryByText("url")).toBeNull();
});
