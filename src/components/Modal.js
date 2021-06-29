import React from "react";

class Modal extends React.Component {
  render() {
    return (
      <div class="modal">
        <div class="modal__transition"></div>
        <div class="modal__overlay px-15">
          <div class="modal__content">
            <div class="modal__header">
              <div class="modal__counter-wrapper flex align-center flex-wrap">
                <h2 class="modal__counter"></h2>
                <p class="modal__filter-title"></p>
              </div>

              <button class="modal__close close-btn" title="close"></button>

              <div class="modal__thumbnails-wrapper">
                <div class="modal__thumbnails flex"></div>
                <div
                  class="flex justify-between modal__carousel-btn-wrapper hidden"
                >
                  <button class="modal__carousel-prev-btn">
                    <span class="chevron-left"></span>
                  </button>
                  <button class="modal__carousel-next-btn">
                    <span class="chevron-right"></span>
                  </button>
                </div>
              </div>

              <ul class="dot-indicators flex justify-center hidden"></ul>

              <h1 class="modal__heading"></h1>
            </div>
            <div class="modal__body"></div>
            <div class="modal__footer flex justify-between">
              <div class="modal__prev-work invisible">
                <button
                  class="btn btn-primary modal__prev-work-btn"
                  title="Prev Work"
                >
                  <i class="fas fa-arrow-left"></i>
                </button>
                <h2 class="mt-30 mb-15 modal__prev-work-title"></h2>
                <img alt="" class="modal__small-img" />
              </div>
              <div class="modal__next-work flex invisible">
                <button
                  class="btn btn-primary modal__next-work-btn"
                  title="Next Work"
                >
                  <i class="fas fa-arrow-right"></i>
                </button>
                <h2 class="mt-30 mb-15 modal__next-work-title"></h2>
                <img alt="" class="modal__small-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
