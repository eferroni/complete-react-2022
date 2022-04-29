import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./sign-in-form.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";
import Spinner from "../spinner/spinner.component";
import { selectUserIsLoading } from "../../store/user/user.selector";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(emailSignInStart(email, password));
    resetFormFields();
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
};

export default SignInForm;
