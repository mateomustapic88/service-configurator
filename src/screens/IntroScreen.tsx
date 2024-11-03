import React from "react";
import { useConfigurator } from "../contexts/ConfiguratorContext";
import "./IntroScreen.scss";
import Button from "../components/Button";
import toolsAndUtensilsIcon from "../assets/icons/toolsAndUtensils.svg";

const IntroScreen: React.FC = () => {
  const { setScreen } = useConfigurator();

  const handleStartClick = () => {
    setScreen("Form");
  };

  return (
    <div className='intro-screen-container'>
      <img
        src={toolsAndUtensilsIcon}
        alt='Tools and Utensils Icon'
        className='icon'
      />
      <h2 className='title'>Konfigurator Servisa</h2>
      <div className='description'>
        Pošaljite upit za servis svog vozila pomoću našeg konfiguratora i naš
        stručan tim će vam se javiti u najkraćem mogućem roku.
      </div>
      <Button type='primary' size='small' onClick={handleStartClick}>
        Pokreni konfigurator
      </Button>
    </div>
  );
};

export default IntroScreen;
