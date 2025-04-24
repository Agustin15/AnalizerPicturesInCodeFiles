import iconToolbar from "../assets/images/menu.png";
import iconMenuOpen from "../assets/images/menuOpen.png";
import iconMenu from "../assets/images/menu.png";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const ListImagesContext = createContext();

export const ListImagesProvider = ({ children }) => {
  const [showMenuOne, setShowMenuOne] = useState(false);
  const [showMenuTwo, setShowMenuTwo] = useState(false);
  const [showSearcherOne, setShowSearcherOne] = useState(false);
  const [showSearcherTwo, setShowSearcherTwo] = useState(false);
  const [showNotResultsOne, setShowNotResultsOne] = useState(false);
  const [showNotResultsTwo, setShowNotResultsTwo] = useState(false);
  const refScrollImagesNotFound = useRef();
  const refScrollImagesFound = useRef();

  useEffect(() => {
    if (showSearcherOne) {
      document.getElementById("menuListNotFound").src = iconMenu;
      setShowMenuOne(false);
    }
  }, [showSearcherOne]);

  useEffect(() => {
    if (showSearcherTwo) {
      document.getElementById("menuListFound").src = iconMenu;
      setShowMenuTwo(false);
    }
  }, [showSearcherTwo]);

  const handleMenu = (event, option) => {
    let menuIcon = event.target;

    if (menuIcon.src.indexOf(iconToolbar) > -1) {
      menuIcon.src = iconMenuOpen;
      option == "notFound" ? setShowMenuOne(true) : setShowMenuTwo(true);
    } else {
      menuIcon.src = iconToolbar;
      option == "notFound" ? setShowMenuOne(false) : setShowMenuTwo(false);
    }
  };

  const searchNameImage = (event, scroll) => {
    let valueInput = event.target.value;
    let items = [...scroll.current.querySelectorAll("li")];

    items.forEach((item) => {
      let nameImage = item.querySelector("span").textContent;
      if (nameImage.indexOf(valueInput) > -1) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });

    let itemsHidden = items.filter((item) => item.style.display == "none");

    if (items.length == itemsHidden.length) {
      if (scroll.current.dataset.scroll == "scrollNotFound") {
        setShowNotResultsOne(true);
      } else {
        setShowNotResultsTwo(true);
      }
    } else {
      if (scroll.current.dataset.scroll == "scrollNotFound") {
        setShowNotResultsOne(false);
      } else {
        setShowNotResultsTwo(false);
      }
    }
  };

  return (
    <ListImagesContext.Provider
      value={{
        showSearcherOne,
        setShowSearcherOne,
        showSearcherTwo,
        setShowSearcherTwo,
        handleMenu,
        searchNameImage,
        refScrollImagesFound,
        refScrollImagesNotFound,
        showNotResultsOne,
        showNotResultsTwo,
        setShowMenuOne,
        setShowMenuTwo,
        showMenuOne,
        showMenuTwo,
      }}
    >
      {children}
    </ListImagesContext.Provider>
  );
};

export const useListImages = () => useContext(ListImagesContext);
