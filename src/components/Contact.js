import {Component} from "react";
import {toggleBodyScroll} from "./helper";
import emailjs from "emailjs-com";
import {closeNavbar, showToggler} from "./helper";
import {closeOverlayEffect} from "./overlayEffect";

class Contact extends Component {
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

    const toggleContactForm = () => {
      document
        .querySelector(".contact-form")
        .classList.toggle("contact-form--open");
      toggleBodyScroll();
    };

    document
      .querySelector(".contact__send-btn")
      .addEventListener("click", toggleContactForm);

    document
      .querySelector(".contact-form__close")
      .addEventListener("click", toggleContactForm);

    document.querySelector(".contact-form").addEventListener("click", (e) => {
      if (!e.target.closest(".contact-form__content")) {
        toggleContactForm();
      }
    });

    document
      .querySelector(".contact-form__form")
      .addEventListener("submit", (e) => {
        e.preventDefault();

        emailjs
          .sendForm(
            "service_2ml4lwk",
            "template_e0ppieo",
            e.target,
            "user_jmQ3lowI4xMVTboiORnz4"
          )
          .then(
            (result) => {
              alert(
                "Your message has been sent successfully, I hope to respond within 24 hours. Thanks!"
              );
            },
            (error) => {
              console.log(error.text);
            }
          );
        e.target.reset();
      });
  }

  render() {
    return (
      <section className="contact" id="contact">
        <div className="container text-center min-h-screen contact__container px-15 center">
          <div>
            <h1 className="section-heading">Contact Me</h1>
            <p className="contact__desc">
              If you wanna get in touch, talk to me about a project
              collaboration or just say hi, click the button below and fill up
              the awesome form or hire me on{" "}
              <a
                href="https://www.upwork.com/freelancers/~0110dcf905a3a19183"
                target="_blank"
                className="text-bold"
              >
                Upwork
              </a>{" "}
              and let's talk.
            </p>

            <button className="btn btn-primary mt-15 contact__send-btn">
              Send Message
            </button>
          </div>
        </div>

        <div className="contact-form">
          <div className="contact-form__container min-h-screen px-15">
            <div className="w-full contact-form__content">
              <button className="close-btn contact-form__close"></button>
              <form className="contact-form__form" action="">
                <div className="contact-form__input-wrapper">
                  <input
                    type="text"
                    name="name"
                    className="contact-form__input"
                    required
                  />
                  <label className="contact-form__label">
                    <span className="contact-form__span">Your Name</span>
                  </label>
                </div>
                <div className="contact-form__input-wrapper">
                  <input
                    type="email"
                    name="email"
                    className="contact-form__input"
                    required
                  />
                  <label className="contact-form__label">
                    <span className="contact-form__span">Your Email</span>
                  </label>
                </div>
                <div className="contact-form__input-wrapper">
                  <textarea
                    name="message"
                    className="contact-form__input contact-form__textarea"
                    required
                  ></textarea>
                  <label className="contact-form__label">
                    <span className="contact-form__span">Message</span>
                  </label>
                </div>
                <button className="btn btn-primary mt-15 contact-form__send-form">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
