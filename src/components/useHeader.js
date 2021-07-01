import {useEffect} from "react";

const useHeader = () => {
  useEffect(() => {
    const toggleNavbar = () => {
      document
        .querySelector(".navbar-toggler")
        .classList.toggle("navbar-toggler--active");
      document.querySelector(".navbar").classList.toggle("navbar--open");
    };

    const overlayEffect = () => {
      for (let x = 0; x < 10; x++) {
        const div = document.createElement("div");
        div.className = "overlay-effect__item";
        document.querySelector(".overlay-effect").appendChild(div);
      }
    };

    overlayEffect();

    const toggleOverlayEffect = () => {
      document
        .querySelector(".overlay-effect")
        .classList.toggle("overlay-effect--active");
    };

    document.querySelector(".navbar-toggler").addEventListener("click", () => {
      toggleNavbar();
      toggleOverlayEffect();
    });

    const toggleSection = (hash) => {
      // hide section that doesnt have .hidden (shown sections)
      document.querySelectorAll("section:not(.hidden)").forEach((section) => {
        section.classList.add("hidden");
      });
      document.querySelector(hash).classList.remove("hidden");
    };

    document.querySelectorAll('a[href^="#"]').forEach((hashLink) => {
      hashLink.addEventListener("click", (e) => {
        e.preventDefault();
        const hash = e.target.hash;

        if (e.target.classList.contains("navbar__link")) {
          toggleSection(hash);
          toggleNavbar();
          toggleOverlayEffect();
        } else {
          document
            .querySelector(".navbar-toggler")
            .classList.add("navbar-toggler--hide");
          toggleOverlayEffect();

          setTimeout(() => {
            toggleSection(hash);
            document
              .querySelector(".navbar-toggler")
              .classList.remove("navbar-toggler--hide");
            toggleOverlayEffect();
          }, 950);
        }
      });
    });
  }, []);
};

export default useHeader;
