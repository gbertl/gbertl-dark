import { useEffect } from 'react';
import emailjs from 'emailjs-com';
import {
  toggleBodyScroll,
  closeOverlayEffect,
  closeNavbar,
  showToggler,
} from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { closeIsNav, hideLoader } from '../../store/actions/ui';

const useContact = ({ isOverlayActive, setIsOverlayActive, ...props }) => {
  const isNavOpen = useSelector((state) => state.ui.isNavOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('load', () => {
      dispatch(hideLoader());
    });

    showToggler();

    if (isNavOpen) {
      closeNavbar();
      dispatch(closeIsNav());
    }

    if (isOverlayActive) {
      closeOverlayEffect();
      setIsOverlayActive(false);
    }

    const toggleContactForm = () => {
      document
        .querySelector('.contact-form')
        .classList.toggle('contact-form--open');
      toggleBodyScroll();
    };

    document
      .querySelector('.contact__send-btn')
      .addEventListener('click', toggleContactForm);

    document
      .querySelector('.contact-form__close')
      .addEventListener('click', toggleContactForm);

    document.querySelector('.contact-form').addEventListener('click', (e) => {
      if (!e.target.closest('.contact-form__content')) {
        toggleContactForm();
      }
    });

    document
      .querySelector('.contact-form__form')
      .addEventListener('submit', (e) => {
        e.preventDefault();

        emailjs
          .sendForm(
            'service_2ml4lwk',
            'template_e0ppieo',
            e.target,
            'user_jmQ3lowI4xMVTboiORnz4'
          )
          .then(
            (result) => {
              alert(
                'Your message has been sent successfully, I hope to respond within 24 hours. Thanks!'
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
