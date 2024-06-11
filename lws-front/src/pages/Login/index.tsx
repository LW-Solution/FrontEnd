import "./style.scss";
import lwlogo from "../../assets/images/LW_logo_w_light.png";
import { useNavigate } from "react-router-dom";

export default function Portal() {

    const navigate = useNavigate();
    const entrar = () => {
        navigate("/admin");    
    }
    
  return (
    <div className="login">
      <div className="loginCard">
        <img src={lwlogo} onClick={entrar} alt="LW Logo" />        
      </div>
    </div>
  );
}
