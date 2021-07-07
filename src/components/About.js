import React from "react";

class About extends React.Component {
  render() {
    return (
      <section className="about hidden" id="about">
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
              <a
                href="#portfolio"
                className="text-bold text-primary about__link"
              >
                Portfolio Page
              </a>
              . Want to talk about a project? You can get in touch with me
              <a href="#contact" className="text-bold text-primary about__link">
                {" "}
                here
              </a>
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
