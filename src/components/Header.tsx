import React from "react";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className='header'>
      <h2>Konfigurator Servisa</h2>
      <span className='service-cost-text'>Izračunajte trošak servisa</span>
    </header>
  );
};

export default Header;
