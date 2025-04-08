import { Menu } from "iconoir-react";

import fullLogo from "@/assets/images/png/full-logo.png";
type HeaderProps = {
  setMobileMenuOpen: () => void;
};

const Header: React.FC<HeaderProps> = ({ setMobileMenuOpen }) => {
  return (
    <header className="flex items-center justify-between bg-white shadow px-4 py-3 md:hidden">
      <img src={fullLogo} alt="SirCo Logo" className="w-24" />
      <button onClick={setMobileMenuOpen}>
        <Menu className="h-6 w-6" />
      </button>
    </header>
  );
};

export default Header;
