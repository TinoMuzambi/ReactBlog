import { blokProps } from "../interfaces";

const Text: React.FC<blokProps> = ({ blok }): JSX.Element => {
	return <p>{blok.text}</p>;
};
export default Text;
