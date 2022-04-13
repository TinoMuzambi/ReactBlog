import { blokProps } from "../interfaces";

const Image: React.FC<blokProps> = ({ blok }): JSX.Element => {
	return <img src={blok.filename} alt={blok.alt} />;
};
export default Image;
