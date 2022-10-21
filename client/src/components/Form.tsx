import { useRef, useState, useContext } from "react";
import postContext from "../context/postContext";

const Form = () => {
  const form = useRef<HTMLFormElement>(null);
  const { updatePosts } = useContext(postContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.currentTarget.value);
  };

  const handleSUbmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("http://localhost:3001/posts", {
      method: "POST",
      body: JSON.stringify({
        id: 1,
        title: title,
        body: body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        form.current?.reset();
        console.log(json);
        updatePosts("post added");
      });
  };

  return (
    <form action="#" onSubmit={handleSUbmit} ref={form}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" onChange={onTitleChange} />
      <label htmlFor="body">body</label>
      <input type="text" id="body" name="body" onChange={onBodyChange} />
      <button>send</button>
    </form>
  );
};

export default Form;
