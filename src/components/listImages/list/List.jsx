import stylesListImages from "../ListImages.module.css";
import { useListImages } from "../../../contexts/ListsImagesContext";
import image from "../../../assets/images/image.png";
import iconFound from "../../../assets/images/found.png";
import iconNotFound from "../../../assets/images/notFound.png";
import iconIncorrect from "../../../assets/images/incorrect.png";
import iconCorrect from "../../../assets/images/correct.png";
import iconToolbar from "../../../assets/images/menu.png";
import iconClose from "../../../assets/images/close.png";
import { MenuListImages } from "../menuListImages/MenuListImages";
import { NotFoundImages } from "../notFoundImages/NotFoundImages";
import { useScanner } from "../../../contexts/ScannerContext";

export const List = ({
  id,
  images,
  showMenu,
  showSearcher,
  refScrollImages,
  showNotResults,
  setShowSearcher,
}) => {
  const { handleMenu, searchNameImage } = useListImages();
  const { scanStop, scanFinished } = useScanner();

  return (
    <ul className={stylesListImages.ulImagesNotFound}>
      <div className={stylesListImages.containTitle}>
        <img
          id={id}
          className={
            images.length > 0 && (scanFinished || scanStop)
              ? stylesListImages.toolbarShow
              : stylesListImages.toolbarHide
          }
          onClick={() =>
            handleMenu(event, id == "menuListNotFound" ? "notFound" : "found")
          }
          src={iconToolbar}
        ></img>

        <div className={stylesListImages.title}>
          <span>
            {id == "menuListNotFound" ? "Images not found" : "Images found"}
          </span>
          <img src={id == "menuListNotFound" ? iconNotFound : iconFound}></img>
        </div>
      </div>
      {showMenu && images.length > 0 ? (
        <MenuListImages
          option={id == "menuListNotFound" ? "listNotFound" : "listFound"}
          images={images}
        />
      ) : (
        ""
      )}

      <div
        className={
          !showSearcher
            ? stylesListImages.containSearchHide
            : stylesListImages.containSearchShow
        }
      >
        <input
          onKeyUp={() => searchNameImage(event, refScrollImages)}
          placeholder="Enter name image"
        ></input>
        <img onClick={() => setShowSearcher(false)} src={iconClose}></img>
      </div>
      <div
        ref={refScrollImages}
        data-scroll={
          id == "menuListNotFound" ? "scrollNotFound" : "scrollFound"
        }
        className={stylesListImages.scroll}
      >
        {images.length > 0 ? (
          images.map((nameImage, index) => (
            <li key={index}>
              <div className={stylesListImages.rowOne}>
                <img src={image}></img>
                <span>{nameImage}</span>
              </div>
              <img
                src={id == "menuListNotFound" ? iconIncorrect : iconCorrect}
              ></img>
            </li>
          ))
        ) : (
          <NotFoundImages />
        )}

        {showNotResults ? <NotFoundImages /> : ""}
      </div>
    </ul>
  );
};
