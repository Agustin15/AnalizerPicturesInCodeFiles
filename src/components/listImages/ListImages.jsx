import stylesListImages from "./ListImages.module.css";
import { useScanner } from "../../contexts/ScannerContext";
import { List } from "./list/List";
import { useListImages } from "../../contexts/ListsImagesContext";
import { useEffect } from "react";

export const ListImages = () => {
  const { imagesInFiles, imagesNotInFiles} = useScanner();
  
  const {
    setShowSearcherOne,
    setShowSearcherTwo,
    showSearcherOne,
    showSearcherTwo,
    refScrollImagesNotFound,
    refScrollImagesFound,
    showNotResultsOne,
    showNotResultsTwo,
    showMenuOne,
    showMenuTwo,
  } = useListImages();

  return (
    <div className={stylesListImages.containLists}>
      <List
        id="menuListNotFound"
        images={imagesNotInFiles}
        showMenu={showMenuOne}
        showSearcher={showSearcherOne}
        refScrollImages={refScrollImagesNotFound}
        showNotResults={showNotResultsOne}
        setShowSearcher={setShowSearcherOne}
      ></List>

      <List
        id="menuListFound"
        images={imagesInFiles}
        showMenu={showMenuTwo}
        showSearcher={showSearcherTwo}
        refScrollImages={refScrollImagesFound}
        showNotResults={showNotResultsTwo}
        setShowSearcher={setShowSearcherTwo}
      ></List>
    </div>
  );
};
