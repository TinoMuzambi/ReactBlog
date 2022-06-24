import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						type="application/opensearchdescription+xml"
						rel="search"
						href="https://blog.tinomuzambi.com/opensearch.xml"
						title="Blog.TinoMuzambi"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Abel&family=Anton&family=Courier+Prime:wght@400;700&family=Josefin+Sans:wght@300;400;500;600;700&family=Lexend+Deca:wght@100;200;300;400;500;600;700;800&family=Livvic:wght@100;200;300;400;500;600;700;900&display=swap"
						rel="stylesheet"
					/>
					{/* Global Site Tag (gtag.js) - Google Analytics */}
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${process.env.ANALYTICS_CODE}`}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.ANALYTICS_CODE}', {
              page_path: window.location.pathname,
            });
          `,
						}}
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
