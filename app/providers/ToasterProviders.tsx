"use client";
import {Toaster} from "react-hot-toast";

const ToasterProviders = () => {
  return (
    //we did not directly used this component because this package is not adjusted to next JS app directory structure
    <Toaster />
  );
};

export default ToasterProviders;
