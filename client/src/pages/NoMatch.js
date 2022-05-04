import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  setTimeout(() => {
        window.location.assign('/');
      }, 5000);
  return (
    <>
    <div className="position-relative v-100">
<Link className="back" to="/">
          ← Back to Books
        </Link>
<div id="root">
	<div class="flex-container">
		<div class="worm">
			<div class="x"></div>
			<div class="x"></div>
			<div class="x"></div>
			<div class="x"></div>
			<div class="x"></div>
			<div class="x"></div>
			<div class="x"></div>
			<div class="x"></div>
		</div>
		<div className="text-center ">
      <h4>uh oh ...</h4><p>Looks like the bookworms got to what you were looking for first !</p></div>
	</div>
</div>
    {/* // fun swirling text to go inside here for 404 error */}
    
    </div>
    <div className="about row h-25">
        <p className="py-4 px-4">
          Textos Antiguos has been in the vintage book business since before it
          was cool, and we are proud to say that we’ve got the books to prove
          it! If you’re looking for an old book about Relativity and the Fourth
          Dimension, or if you need some help tracking down that rare first
          edition cover art, then you’ve come to the right place. Browse our
          online catalog to find some of the best deals on books that hold rich
          cultural and design significance !{" "}
        </p>
      </div>
      </>
  );
};

export default NoMatch;