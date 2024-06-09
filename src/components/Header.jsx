import "./Header.css"

export default function ({handleChangeTipo, users, handleChangeUser}) {
  	

	return (
		<header>
			<div>
				<img src="favicon.png"/>
				<h1>X Poster ENPA</h1>
			</div>
			<div className="acciones">
				<label>Usuario:
	              <select onChange={e => {
	              	handleChangeUser(e.target.selectedOptions[0].id)
	              }}>
	                <option id="-- Seleccionar --">-- Seleccionar --</option>         
	              	{
	              		users.map(u => {
	              			return <option key={u._id} id={u._id} >{u.name}</option>
	              		})
	              	}
	              </select>
	            </label>
	            <label>Tipo de publicación:
	              <select onChange={e => handleChangeTipo(e.target.value)}>
	                <option value="All">Cualquiera</option>         
	                <option value="New">Noticia</option>              
	                <option value="Quote">Frase</option>              
	                <option value="Event">Efeméride</option>              
	              </select>
	            </label>
	            <button>Actualizar Base de Datos</button>
	          </div>
		</header>
		)
}