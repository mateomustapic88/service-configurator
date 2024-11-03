import React from "react";
import { ConfiguratorProvider } from "./contexts/ConfiguratorContext";
import IntroScreen from "./screens/IntroScreen/IntroScreen";
import ServiceFormScreen from "./screens/ServiceConfiguratorForm/ServiceConfiguratorForm";
import ServiceSummaryScreen from "./screens/ServiceSummaryScreen/ServiceSummaryScreen";
import SuccessScreen from "./screens/SuccessScreen/SuccessScreen";
import { useConfigurator } from "./contexts/ConfiguratorContext";
import Header from "./components/Header/Header";
import "./styles/global.scss";
import "./styles/typography.scss";

const App: React.FC = () => {
  return (
    <ConfiguratorProvider>
      <Header />
      <Screens />
    </ConfiguratorProvider>
  );
};

const Screens: React.FC = () => {
  const { screen } = useConfigurator();

  switch (screen) {
    case "Intro":
      return <IntroScreen />;
    case "Form":
      return <ServiceFormScreen />;
    case "Summary":
      return <ServiceSummaryScreen />;
    case "Success":
      return <SuccessScreen />;
    default:
      return null;
  }
};

export default App;
