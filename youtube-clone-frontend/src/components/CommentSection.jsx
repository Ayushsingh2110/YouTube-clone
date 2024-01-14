import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Avatar } from "@mui/material";
import { fetchFromserver } from "../utils/fetchFromAPI";
import { Comment } from "../components";

const CommentSection = ({videoId}) => {

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComment = async() => {
        const comments = await fetchFromserver(`comment/${videoId}`);
        setComments(comments);
    }
    fetchComment();
  }, [videoId]);

  return (
    <div className="CommentSection_container">
        <div className="comments_count">
            {comments.length} Comments
        </div>
      <div className="newComment">
        <Avatar src={currentUser?.profileImg} alt={currentUser?.name} className="new_comment_profileImg"/>
        <input type="text" placeholder="Add a comment..." className="comment_input"/>
      </div>
      {comments.map((comment) => {
        <Comment commentData={comment} profileImg={currentUser?.profileImg} name={currentUser?.name} />
      })}
    </div>
  );
};

export default CommentSection;
