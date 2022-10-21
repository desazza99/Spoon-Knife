import { Types } from "mongoose";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  _id: Types.ObjectId;
}

export default Post;
