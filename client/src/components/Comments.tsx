import { FC } from "react";
import Comment from "../typescript/interfaces/Comment";
import CommentItem from "./CommentItem";

interface Props {
  comments: Comment[];
}

const Comments: FC<Props> = ({ comments }) => {
  return (
    <div>
      {!!comments.length &&
        comments.map((comment) => {
          return <CommentItem key={comment.id} comment={comment}></CommentItem>;
        })}
    </div>
  );
};

export default Comments;
