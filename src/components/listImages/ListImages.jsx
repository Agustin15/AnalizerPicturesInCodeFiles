import stylesListImages from "./ListImages.module.css";
import { useScanner } from "../../contexts/ScannerContext";
import image from "../../assets/images/image.png";
import iconFound from "../../assets/images/found.png";
import iconNotFound from "../../assets/images/notFound.png";
import iconIncorrect from "../../assets/images/incorrect.png";
import iconCorrect from "../../assets/images/correct.png";
import { NotFoundImages } from "./notFoundImages/NotFoundImages";

export const ListImages = () => {
  const { imagesInFiles, imagesNotInFiles } = useScanner();
  return (
    <div className={stylesListImages.containLists}>
      <ul className={stylesListImages.ulImagesNotFound}>
        <div className={stylesListImages.title}>
          <span>Images not found</span>
          <img src={iconNotFound}></img>
        </div>
        <div className={stylesListImages.scroll}>
          {imagesNotInFiles.length > 0 ? (
            imagesNotInFiles.map((nameImage, index) => (
              <li key={index}>
                <div className={stylesListImages.rowOne}>
                  <img src={image}></img>
                  <span>{nameImage}</span>
                </div>
                <img src={iconIncorrect}></img>
              </li>
            ))
          ) : (
            <NotFoundImages />
          )}
        </div>
      </ul>
      <ul className={stylesListImages.ulImagesFound}>
        <div className={stylesListImages.title}>
          <span>Images found</span>
          <img src={iconFound}></img>
        </div>
        <div className={stylesListImages.scroll}>
          {imagesInFiles.length > 0 ? (
            imagesInFiles.map((nameImage, index) => (
              <li key={index}>
                <div className={stylesListImages.rowOne}>
                  <img src={image}></img>
                  <span>{nameImage}</span>
                </div>
                <img src={iconCorrect}></img>
              </li>
            ))
          ) : (
            <NotFoundImages />
          )}
        </div>
      </ul>
    </div>
  );
};
