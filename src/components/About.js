import React from "react";
import {closeNavbar, hideToggler, showToggler} from "./helper";
import {openOverlayEffect, closeOverlayEffect} from "./overlayEffect";
import {withRouter} from "react-router-dom";

class About extends React.Component {
  componentDidMount() {
    showToggler();

    if (this.props.isNavOpen) {
      closeNavbar();
      this.props.setIsNavOpen(false);
    }

    if (this.props.isOverlayActive) {
      closeOverlayEffect();
      this.props.setIsOverlayActive(false);
    }
  }

  handleAboutLink(path) {
    hideToggler();

    openOverlayEffect();
    this.props.setIsOverlayActive(true);

    setTimeout(() => {
      this.props.history.push(path);
    }, 950);
  }

  render() {
    return (
      <section className="about" id="about">
        <div className="container about__container">
          <div className="px-15 about__details">
            <img
              src="https://avatars.githubusercontent.com/u/25029583?v=4"
              alt=""
              className="about__img"
            />
            <h1 className="about__heading">Hi, my name is Gilbert.</h1>
            <p>
              I'm a <span className="text-bold">Front-end Developer</span> based
              in the Philippines. My expertise is focused on{" "}
              <span className="text-bold">HTML5</span>,{" "}
              <span className="text-bold">CSS3</span>,{" "}
              <span className="text-bold">JavaScript</span> and{" "}
              <span className="text-bold">React</span>. Feel free to take a look
              at my latest works on the{" "}
              <button
                className="text-bold text-primary about__link"
                onClick={() => this.handleAboutLink("/portfolio")}
              >
                portfolio page
              </button>
              . Want to talk about a project? You can get in touch with me{" "}
              <button
                className="text-bold text-primary about__link"
                onClick={() => this.handleAboutLink("/contact")}
              >
                here
              </button>
              .
            </p>

            <div className="mt-30 flex gap-15 align-center justify-center">
              <a href="https://github.com/gilbertlc" target="_blank">
                <i class="fab fa-github"></i> Github
              </a>
              <a
                href="https://www.linkedin.com/in/gilbertlcsndle"
                target="_blank"
              >
                <i class="fab fa-linkedin"></i> Linkedin
              </a>
              <a href="mailto:gilbertlcsndle@gmail.com" target="_blank">
                <i class="fas fa-envelope"></i> Email
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(About);
