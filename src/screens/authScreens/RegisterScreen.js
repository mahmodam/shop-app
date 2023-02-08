import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { Button, Row, Col, Card } from "react-bootstrap";

import Message from "../../components/Message";
import Loader from "../../components/Loader";

import { register } from "../../actions/userActions";

import "./auth.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Password is too short - should be 5 chars minimum.")
    .required("Required"),
  confirmPassword: Yup.string()
    .min(5, "Password is too short - should be 5 chars minimum")
    .required("Required"),
});

const RegisterScreen = () => {
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    if (values.password !== values.confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(values.name, values.email, values.password));
      resetForm();
      setSubmitting(false);
    }
  };

  return (
    <>
      <Card className="login-card text-center">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form>
              <h1>Sign Up</h1>
              {error && <Message variant="danger">{error}</Message>}
              {message && <Message variant="danger">{message}</Message>}
              {loading && <Loader />}
              <Row className="mb-3">
                <Col>
                  <label>Name</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    className="form-control"
                  />
                  <ErrorMessage className="error" name="name" component="div" />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <label>Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <label>Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <label>Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  Have an Account? <Link to="/login">Login</Link>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default RegisterScreen;
