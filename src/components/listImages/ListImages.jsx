import stylesListImages from "./ListImages.module.css";
import { useScanner } from "../../contexts/ScannerContext";
import image from "../../assets/images/image.png";
import iconFound from "../../assets/images/found.png";
import iconNotFound from "../../assets/images/notFound.png";
import iconIncorrect from "../../assets/images/incorrect.png";
import iconCorrect from "../../assets/images/correct.png";
import iconToolbar from "../../assets/images/menu.png";
import { NotFoundImages } from "./notFoundImages/NotFoundImages";
import { useListImages } from "../../contexts/ListsImagesContext";

export const ListImages = () => {
  const { imagesInFiles, imagesNotInFiles } = useScanner();
  const {
    handleMenu,
    showSearcherOne,
    showSearcherTwo,
    searchNameImage,
    refScrollImagesNotFound,
    refScrollImagesFound,
    showNotResultsOne,
    showNotResultsTwo
  } = useListImages();

  return (
    <div className={stylesListImages.containLists}>
      <ul className={stylesListImages.ulImagesNotFound}>
        <div className={stylesListImages.containTitle}>
          <img
            className={
              imagesNotInFiles.length > 0
                ? stylesListImages.toolbarShow
                : stylesListImages.toolbarHide
            }
            onClick={() => handleMenu(event, "notFound")}
            src={iconToolbar}
          ></img>

          <div className={stylesListImages.title}>
            <span>Images not found</span>
            <img src={iconNotFound}></img>
          </div>
        </div>
        <div
          className={
            !showSearcherOne
              ? stylesListImages.containSearchHide
              : stylesListImages.containSearchShow
          }
        >
          <input
            onKeyUp={() => searchNameImage(event, refScrollImagesNotFound)}
            placeholder="Enter name image"
          ></input>
        </div>
        <div
          ref={refScrollImagesNotFound}
          data-scroll="scrollNotFound"
          className={stylesListImages.scroll}
        >
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

          {showNotResultsOne ? <NotFoundImages /> : ""}
        </div>
      </ul>

      <ul className={stylesListImages.ulImagesFound}>
        <div className={stylesListImages.containTitle}>
          <img
            className={
              imagesInFiles.length > 0
                ? stylesListImages.toolbarShow
                : stylesListImages.toolbarHide
            }
            onClick={() => handleMenu(event, "found")}
            src={iconToolbar}
          ></img>
          <div className={stylesListImages.title}>
            <span>Images found</span>
            <img src={iconFound}></img>
          </div>
        </div>
        <div
          className={
            !showSearcherTwo
              ? stylesListImages.containSearchHide
              : stylesListImages.containSearchShow
          }
        >
          <input
            onKeyUp={() => searchNameImage(event, refScrollImagesFound)}
            placeholder="Enter name image"
          ></input>
        </div>

        <div
          ref={refScrollImagesFound}
          data-scroll="scrollFound"
          className={stylesListImages.scroll}
        >
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
          {showNotResultsTwo ? <NotFoundImages /> : ""}
        </div>
      </ul>
    </div>
  );
};
