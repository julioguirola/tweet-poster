import "./Resources.css"
import Dump from "./Dump"

export function Evento ({id, text, handleClick, eliminar}) {
	return (<article>
	    <div>
			<p>{text}</p>
		</div>
		<div className="buttons">
	    <button onClick={() => handleClick(id)}>Publicar</button>
	    <button onClick={() => eliminar(id)}><Dump /></button>
	    </div>
	</article>)
}

export function Quote ({id, img, text, handleClick, eliminar}) {
	return (<article>
	      <div>
			<img src={img}></img>
			<p>{text}</p>
			</div>
			<div className="buttons">
	      <button onClick={() => handleClick(id)}>Publicar</button>
	      <button onClick={() => eliminar(id)}><Dump /></button>
	      </div>
		</article>)
}

export function New ({id, url, text, handleClick, eliminar}) {
	return (<article>
	      <div>
			<p>{url.slice(0,40)}</p>
			<p>{text}</p>
			</div>
			<div className="buttons">
	      <button onClick={() => handleClick(id)}>Publicar</button>
	      <button onClick={() => eliminar(id)}><Dump /></button>
	      </div>
		</article>)
}
