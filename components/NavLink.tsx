import Link from "next/link";

import { blokProps } from "../interfaces";

const NavLink: React.FC<blokProps> = ({ blok }): JSX.Element => {
	return (
		<Link href={blok.link}>
			<a>{blok.text}</a>
		</Link>
	);
};
export default NavLink;
