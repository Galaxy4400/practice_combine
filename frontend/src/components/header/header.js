import { Link } from "react-router-dom";
import { ControlPanel } from "./components";

export const Header = () => {
	return (
		<header>
			<Link to="/">Logo</Link>
			<Link to="/post/001">To post</Link>
			<ControlPanel />
		</header>
	);
}