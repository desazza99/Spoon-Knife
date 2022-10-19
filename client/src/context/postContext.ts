import Post from "../typescript/interfaces/Post";
import { createContext } from "react";

const postContext = createContext(
  {} as {
    posts: Post[];
    updatePosts: (phrase: string) => void;
    notification: string;
  }
);

export default postContext;
