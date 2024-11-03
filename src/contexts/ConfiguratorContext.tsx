import React, { createContext, useState, useContext, ReactNode } from "react";

interface Manufacturer {
  id: string;
  name: string;
}

interface ConfiguratorProviderProps {
  children: ReactNode;
}

interface ConfiguratorContextType {
  manufacturers: Manufacturer[];
  setManufacturers: (manufacturers: Manufacturer[]) => void;
  manufacturer: string | null;
  services: { id: string; name: string; price: number }[];
  promoCode: string | null;
  fullName: string;
  email: string;
  note: string;
  screen: string;
  phoneNumber: string;
  setManufacturer: (manufacturer: string) => void;
  setServices: (
    services: { id: string; name: string; price: number }[]
  ) => void;
  setPromoCode: (promoCode: string) => void;
  setFullName: (name: string) => void;
  setEmail: (email: string) => void;
  setNote: (note: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setScreen: (screen: string) => void;
}

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(
  undefined
);

export const ConfiguratorProvider: React.FC<ConfiguratorProviderProps> = ({
  children,
}) => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [manufacturer, setManufacturer] = useState<string | null>(null);
  const [services, setServices] = useState<
    { id: string; name: string; price: number }[]
  >([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [screen, setScreen] = useState("Intro");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <ConfiguratorContext.Provider
      value={{
        manufacturers,
        setManufacturers,
        manufacturer,
        services,
        promoCode,
        fullName,
        email,
        note,
        screen,
        phoneNumber,
        setManufacturer,
        setServices,
        setPromoCode,
        setFullName,
        setEmail,
        setNote,
        setPhoneNumber,
        setScreen,
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error(
      "useConfigurator must be used within a ConfiguratorProvider"
    );
  }
  return context;
};
