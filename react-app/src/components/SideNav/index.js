import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./sidenav.css"


export default function SideNav() {
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  return (
    <div className="sidenav__container">
      <button onClick={() => history.push(`/home`)} className="sidenav__user">

        <p>Home</p>
      </button>
      <button onClick={() => history.push(`/users/${user.id}`)} className="sidenav__user">

        <p>Profile</p>
      </button>
      <button onClick={() => history.push(`/users/${user.id}`)} className="sidenav__user">

        <p>Radio</p>
      </button>

    </div>
  )
}
