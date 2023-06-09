import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import "./nonExistentPage.css"


function NonExistent() {
  const user = useSelector(state => state.session.user)
  const history = useHistory()

    const redirect = async (e) => {
        history.push(user ? "/home" : "/")
        return
    }

    return (
        <div className="error-page">
            <img src={"https://i.imgur.com/5xRrzf6.png"} alt="error" />
            <h2 className="not-avail">This content isn't available right now</h2>
            <h3>When this happens, it's usually because you tried to manually input</h3>
            <h3>a route that doesn't exist or the page does not exist</h3>
            <h3>or.... you just don't want to get friendzoned.</h3>
            <div className="button-class">
                <button className="go-back" onClick={redirect}>Go Back</button>
            </div>
        </div>
    )
}


export default NonExistent;
