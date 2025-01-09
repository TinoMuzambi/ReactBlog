import { blokProps } from "../interfaces";

const Image: React.FC<blokProps> = ({ blok }) => {
	return (
		<img
			src={blok.image.filename}
			alt={blok.image.alt}
			className={blok?.classname}
		/>
	);
};
export default Image;
