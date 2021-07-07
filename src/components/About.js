import React from "react";
import {closeNavbar, hideToggler, showToggler} from "./helper";
import {openOverlayEffect, closeOverlayEffect} from "./overlayEffect";

class About extends React.Component {
  componentDidMount() {
    showToggler();
    closeNavbar();
    closeOverlayEffect();
  }

  handleAboutLink(path) {
    hideToggler();
    openOverlayEffect();

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
            <h1 className="about__heading">Hi, My name is Gilbert.</h1>
            <p>
              I'm a <span className="text-bold">Front-End Developer</span>{" "}
              living in the Philippines. I make web apps usually with{" "}
              <span className="text-bold">HTML</span>,{" "}
              <span className="text-bold">CSS</span>, and{" "}
              <span className="text-bold">JavaScript</span>. Check out my latest
              work on the{" "}
              <button
                className="text-bold text-primary about__link"
                onClick={() => this.handleAboutLink("/portfolio")}
              >
                Portfolio Page
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

            <div className="skills">
              <h2 className="skills__heading">Skills</h2>
              <ul className="flex justify-center gap-4 flex-wrap">
                <li className="skills__item">HTML</li>
                <li className="skills__item">CSS</li>
                <li className="skills__item">JavaScript</li>
                <li className="skills__item">React</li>

                <li className="skills__item">Django</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
