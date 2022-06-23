import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						href="https://fonts.googleapis.com/css2?family=Abel&family=Anton&family=Courier+Prime:wght@400;700&family=Josefin+Sans:wght@300;400;500;600;700&family=Lexend+Deca:wght@100;200;300;400;500;600;700;800&family=Livvic:wght@100;200;300;400;500;600;700;900&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
