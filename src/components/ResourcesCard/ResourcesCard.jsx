import "./ResourcesCard.css"

function ResourcesCard({ title, image }) {
  return (
    <>
        <div className="resourceCard">
            <h2>{title}</h2>
            <div className="imageContainer">
              <img src={image} alt={title} />
            </div>
        </div>
    </>
  )
}

export default ResourcesCard
