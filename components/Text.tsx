import { blokProps } from "../interfaces";

const Text: React.FC<blokProps> = ({ blok }) => {
	return <p>{blok.text}</p>;
};
export default Text;
