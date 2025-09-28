import "./CommentCard.css";

function CommentCard({ comment, imageUrl, fecha, onClick }) {
  return (
    <div className="CommentCard">
      <div className="cardCommentContent">
        <div className="cardCommentImage">
          <img src={imageUrl} alt="Avatar" />
        </div>
        <div className="cardCommentData">
          <div className="dateRepot">
            <p>{fecha}</p>
            <button onClick={onClick}>
              <i class="bx  bx-block"></i>
            </button>
          </div>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
