import React from "react";
import { useConfigurator } from "../../contexts/ConfiguratorContext";
import "./SuccessScreen.scss";
import Button from "../../components/Button/Button";
import mailConfirmationIcon from "../../assets/icons/mailConfirmationIcon.svg";

const SuccessScreen: React.FC = () => {
  const { setScreen } = useConfigurator();

  return (
    <div className='success-screen'>
      <img
        src={mailConfirmationIcon}
        alt='Tools and Utensils Icon'
        className='icon'
      />
      <h2 className='title'>Uspješno ste poslali zahtjev!</h2>
      <p>
        Vaša prijava je uspješno poslana i zaprimljena. Kontaktirat ćemo vas u
        najkraćem mogućem roku. Hvala vam!
      </p>
      <Button
        className='restart-button'
        type='primary'
        size='small'
        onClick={() => setScreen("Intro")}
      >
        Pokreni ponovo
      </Button>
    </div>
  );
};

export default SuccessScreen;
