import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loginUser } from "../../redux/reducer";

// import './styles/Login.css'

class Login extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      faceRec: false,
      isAdmin: false,
      newUser: false,
    };
  }

  register = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      isAdmin,
      faceRec,
    } = this.state;
    axios
      .post("/auth/register", {
        email,
        password,
        firstName,
        lastName,
        faceRec,
        isAdmin,
      })
      .then((res) => {
        loginUser(res);
        this.props.history.push("/photos");
      })
      .catch((err) => {
        console.log(err);
        alert("User already exists");
      });
  };

  login = () => {
    const { email, password } = this.state;
    axios
      .post("/auth/login", { email, password })
      .then((res) => {
        this.props.loginUser(res);
        console.log(res.data);
        if (res.data.faceRec) {this.props.history.push("/faceVerify");} else {this.props.history.push("/dashboard");}
      })
      .catch((err) => {
        console.log(err);
        alert("Incorrect email or password");
      });
  };

  toggleReg = () => {
    this.setState({ newUser: !this.state.newUser });
  };

  toggleFaceRec = () => {
    this.setState({ faceRec: !this.state.faceRec });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { firstName, lastName, email, password } = this.state;
    return (
      <div className="auth__component">
        {!this.state.newUser ? (
          <div className="login--container">
            <h1 className="login__title">WELCOME</h1>
            <div id="login__input__section">
              <input
                className="login__input"
                name="email"
                type="text"
                value={email}
                placeholder="EMAIL"
                onChange={(e) => this.changeHandler(e)}
              />
              <input
                className="login__input"
                name="password"
                type="password"
                value={password}
                placeholder="PASSWORD"
                onChange={(e) => this.changeHandler(e)}
              />
            </div>
            <div id="login__buttons">
              <button className="login__button" onClick={this.login}>
                LOGIN
              </button>
              <button className="login__button" onClick={this.toggleReg}>
                REGISTER
              </button>
            </div>
          </div>
        ) : (
          <div className="register--container">
            <h1 className="register__title">REGISTER</h1>
            <div id="register__input__section">
              <input
                className="register__input"
                name="firstName"
                type="text"
                value={firstName}
                placeholder="FIRST NAME"
                onChange={(e) => this.changeHandler(e)}
              />
              <input
                className="register__input"
                name="lastName"
                type="text"
                value={lastName}
                placeholder="LAST NAME"
                onChange={(e) => this.changeHandler(e)}
              />
              <input
                className="register__input"
                name="email"
                type="text"
                value={email}
                placeholder="EMAIL"
                onChange={(e) => this.changeHandler(e)}
              />
              <input
                className="register__input"
                name="password"
                type="password"
                value={password}
                placeholder="PASSWORD"
                onChange={(e) => this.changeHandler(e)}
              />
            </div>
            <div id="register__buttons">
              <button
                className="two__factor__button"
                onClick={this.toggleFaceRec}
              >
                Two factor authentication
              </button>
              <div className="register__buttons__main">
                <button className="register__button" onClick={this.register}>
                  REGISTER
                </button>
                <button className="register__button" onClick={this.toggleReg}>
                  BACK TO LOGIN
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { loginUser })(Login);
