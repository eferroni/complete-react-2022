import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  signInWithGooglePopup,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signInUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("response: ", response);
        resetFormFields();
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/wrong-password":
            alert("Wrong Password");
            break;
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/invalid-email":
            alert("Invalid email");
            break;

          default:
            alert(error.message);
            break;
        }
      });
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="text"
          required
          value={email}
          name="email"
          onChange={handleChange}
        />
        <FormInput
          label="password"
          type="password"
          required
          value={password}
          name="password"
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>
            Sign in
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
