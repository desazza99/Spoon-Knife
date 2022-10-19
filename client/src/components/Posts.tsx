import { useContext, useState } from "react";
import PostItem from "./PostItem";
import Loading from "./UI/Loading";
import Pagination from "./Pagination";
import postContext from "../context/postContext";

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const { posts, notification } = useContext(postContext);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      {notification === "loading" && <Loading />}
      {notification !== "loading" &&
        currentPosts.map((post) => {
          return <PostItem key={post.id} post={post}></PostItem>;
        })}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Posts;
