import { FC } from "react";
import Comment from "../typescript/interfaces/Comment";

interface Props {
  comment: Comment;
}

const CommentItem: FC<Props> = ({ comment }) => {
  return (
    <div>
      <h3>{comment.email}</h3>
      <h3>{comment.name}</h3>
      <h3>{comment.body}</h3>
    </div>
  );
};

export default CommentItem;
