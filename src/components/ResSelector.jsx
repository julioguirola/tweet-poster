import {Quote, New, Evento} from "./Resources.jsx"

export default function ({content, publicar, section, eliminar}) {
	return (
			<>
			{
				content.map(res => {
					return res.type == "Quote" ? <Quote id={res._id} key={res._id} text={res.text} img={res.url} handleClick={publicar} eliminar={eliminar}/>
					: res.type == "New" ? <New id={res._id} key={res._id} text={res.text} url={res.url} handleClick={publicar} eliminar={eliminar}/>
					:  <Evento id={res._id} text={res.text} key={res._id} handleClick={publicar} eliminar={eliminar}/> 
				}).filter((_,k) => k < section * 12 && k >= section * 12 - 12)
			}
			</>
		)
}
