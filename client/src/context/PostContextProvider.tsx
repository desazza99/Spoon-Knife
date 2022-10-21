import { FC, useEffect, useState } from "react";
import postContext from "./postContext";
import Post from "../typescript/interfaces/Post";

interface Props {
  children: React.ReactNode;
}

const PostsContextProvider: FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState([] as Post[]);
  const [notification, setNotification] = useState("waiting");

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification("");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  const updatePosts = (phrase: string): void => {
    fetch("http://localhost:3001/posts")
      .then((data) => {
        setNotification("loading");
        return data.json();
      })
      .then((posts) => {
        console.log(posts);
        setPosts(posts);
        setNotification(phrase);
      });
  };

  console.log("refreshed");

  return (
    <postContext.Provider value={{ posts, updatePosts, notification }}>
      {children}
    </postContext.Provider>
  );
};

export default PostsContextProvider;
