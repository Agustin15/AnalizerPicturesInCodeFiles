import notImages from "../../../assets/images/noImages.png";
import stylesListImages from "../ListImages.module.css";

export const NotFoundImages = () => {
  return (
    <div className={stylesListImages.notFoundImages}>
      <img src={notImages}></img>
      <h4>Not images</h4>
    </div>
  );
};
