import JSZip from "jszip";
import { saveAs } from "file-saver";

export const generateFolderImages = async (namesImages, uploadedImages) => {
  let imagesFile = uploadedImages.filter((uploadedImage) => {
    let foundImage = namesImages.find((name) => name == uploadedImage.name);
    if (foundImage) return uploadedImage;
  });

  const zip = new JSZip();
  let imgFolder = zip.folder("imagesFound");

  for (const imageFile of imagesFile) {
    let base64Image = await convertFileToBase64(imageFile);

    base64Image = base64Image.substring(
      base64Image.indexOf(",") + 1,
      base64Image.length
    );
    imgFolder.file(imageFile.name, base64Image, { base64: true });
  }

  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "imagesFound.zip");
  });
};

const convertFileToBase64 = async (file) => {
  let reader = new FileReader();

  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
  });
};
