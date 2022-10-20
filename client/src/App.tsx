import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Posts from "./components/Posts";
import Form from "./components/Form";
import postContext from "./context/postContext";
// firebase
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

function App() {
  const { updatePosts, notification } = useContext(postContext);
  useEffect(() => {
    updatePosts("post fetched");
  }, []);

  // ---------------------firebase code
  const [posts, setPosts] = useState<{ id: string }[]>([]);
  // reference of the collection
  const postsCollectionReference = collection(db, "posts");
  useEffect(() => {
    const getUsers = async () => {
      // get all documents from the collection
      const data = await getDocs(postsCollectionReference);
      setPosts(
        // define format of posts
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    };

    getUsers();
  }, []);

  const [posts2, setPosts2] = useState<{ id: string }[]>([]);
  useEffect(() => {
    // will be invoked at every change on the database -> use it to don't refetch for every operation
    // return it to unsubscribe when the element unmount
    return onSnapshot(postsCollectionReference, (snapshot) => {
      setPosts2(
        snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );

      return;
    });
  }, []);

  // create post functionality
  const createPost = async () => {
    // add document
    await addDoc(postsCollectionReference, {
      userId: 1,
      postId: 3,
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    });
  };

  // create update functionality
  const updatePost = async (id = "HZ26Cqcs0f2uaA1gotm0") => {
    // we need the id of the document to update it
    const newField = { body: "ciao" };
    // we need to get the doc reference
    const postDocReference = doc(db, "posts", id);
    await updateDoc(postDocReference, newField);
  };

  // create delete functionality
  const deletePost = async (id = "HZ26Cqcs0f2uaA1gotm0") => {
    const postDocReference = doc(db, "posts", id);
    await deleteDoc(postDocReference);
  };

  console.log(posts);

  // -------------------finish firebase
  return (
    <main className="App">
      <button onClick={createPost}>Create</button>
      <button
        onClick={() => {
          updatePost("HZ26Cqcs0f2uaA1gotm0");
        }}
      >
        Update
      </button>
      <button
        onClick={() => {
          deletePost("HZ26Cqcs0f2uaA1gotm0");
        }}
      >
        delete
      </button>
      <p>{notification}</p>
      <Form></Form>
      <Posts></Posts>
    </main>
  );
}

export default App;
