import stylesMenuListImages from "./MenuListImages.module.css";
import iconSearch from "../../../assets/images/search.png";
import iconZip from "../../../assets/images/zip.png";
import { useListImages } from "../../../contexts/ListsImagesContext";
import { generateFolderImages } from "../../../generateZip.js";
import { useScanner } from "../../../contexts/ScannerContext.jsx";

export const MenuListImages = ({ option, images }) => {
  const { setShowSearcherOne, setShowSearcherTwo } = useListImages();
  const { uploadedImages } = useScanner();

  return (
    <div className={stylesMenuListImages.containMenuListImages}>
    <div className={stylesMenuListImages.menuListImages}>
      <li
        onClick={() =>
          option == "listNotFound"
            ? setShowSearcherOne(true)
            : setShowSearcherTwo(true)
        }
      >
        <img src={iconSearch}></img>
        Search images
      </li>
      <li onClick={() => generateFolderImages(images, uploadedImages)}>
        <img src={iconZip}></img>
        Download images
      </li>
    </div>
    </div>
  );
};
