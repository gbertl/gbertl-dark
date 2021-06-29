import useHeader from "./useHeader";

const Header = () => {
  useHeader();

  return (
    <header class="header">
      <div class="container flex justify-end">
        <button class="navbar-toggler mr-15">
          <span class="navbar-toggler__icon"></span>
        </button>

        <nav class="navbar center">
          <ul class="text-center">
            <li>
              <a href="#about" class="navbar__link text-bold">
                About
              </a>
            </li>
            <li>
              <a href="#portfolio" class="navbar__link text-bold">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" class="navbar__link text-bold">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
