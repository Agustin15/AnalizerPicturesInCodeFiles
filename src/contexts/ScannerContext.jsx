import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const ScannerContext = createContext();

export const ScannerProvider = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imagesInFiles, setImagesInFiles] = useState([]);
  const [imagesNotInFiles, setImagesNotInFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [numberLoading, setNumberLoading] = useState(0);
  const [numberBarLoading, setNumberBarLoading] = useState(0);
  const [loader, setLoader] = useState(false);
  const [scanFinished, setScanFinsihed] = useState(false);
  const [scanStop, setScanStop] = useState(false);

  const handleScanner = async (event) => {
    if (event.target.textContent.indexOf("Start") > -1) {
      let namesImages = [...uploadedImages].map((imageData) => imageData.name);

      let contentsFiles = await Promise.all(
        [...uploadedFiles].map(async (file) => {
          let contentFile = await readContentFile(file);
          return {
            contentFile: contentFile
          };
        })
      );

      setLoader(true);
      scann(namesImages, contentsFiles);
    } else {
      setLoader(false);
      setScanStop(true);
    }
  };

  useEffect(() => {
    if (numberLoading == 100) {
      setLoader(false);
      setScanFinsihed(true);
    }
    setNumberBarLoading(Math.ceil((numberLoading * 8) / 100));
  }, [numberLoading]);

  useEffect(() => {
    if (uploadedImages.length > 0) {
      let percentaje =
        ((imagesInFiles.length + imagesNotInFiles.length) * 100) /
        uploadedImages.length;
      setNumberLoading(Math.ceil(percentaje));
    }
  }, [imagesInFiles, imagesNotInFiles]);


  const readContentFile = async (file) => {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsText(file);
      reader.addEventListener("load", () => {
        resolve(reader.result);
      });
    });
  };

  const delay = async () => {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve(true);
      }, 700);
    });
  };

  const getBtnState = async () => {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve(document.getElementById("btnScann").textContent);
      }, 1000);
    });
  };

  const scann = async (namesImages, contentsFiles) => {
    let index = 0;
    for (const nameImage of namesImages) {
      index++;
      let quantityImageNotFound = 0;

      let btnState = await getBtnState();

      if (btnState == "Start search") {
        break;
      }

      for (const contentFile of contentsFiles) {
        if (contentFile.contentFile.indexOf(nameImage) > -1) {
          if (!imagesInFiles.find((image) => image == nameImage)) {
            await delay();
            setImagesInFiles((imagesInFiles) => [...imagesInFiles, nameImage]);
          }
          break;
        } else {
          quantityImageNotFound++;
        }
      }

      if (quantityImageNotFound == contentsFiles.length) {
        await delay();
        setImagesNotInFiles((imagesNotInFiles) => [
          ...imagesNotInFiles,
          nameImage
        ]);
      }
    }
  };

  const clear = () => {
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    setLoader(false);
    setImagesInFiles([]);
    setImagesNotInFiles([]);
    setUploadedFiles([]);
    setUploadedImages([]);
    setNumberLoading(0);
    setScanFinsihed(false);
    setScanStop(false);
  };

  return (
    <ScannerContext.Provider
      value={{
        uploadedFiles,
        setUploadedFiles,
        uploadedImages,
        setUploadedImages,
        imagesInFiles,
        imagesNotInFiles,
        handleScanner,
        numberLoading,
        numberBarLoading,
        loader,
        setLoader,
        clear,
        scanFinished,
        scanStop
      }}
    >
      {children}
    </ScannerContext.Provider>
  );
};

export const useScanner = () => useContext(ScannerContext);
