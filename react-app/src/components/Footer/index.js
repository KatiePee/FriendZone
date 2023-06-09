import "./footer.css";
import aws from "../../assets/aws.png";
import css from "../../assets/css.png";
import html from "../../assets/html.png";
import postSQL from "../../assets/postgreSQL.png";
import python from "../../assets/python.png";
import flask from "../../assets/flask.png";
import reactpic from "../../assets/react.png";
import redux from "../../assets/redux.png";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="contributors-container">
          <div className="contributors">
            <div className="developers">
              <h3>Meet the Developers :</h3>
            </div>
            <div className="contributor-name">Adanna Liu</div>
            <div className="social-container">
              <a href="https://github.com/aliu7198">
                <img className="social" src="https://i.imgur.com/40XDjRy.png" />
              </a>
              <a href="https://www.linkedin.com/in/adanna-liu-7505161a5/">
                <img className="social" src="https://i.imgur.com/LdJxIp7.png" />
              </a>
            </div>
          </div>
          <h3>|</h3>
          <div className="contributors">
            <div className="contributor-name">Albert Kim</div>
            <div className="social-container">
              <a href="https://github.com/alberthskim">
                <img className="social" src="https://i.imgur.com/40XDjRy.png" />
              </a>
              <a href="https://www.linkedin.com/in/albertkim01/">
                <img className="social" src="https://i.imgur.com/LdJxIp7.png" />
              </a>
            </div>
          </div>
          <h3>|</h3>
          <div className="contributors">
            <div className="contributor-name">Katie Piele</div>
            <div className="social-container">
              <a href="https://github.com/KatiePee">
                <img className="social" src="https://i.imgur.com/40XDjRy.png" />
              </a>
              <a href="https://www.linkedin.com/in/katie-piele/">
                <img className="social" src="https://i.imgur.com/LdJxIp7.png" />
              </a>
            </div>
          </div>
          <h3>|</h3>
          <div className="contributors">
            <div className="contributor-name">PJ Singh</div>
            <div className="social-container">
              <a href="https://github.com/PjSingh22">
                <img className="social" src="https://i.imgur.com/40XDjRy.png" />
              </a>
              <a href="https://www.linkedin.com/in/prabhjot-singh-software-developer/">
                <img className="social" src="https://i.imgur.com/LdJxIp7.png" />
              </a>
            </div>
          </div>
        </div>

        <div className="used">
          <h3>Technology Used:</h3>
          <img className="tech" src={python} />
          <img className="tech" src={postSQL} />
          <img className="tech" src={flask} />
          <img className="tech" src={reactpic} />
          <img className="tech" src={redux} />
          <img className="tech" src={aws} />
          <img className="tech" src={css} />
          <img className="tech" src={html} />
        </div>
      </div>
    </>
  );
}

export default Footer;
