import {
	FaFacebookF,
	FaInstagram,
	FaTwitter,
	FaYoutube,
	FaLinkedinIn,
} from "react-icons/fa";

import { blokProps } from "../interfaces";

const Icon: React.FC<blokProps> = ({ blok }): JSX.Element => {
	return (
		<a href={blok.link} target="_blank" rel="noreferrer">
			{blok.social_platform === "Facebook" ? (
				<span>
					<FaFacebookF />
				</span>
			) : blok.social_platform === "Twitter" ? (
				<span>
					<FaTwitter />
				</span>
			) : blok.social_platform === "Instagram" ? (
				<span>
					<FaInstagram />
				</span>
			) : blok.social_platform === "YouTube" ? (
				<span>
					<FaYoutube />
				</span>
			) : blok.social_platform === "LinkedIn" ? (
				<span>
					<FaLinkedinIn />
				</span>
			) : (
				<span>
					<FaFacebookF />
				</span>
			)}
		</a>
	);
};
export default Icon;
