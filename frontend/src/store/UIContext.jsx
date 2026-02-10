import { useState } from "react";
import { createContext } from "react";



export const UIContext = createContext(null);

const UIProvider = ({ children }) => {
      
      
      const [menuOpen, setMenuOpen] = useState(false);
       const [popupOpen, setPopupOpen] = useState(true);

      return(
        <UIContext.Provider value={{ menuOpen, setMenuOpen, popupOpen, setPopupOpen}}>
            {children}
        </UIContext.Provider>
      )

}


export default UIProvider;