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
            <img src={"https://i.imgur.com/T9Pd7dE.jpg"} alt="error" />
            <h2>This content isn't available right now</h2>
            <h3>When this happens, it's usually because you tried to manually input,</h3>
            <h3>A route that doesn't exist. Don't try that again, you SHMUCK!</h3>
            <button style={{backgroundColor: "#227DF2", color: 'white'}} onClick={redirect}>Go to News Feed</button>
        </div>
    )
}


export default NonExistent;
