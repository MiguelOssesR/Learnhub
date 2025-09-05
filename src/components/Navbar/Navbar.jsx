import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='Navbar'>
      <div className='ContainerLogoCat'>
      <div className='Logo'>
        <img src='https://firebasestorage.googleapis.com/v0/b/learnhub-d02e6.firebasestorage.app/o/uts_logo.svg?alt=media&token=80c460ec-25d2-464c-a8c0-5dbf34b3e427' className='UTSlogo' />
        <p className='Learn'>Learn</p>
        <p className='Hub'>Hub</p>
      </div>

      <div className='Categorias'>
        <Link to={'/forum'}>Discuciones</Link>
        <Link to={'#'}>Recursos</Link>
      </div>
      </div>
      
      <div className='buscador'>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAjRJREFUSEudVu11gzAMPG1CJ2kySWGSkEmgk5BMUjqJ6vMXEnZe+8qPhGdsTroPJQJzCQCNH3kxLwjUL8XHeaPdb4+Ze4vRuRdYgKag7glfYy3mtHcAMAJ4B3CBYIfiAeAbghWKvWm2AWNx/WsORN3Ko+NFtZsdkM/Q2VzYPF7jO3YAmfItVHrJNN9z1aycHXGd3wWc61ejiFWn3tseRggWqOyAThA8qrpe9wGKLYIJWAQ79hJXg1R4GQD9yrtYFatrKjLVXATYFCBdE6B+fwdgBvSWBZws79ET1rKHQxcVjFDcA7DporjYiSwLoHTNFFpfG6s3IYmYF0Wkqmpx9owVmfRQwDcgatD11ylX3M9zezpn5DY5LEx/AUrR3ujxvmgWM9sxprC210nCof4WhGKgrtmav3QQX0pKF0DW6LrOZSiSWaA3TSlNIlve+6NnCQkfobIKdCr7j6aSN8qoKHxy5RoEfDgAzw4lSjZNwOTf0GoIPpmjtLzHikwWTolgoukeXieL2lEhkI7fmeQxu4h2fUYbpo1lXNQ5lSqXq0B3N+ozNQmgnelu2HXVhtxD8j+StaOtmf6DptamjQWHQBGpeM+B4gaO6GdIyJyFo605HNkZX+5BsrwvzPWnoPEsO9gEyoIiiAB7Ou00KHkznDXUWa+6h0MefATj4Euj5j8dNAk/FooBVpuh9hetFbz8vKeW6x+AfvKOWL3qoLGVRfT3zZ+BF8XVWd9M0M4Bk3xnjldy/QBNr/Mh6BdYOQAAAABJRU5ErkJggg=="/>
        <input type="text" placeholder=' Buscar' />

      </div>
    </div>
  )
}

export default Navbar