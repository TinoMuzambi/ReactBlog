import { PlaceholderProps } from "../interfaces";

const Placeholder: React.FC<PlaceholderProps> = ({ componentName }) => (
	<div className="placeholder">
		<p>
			The component <strong>{componentName}</strong> has not been created yet.
		</p>
	</div>
);

export default Placeholder;
