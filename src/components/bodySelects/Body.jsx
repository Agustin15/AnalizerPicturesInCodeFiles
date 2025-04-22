import stylesBody from "./Body.module.css";
import iconFiles from "../../assets/images/iconFiles.png";
import iconImages from "../../assets/images/iconImages.png";
import iconScanner from "../../assets/images/iconSearching.png";
import SearchingScan from "../../assets/images/searchingScann.png";
import iconClear from "../../assets/images/clear.png";
import iconStop from "../../assets/images/stop.png";
import gifSearching from "../../assets/images/gifSearching.gif";

import { Header } from "../header/Header";
import { ContainSelect } from "../containSelect/ContainSelect";
import { ListImages } from "../listImages/ListImages";
import { useScanner } from "../../contexts/ScannerContext";
import { useEffect, useState } from "react";
export const Body = () => {
  const {
    uploadedFiles,
    uploadedImages,
    handleScanner,
    numberLoading,
    numberBarLoading,
    loader,
    clear,
    scanFinished,
    scanStop
  } = useScanner();

  const [btnScannState, setBtnScannState] = useState(false);

  useEffect(() => {
  
    if (uploadedFiles.length > 0 && uploadedImages.length > 0) {
      setBtnScannState(true);
    } else {
      setBtnScannState(false);
    }
  }, [uploadedImages, uploadedFiles]);

  useEffect(() => {
    if (scanFinished) {
      setBtnScannState(false);
    }
  }, [scanFinished]);

  const displayLinesBar = () => {
    let lineasBar = [];
    for (let f = 0; f < 8; f++) {
      lineasBar.push(
        <li
          className={
            f < numberBarLoading
              ? stylesBody.lineBarComplete
              : stylesBody.lineBarIncomplete
          }
          key={"line" + f}
        ></li>
      );
    }
    return lineasBar;
  };

  return (
    <>
      <Header></Header>
      <div className={stylesBody.contain}>
        <div className={stylesBody.containSelects}>
          <ContainSelect
            icon={iconImages}
            textButton={"Upload images"}
            id={"loadImages"}
            idIconUploaded={"iconImagesUploaded"}
          ></ContainSelect>

          <div id="containLoading" className={stylesBody.containLoading}>
            <img
              width={loader ? "109px" : "85px"}
              src={loader ? gifSearching : SearchingScan}
            ></img>

            <div className={stylesBody.containBar}>
              <div className={stylesBody.containNumberLoading}></div>
              <div
                id="bar"
                className={
                  loader || scanFinished
                    ? stylesBody.barShow
                    : stylesBody.barEmpty
                }
              >
                {displayLinesBar()}
              </div>
            </div>
            <span>
              {numberLoading < 100 && !scanStop
                ? numberLoading + "%"
                : numberLoading == 100
                ? "search finished"
                : ""}
              {scanStop ? "search cancel" : ""}
            </span>

            <button
              id="btnScann"
              disabled={
                uploadedFiles.length == 0 ||
                uploadedImages.length == 0 ||
                scanFinished
                  ? true
                  : false
              }
              className={
                btnScannState
                  ? stylesBody.btnSearch
                  : stylesBody.btnSearchDisabled
              }
              onClick={handleScanner}
            >
              <img src={loader ? iconStop : iconScanner}></img>
              {loader ? "Stop search" : "Start search"}
            </button>
          </div>

          <ContainSelect
            icon={iconFiles}
            textButton={"Upload files"}
            id={"loadFiles"}
            idIconUploaded={"iconFilesUploaded"}
          ></ContainSelect>
        </div>

        {(scanFinished || scanStop) && !loader ? (
          <button onClick={clear} className={stylesBody.btnClear}>
            Clear
            <img src={iconClear}></img>
          </button>
        ) : (
          ""
        )}
        <ListImages />
      </div>
    </>
  );
};
