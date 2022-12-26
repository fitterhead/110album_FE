import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function PostList() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  return <div>PostList</div>;
}

export default PostList;
