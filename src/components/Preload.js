import React from "react";
import { MdRefresh } from "react-icons/md";
import { FaRegGrimace } from "react-icons/fa";

const Preload = () => (
	<>
		<div className="preload">
			<div>
				<MdRefresh className="preload-icon" />
			</div>
			<div>
				<FaRegGrimace className="preload-icon2" />
			</div>
		</div>
	</>
);

export default Preload;
