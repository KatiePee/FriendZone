import { useHistory } from "react-router-dom"


function NonExistent() {
    const history = useHistory()

    const redirect = async (e) => {
        history.push('/home')
        return
    }



    return (
        <div>
            <img src={"https://i.imgur.com/T9Pd7dE.jpg"} />
            <h2>This content isn't available right now</h2>
            <br><h3>When this happens, it's usually because you tried to manually input,</h3></br>
            <br><h3>A route that doesn't exist. Don't try that again, you SMUCK!</h3></br>
            <button onClick={redirect}>Go to News Feed</button>
        </div>
    )
}


export default NonExistent;
