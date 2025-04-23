import stylesContainSelect from "./ContainSelect.module.css";
import iconUpload from "../../assets/images/iconUpload.png";
import uploaded from "../../assets/images/uploaded.png";
import notUploaded from "../../assets/images/notUploaded.png";
import { useEffect } from "react";
import { useScanner } from "../../contexts/ScannerContext";

export const ContainSelect = ({ icon, textButton, id, idIconUploaded }) => {
  const { uploadedFiles, setUploadedFiles, uploadedImages, setUploadedImages } =
    useScanner();

  useEffect(function () {
    if (uploadedFiles.length > 0) {
      document.getElementById("iconFilesUploaded").src = uploaded;
    } else {
      document.getElementById("iconFilesUploaded").src = notUploaded;
    }
  });

  useEffect(
    function () {
      if (uploadedImages.length > 0) {
        document.getElementById("iconImagesUploaded").src = uploaded;
      } else {
        document.getElementById("iconImagesUploaded").src = notUploaded;
      }
    },
    [uploadedImages]
  );

  const handleInputFile = (event) => {
    let inputFile = event.target;

    if (inputFile.files.length > 0) {
      if (inputFile.id == "loadFiles") {
        setUploadedFiles([...uploadedFiles, ...inputFile.files]);
      }

      if (inputFile.id == "loadImages") {
        setUploadedImages([...uploadedImages, ...inputFile.files]);
      }
    }
  };
  return (
    <div className={stylesContainSelect.containSelect}>
      <img src={icon}></img>
      <label htmlFor={id}>
        <div className={stylesContainSelect.button}>
          <img
            className={stylesContainSelect.iconUpload}
            src={iconUpload}
          ></img>
          {textButton}
        </div>
      </label>

      <input
        onChange={handleInputFile}
        id={id}
        type="file"
        accept={
          id == "loadFiles"
            ? ".txt,.css,.js,.jsx,.jsx.,.html,.php,.py,.cs,.jar"
            : "image/*"
        }
        multiple
      ></input>

      <div className={stylesContainSelect.uploaded}>
        <span>
          Cargado:
          {id == "loadFiles" ? uploadedFiles.length : uploadedImages.length}
        </span>
        <img id={idIconUploaded}></img>
      </div>
    </div>
  );
};
