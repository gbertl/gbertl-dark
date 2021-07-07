import useHeader from "./useHeader";

const Header = () => {
  useHeader();

  return (
    <header className="header">
      <div className="container flex justify-end">
        <button className="navbar-toggler mr-15">
          <span className="navbar-toggler__icon"></span>
        </button>

        <nav className="navbar center">
          <ul className="text-center">
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
