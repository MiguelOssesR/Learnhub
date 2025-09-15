import "./ResourcesCard.css"

function ResourcesCard({ title, image }) {
  return (
    <>
        <div className="resourceCard">
            <h2>{title}</h2>
            <img src={image} alt={title} />
        </div>
    </>
  )
}

export default ResourcesCard
