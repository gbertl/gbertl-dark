import { useEffect } from "react";
import { toggleBodyScroll } from "./helper";
import emailjs from "emailjs-com";
import { closeNavbar, showToggler } from "./helper";
import { closeOverlayEffect } from "./overlayEffect";

const useContact = ({
  isNavOpen,
  setIsNavOpen,
  isOverlayActive,
  setIsOverlayActive,
}) => {
  useEffect(() => {
    showToggler();

    if (isNavOpen) {
      closeNavbar();
      setIsNavOpen(false);
    }

    if (isOverlayActive) {
      closeOverlayEffect();
      setIsOverlayActive(false);
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
  }, []);
};

export default useContact;
