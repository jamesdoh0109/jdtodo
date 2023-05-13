import { createContext } from "react";

const ModalContext = createContext({
  isModalOpen: false, 
  setIsModalOpen: () => {}
});

export default ModalContext;