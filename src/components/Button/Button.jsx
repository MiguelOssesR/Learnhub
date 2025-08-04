import './Button.css'

function Button({type, text, onClick}) {
  return (
    <button className={type} onClick={onClick}>{text}</button>
  )
}

export default Button