import "./Footer.css"

export default function Footer ({secs, handleSecs}) {
	const handleClick = (cond) => {
		if (cond) {
			handleSecs(secs + 1)
		} else {
			if (secs >= 2) {
				handleSecs(secs - 1)
			}
		}
	}

	return (
		<footer>
			<button onClick={() => {handleClick(false)}}>{"<"}</button>
			<button>{secs}</button>
			<button onClick={() => {handleClick(true)}}>{">"}</button>
		</footer>
	)
}