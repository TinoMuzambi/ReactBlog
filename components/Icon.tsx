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
				<FaFacebookF />
			) : blok.social_platform === "Twitter" ? (
				<FaTwitter />
			) : blok.social_platform === "Instagram" ? (
				<FaInstagram />
			) : blok.social_platform === "YouTube" ? (
				<FaYoutube />
			) : blok.social_platform === "LinkedIn" ? (
				<FaLinkedinIn />
			) : (
				<FaFacebookF />
			)}
		</a>
	);
};
export default Icon;
