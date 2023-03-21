import React, { useRef, useState } from "react";
import Rating from "./Rating";

const Comments = ({ commentPerson, commentMessage, rating, date }) => {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [backgroundDisColor, setBackgroundDisColor] = useState("white");

  return (
    <div className="comments">
      <div className="comment">
        <div className="commentName">
          <h3>{commentPerson}</h3>
        </div>
        <div className="commentRating">
          <Rating value={rating} />
          <i className="commentDate">( {date} )</i>
        </div>
        <div className="commentParagraph">
          <p>{commentMessage}</p>
        </div>
        <div className="likeOrDislike">
          <p style={{ background: backgroundColor }} className="bilike" >bilike</p>
          <p
            style={{ background: backgroundDisColor }}
            className="bidislike"
          >BiDislike</p>
        </div>
      </div>
      <br></br>
      <hr></hr>
      <br></br>
    </div>
  );
};

export default Comments;
