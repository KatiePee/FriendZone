import { useHistory } from "react-router-dom"
import "./nonExistentPage.css"

function NonExistent() {
    const history = useHistory()

    const redirect = async (e) => {
        history.push('/home')
        return
    }



    return (
        <div className="error-page">
            <h1>INSERT A LOCK IMAGE HERE</h1>
            <h2>This content isn't available right now</h2>
            <h3>When this happens, it's usually because you tried to manually input,</h3>
            <h3>A route that doesn't exist. Don't try that again, you SHMUCK!</h3>
            <button onClick={redirect}>Go to News Feed</button>
        </div>
    )
}


export default NonExistent;
