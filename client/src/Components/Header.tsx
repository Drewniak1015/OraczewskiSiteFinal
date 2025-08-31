import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import notesSVG from "../assets/notes.svg";

const Header = () => {
  const [visible, setVisible] = useState<Boolean>(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact us", path: "/contact" },
  ];

  const closeMenu = () => setVisible(false);

  return (
    <div className="w-full h-[6rem] bg-black flex justify-center items-center sticky top-0 left-0 z-[100]">
      <div className="w-full max-w-[1320px] px-4 flex justify-between items-center">
        <Link to="/" onClick={closeMenu}>
          <img
            src={Logo}
            alt="Logo"
            className="h-[3.5rem] sm:h-[4.5rem] md:h-[5.5rem]"
          />
        </Link>

        <img
          src={notesSVG}
          alt="Menu Icon"
          className="w-12 h-12 md:hidden block cursor-pointer"
          onClick={() => setVisible(!visible)}
        />

        <ul
          className={`
            text-white gap-4 sm:gap-6 md:gap-10 lg:gap-[4.625rem]
            text-[1rem] md:text-[1rem] lg:text-[1.25rem] font-family-pro
            absolute top-[6rem] left-0 bg-black w-full
            transition-transform duration-500 ease-in-out
            ${visible ? "translate-x-0" : "-translate-x-full"}
            md:static md:flex md:translate-x-0 md:w-auto md:bg-transparent
            py-2
          `}
        >
          {navItems.map(({ name, path }, index) => (
            <li
              key={index}
              className="hover:scale-[1.1] duration-300 ease-in-out md:p-0 px-4 py-3 border-b border-white/20 md:border-none"
            >
              <Link to={path} className="block w-full" onClick={closeMenu}>
                {name}
              </Link>
            </li>
          ))}

          <li
            className="cursor-pointer duration-300 ease-in-out p-4 font-bold text-center md:hidden"
            onClick={closeMenu}
          >
            Close
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
