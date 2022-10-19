import React, { useContext, useEffect } from "react";
import "./App.css";
import Posts from "./components/Posts";
import Form from "./components/Form";
import postContext from "./context/postContext";

function App() {
  const { updatePosts, notification } = useContext(postContext);
  useEffect(() => {
    updatePosts("post fetched");
  }, []);

  return (
    <main className="App">
      <p>{notification}</p>
      <Form></Form>
      <Posts></Posts>
    </main>
  );
}

export default App;
