import Link from "next/link";

import { blokProps } from "../interfaces";

const NavLink: React.FC<blokProps> = ({ blok }) => {
	return (
		<Link href={blok.link} passHref>
			<li className="nav-link">{blok.text}</li>
		</Link>
	);
};
export default NavLink;
