import Link from "next/link";

import { blokProps } from "../interfaces";

const Category: React.FC<blokProps> = ({ blok }) => {
	return (
		<Link
			href={`/categories/${blok.name.toLowerCase()}`}
			key={blok.name as string}
			passHref
		>
			<li className="list-items" data-aos="fade-left" data-aos-delay="200">
				{blok.name}
				<span>({blok.count})</span>
			</li>
		</Link>
	);
};
export default Category;
