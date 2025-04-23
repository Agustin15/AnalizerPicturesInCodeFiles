import styleHeader from "./Header.module.css";
import icon from "../../assets/images/iconSearching.png";

export const Header = () => {
  return (
    
    <header className={styleHeader.header}>
      <h3>Search images in code files</h3>
      <img src={icon}></img>
    </header>
  );
};
