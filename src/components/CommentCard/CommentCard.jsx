import "./CommentCard.css";

function CommentCard({ comment, imageUrl, fecha }) {
  return (
    <div className="CommentCard">
      <div className="cardCommentContent">
        <div className="cardCommentImage">
          <img src={imageUrl} alt="Avatar" />
        </div>
        <div className="cardCommentData">
          <p>{fecha}</p>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
