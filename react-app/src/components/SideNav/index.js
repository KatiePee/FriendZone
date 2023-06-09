import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./sidenav.css"


export default function SideNav() {
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  return (
    <div className="sidenav__container">
      <button onClick={() => history.push(`/home`)} className="sidenav__user">
        <i className="fas fa-home" style={{color: "#0571ed"}}></i>
        <p>Home</p>
      </button>
      <button onClick={() => history.push(`/users/${user.id}`)} className="sidenav__user">
        <i className="fas fa-user-circle"></i>
        <p>Profile</p>
      </button>
      <button onClick={() => history.push(`/radio`)} className="sidenav__user">
        <i className="fab fa-spotify" style={{color: "#1DD05D"}}></i>
        <p>Radio</p>
      </button>

    </div>
  )
}
