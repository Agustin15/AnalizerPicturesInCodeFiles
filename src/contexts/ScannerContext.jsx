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
      setLoader(true);
      setScanStop(true);
    }
  };

  useEffect(() => {
    if (numberLoading == 100) {
      setLoader(false);
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

  const scann = async (namesImages, contentsFiles) => {
    let index = 0;
    for (const nameImage of namesImages) {
      index++;
      let quantityImageNotFound = 0;

      if (scanStop) {
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

      if (index == namesImages.length - 1) setScanFinsihed(true);
    }
  };

  const clear = () => {
    setLoader(false);
    setImagesInFiles([]);
    setImagesNotInFiles([]);
    setUploadedFiles([]);
    setUploadedImages([]);
    setNumberLoading(0);
    setScanFinsihed(false);
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
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
