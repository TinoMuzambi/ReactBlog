import React, { useEffect } from "react";

const Disqus = ({ url, id, src }) => {
	useEffect(() => {
		const DISQUS_SCRIPT = "disq_script";
		const sd = document.getElementById(DISQUS_SCRIPT);
		if (!sd) {
			var disqus_config = function () {
				this.page.url = url;
				this.page.identifier = id;
			};

			const d = document;
			const s = d.createElement("script");
			s.src = src; // REPLACE THIS LINE WITH YOUR DISQUS LINE
			s.id = DISQUS_SCRIPT;
			s.async = true;
			s.setAttribute("data-timestamp", +new Date());

			d.body.appendChild(s);
		} else {
			window.DISQUS.reset({
				reload: true,
				config: disqus_config,
			});
		}
	}, [id, src, url]);
	return <div id="disqus_thread"></div>;
};

export default Disqus;
