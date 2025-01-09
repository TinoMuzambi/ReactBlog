import { blokProps } from "../interfaces";
import DynamicComponent from "./DynamicComponent";

const ImageGrid: React.FC<blokProps> = ({ blok }) => {
	return (
		<a href={blok.link} target="_blank" rel="noreferrer">
			<div className="flex-row">
				{blok.images.slice(0, 3).map((image: any, key: number) => (
					<img src={image.filename} alt={image.alt} key={key} />
				))}
			</div>
			<div className="flex-row">
				{blok.images.slice(3, 7).map((image: any, key: number) => (
					<img src={image.filename} alt={image.alt} key={key} />
				))}
			</div>
		</a>
	);
};
export default ImageGrid;
