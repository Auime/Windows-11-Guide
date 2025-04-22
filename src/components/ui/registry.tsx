import React from "react";

type RegistryProps = {
  children: React.ReactNode;
};

export function Registry({ children }: RegistryProps) {
  return <>{children}</>;
}
