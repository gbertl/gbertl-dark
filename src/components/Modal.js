import React from "react";

class Modal extends React.Component {
  render() {
    return (
      <div className="modal">
        <div className="modal__transition"></div>
        <div className="modal__overlay px-15">
          <div className="modal__content">
            <div className="modal__header">
              <div className="modal__counter-wrapper flex align-center flex-wrap">
                <h2 className="modal__counter"></h2>
                <p className="modal__filter-title"></p>
              </div>

              <button className="modal__close close-btn" title="close"></button>

              <div className="modal__thumbnails-wrapper">
                <div className="modal__thumbnails flex"></div>
                <div className="flex justify-between modal__carousel-btn-wrapper hidden">
                  <button className="modal__carousel-prev-btn">
                    <span className="chevron-left"></span>
                  </button>
                  <button className="modal__carousel-next-btn">
                    <span className="chevron-right"></span>
                  </button>
                </div>
              </div>

              <ul className="dot-indicators flex justify-center hidden"></ul>

              <h1 className="modal__heading"></h1>
            </div>
            <div className="modal__body"></div>
            <div className="modal__footer flex justify-between">
              <div className="modal__prev-work invisible">
                <button
                  className="btn btn-primary modal__prev-work-btn"
                  title="Prev Work"
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
                <h2 className="mt-30 mb-15 modal__prev-work-title"></h2>
                <img alt="" className="modal__small-img" />
              </div>
              <div className="modal__next-work flex invisible">
                <button
                  className="btn btn-primary modal__next-work-btn"
                  title="Next Work"
                >
                  <i className="fas fa-arrow-right"></i>
                </button>
                <h2 className="mt-30 mb-15 modal__next-work-title"></h2>
                <img alt="" className="modal__small-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
