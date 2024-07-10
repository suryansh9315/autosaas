"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const ModalContext = createContext({
  data: {},
  isOpen: false,
  setOpen: (modal, fetchData) => {},
  setClose: () => {},
});

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const [showingModal, setShowingModal] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setOpen = async (modal, fetchData) => {
    if (modal) {
      if (fetchData) {
        setData({ ...data, ...(await fetchData()) } || {});
      }
      setShowingModal(modal);
      setIsOpen(true);
    }
  };

  const setClose = () => {
    setIsOpen(false);
    setData({});
  };

  if (!isMounted) return null;

  return (
    <ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
      {children}
      {showingModal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within the modal provider");
  }
  return context;
};

export default ModalProvider;
