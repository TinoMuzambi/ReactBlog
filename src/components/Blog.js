import React, { Component } from "react";
import blogs from "../data/blogs";
import Sidebar from "./Sidebar";
import { FaUser, FaCalendar } from "react-icons/fa";
import img from "../assets/blog-images/me_crop.jpg";
import Moment from "react-moment";
import Disqus from "disqus-react";

class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.match.params.name,
		};
	}

	render() {
		const title = this.state.name;
		const blog = blogs.find((blog) => blog.url === title);
		const disqusShortname = "blogtinomuzambi";
		const disqusConfig = {
			url: blog.disqusURL,
			identifier: blog.disqusIdentifier,
			title: blog.title,
		};
		return (
			<>
				<section class="container" id="blogs">
					<div class="site-content">
						<div class="posts">
							<div class="post-content" data-aos="zoom-in" data-aos-delay="200">
								<div class="post-title">
									<h1>{blog.title}</h1>
									<h3>
										<i class="fas fa-user text-gray">
											<FaUser />
										</i>
										&nbsp;Me&nbsp;&nbsp;
										<i class="fas fa-calendar-alt text-gray">
											<FaCalendar />
										</i>
										&nbsp;<Moment format="MMM DD, YYYY">{blog.date}</Moment>
									</h3>
									<div class="post-image">
										<div>
											<img src={img} class="img" alt="shower" />
										</div>
									</div>
								</div>

								<p>
									I had a shower thought, about taking a shower. The thought
									intrigued me and I haven't stopped thinking about it. It
									intrigued me so much that I couldn’t keep it to myself any
									longer, so I’ve come to share it with you. I think I’ll make
									this a series, so with that said, welcome to the pilot of{" "}
									<i>Shower Thoughts</i>.<br />
									<br />
									One of the key parts about taking a shower is spending five
									minutes balancing the flow of the cold and hot water to get
									the temperature just right. This act of making minor
									adjustments to the cold and hot water taps (or lever) is what
									my thought is based on.
									<br />
									<br />
									If you’ve ever showered later than everyone else, (or if
									that’s just your routine like me) you’ll know about the
									struggle of there no longer being any hot water when you get
									around to it. Another version of the struggle is when there
									still is some hot water, but you can feel it finishing as you
									shower, which is much worse in my opinion. The latter version
									is what got me thinking.
									<br />
									<br />
									I thought, I can feel this water losing its heat because it’s
									happening at a relatively fast rate. What if it were to happen
									at a slower rate though? A much much slower rate. Would I
									still be able to tell that the temperature is changing, or
									would my body not be sensitive enough to sense it and I end up
									showering with substantially cooler water? My initial thought
									was that there must be some threshold at which a trigger in my
									body goes off, maybe when I start getting goosebumps but I
									don’t really have an understanding of how the body deals with
									changes in temperatures to know.
									<br />
									<br />
									In the same breath, I also thought about the temperature going
									the other way. If the temperature were to be raised at a very
									gradual rate, would I be able to tell that this water is
									getting hotter? And instead of goosebumps the sensation of
									getting burnt. In this version, you might actually be more
									likely to pick up the difference because although a cold
									shower is definitely a thing, the human won’t be able to
									tolerate a shower that’s too hot.
									<br />
									<br />
									My guess is that at a gradual enough rate, you likely won’t be
									able to tell that the temperature is changing, given that you
									don’t know that that’s what’s happening beforehand that is.
									The problem with this though is that with the average shower
									being only eight minutes long, there just isn’t enough time. I
									reckon you’d have to stand in the shower for a solid few hours
									which is tiring, bad for your skin and ain’t nobody got time
									for that.
									<br />
								</p>

								<div class="post-image">
									<div>
										<img src={img} class="img" alt="time" />
									</div>
								</div>

								<hr />
								<p>
									I’d love to hear your thoughts on this, especially if you know
									some stuff about how the body reacts to changes in
									temperature. Would you be willing to stand in a shower to find
									out the answer? Do you think this whole idea is just
									ridiculous? Let’s hear it.
									<br />
									<br />
								</p>
							</div>

							{/* <!---------------------------------  Disqus Comments Plugin  -------------------------------------- --> */}

							{/* <Disqus.DicussionEmbed
							shortname={disqusShortname}
							config={disqusConfig}
						/> */}

							{/* <!--------------X------------------  Disqus Comments Plugin  ------------------------X------------- --> */}
						</div>
						<Sidebar blogs={blogs} />
					</div>
				</section>
			</>
		);
	}
}

export default Blog;
