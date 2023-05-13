import { useState } from "react";
import ModalContext from "./modal-context";

export default function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{
      isModalOpen: isModalOpen,
      setIsModalOpen: setIsModalOpen
    }}>
      { children }
    </ModalContext.Provider>
  )
}