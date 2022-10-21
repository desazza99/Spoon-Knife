const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PostModel = require("./models/Post");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://desafree:F5uq0CI7UCu7Fcc4@cluster0.bcs0k91.mongodb.net/xtreams?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/posts", async (req, res) => {
  const post = new PostModel({
    userId: req.body.userId,
    id: req.body.id,
    title: req.body.title,
    body: req.body.body,
  });

  try {
    await post.save();
    res.send({
      userId: req.body.userId,
      id: req.body.id,
      title: req.body.title,
      body: req.body.body,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/posts", async (req, res) => {
  PostModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  await PostModel.findByIdAndUpdate(
    id,
    { title: req.body.title, body: req.body.body },
    { new: true },
    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User : ", docs);
        res.send(docs);
      }
    }
  ).clone();
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  await PostModel.findByIdAndDelete(id).clone();
  res.send("removed");
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
