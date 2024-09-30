import React, { createContext, useContext, useState, ReactNode } from "react";

type TemperatureContextType = {
  degree: string;
  setDegree: (degree: string) => void;
};

const TemperatureContext = createContext<TemperatureContextType | undefined>(
  undefined
);

export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error("useTemperature must be used within a TemperatureProvider");
  }
  return context;
};

export const TemperatureProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [degree, setDegree] = useState("celcius");

  return (
    <TemperatureContext.Provider value={{ degree, setDegree }}>
      {children}
    </TemperatureContext.Provider>
  );
};
