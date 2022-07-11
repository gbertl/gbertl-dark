import Head from 'next/head';
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

import useResetUI from '../hooks/useResetUI';
import { toggleBodyScroll } from '../utils';

enum MessageTypes {
  Ok = 'ok',
  Invalid = 'invalid',
}

interface MessageNode {
  type: MessageTypes;
  text: string;
}

const Contact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<MessageNode>({
    type: MessageTypes.Invalid,
    text: '',
  });

  useResetUI();

  const handleShowForm = () => {
    setIsFormOpen(true);
    toggleBodyScroll();
  };

  const handleHideForm = () => {
    setIsFormOpen(false);
    toggleBodyScroll();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const target = e.target as HTMLFormElement;

    emailjs
      .sendForm(
        'service_2ml4lwk',
        'template_e0ppieo',
        target,
        'user_jmQ3lowI4xMVTboiORnz4'
      )
      .then(
        () => {
          setIsLoading(false);
          setMessage({
            type: MessageTypes.Ok,
            text: 'Your message has been sent successfully, I hope to respond within 24 hours. Thanks!',
          });
          target.reset();
        },
        (error) => {
          setIsLoading(false);
          setMessage({ type: MessageTypes.Invalid, text: error.text });
        }
      );
  };

  return (
    <section className="contact" id="contact">
      <div className="container text-center min-h-screen contact__container px-15 center">
        <div>
          <h1 className="section-heading contact__heading">Contact Me</h1>
          <p className="contact__desc">
            If you wanna get in touch, talk to me about a project collaboration
            or just say hi, click the button below and fill up the awesome form
            or hire me on{' '}
            <a
              rel="noreferrer"
              href="https://www.upwork.com/freelancers/~0110dcf905a3a19183"
              target="_blank"
              className="text-link"
            >
              Upwork
            </a>{' '}
            and let&apos;s talk.
          </p>

          <button
            className="btn btn--primary mt-15 contact__send-btn"
            onClick={handleShowForm}
          >
            Send A Message
          </button>
        </div>
      </div>

      <div
        className={`contact-form${isFormOpen ? ' contact-form--open' : ''}`}
        onClick={(e) => {
          if (!(e.target as Element).closest('.contact-form__content')) {
            handleHideForm();
          }
        }}
      >
        <div className="contact-form__container min-h-screen px-15">
          <div className="w-full contact-form__content">
            <button
              className="close-btn contact-form__close"
              onClick={handleHideForm}
            ></button>
            <form className="contact-form__form" onSubmit={handleSubmit}>
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
              {message.text && (
                <p
                  className={`${
                    message.type === MessageTypes.Invalid ? 'text-danger' : ''
                  }`}
                >
                  {message.text}
                </p>
              )}
              <button
                className={`btn btn--primary${
                  isLoading ? ' btn--active' : ''
                } mt-15 contact-form__send-form`}
              >
                {isLoading && (
                  <span className="contact-form__send-loader"></span>
                )}
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
