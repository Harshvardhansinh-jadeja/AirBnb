"use client";
import React, {useEffect, useState} from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}
//NOT NEEDED IT WAS JUST SHOWING HYDRATION ERROR THAT'S WHY I ADDED THIS.
const ClientOnly: React.FC<ClientOnlyProps> = ({children}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return <>{children}</>;
};
export default ClientOnly;
