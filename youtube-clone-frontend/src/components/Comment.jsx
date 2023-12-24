import React from 'react'
import { Avatar } from "@mui/material";

const Comment = ({commentData, profileImg, name}) => {
    
  return (
    <div className="comment_container">
        <Avatar src={profileImg} alt={name} className="comment_profileImg"/>
        <div className='comment_details'>
            <span className="comment_user_name"></span><span className="comment_date">1 day ago</span>
            <span className="comment_desc"></span>
        </div>
    </div>
  )
}

export default Comment