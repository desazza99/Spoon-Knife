import { FC, useContext, useState } from "react";
import Post from "../typescript/interfaces/Post";
import Comment from "../typescript/interfaces/Comment";
import Comments from "./Comments";
import postContext from "../context/postContext";

interface Props {
  post: Post;
}

const PostItem: FC<Props> = ({ post }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const { updatePosts } = useContext(postContext);

  const handleClick = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setComments(json);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      body: JSON.stringify({
        ...post,
        title: newTitle,
        body: newBody,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setNewBody("");
        setNewTitle("");
        updatePosts("post updated");
      });
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const handleChangeBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBody(e.currentTarget.value);
  };

  const handleDeletion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updatePosts("post removed");
      });
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={handleDeletion}>delete</button>
      <form action="#" onSubmit={handleSubmit}>
        <input type="text" value={newTitle} onChange={handleChangeTitle} />
        <input type="text" value={newBody} onChange={handleChangeBody} />
        <button>submit</button>
      </form>
      <button onClick={handleClick}>comment</button>
      {/* aggiungi funzionalita' commenti a tendina */}
      <Comments comments={comments} />
    </div>
  );
};

export default PostItem;
