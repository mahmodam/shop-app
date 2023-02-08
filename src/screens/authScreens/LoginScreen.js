import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { Button, Row, Col, Card } from "react-bootstrap";

import Message from "../../components/Message";
import Loader from "../../components/Loader";

import { login } from "../../actions/userActions";

import "./auth.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginScreen = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  //const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    // if (userInfo) {
    //   window.location.href = "/";
    // }

    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    //console.log(values);
    dispatch(login(values.email, values.password));
    resetForm();
    setSubmitting(false);
  };

  return (
    <>
      <Card className="login-card text-center">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form>
              <Row className="justify-content-md-center">
                <Col>
                  <h1>Sign In</h1>
                  {error && <Message variant="danger">{error}</Message>}

                  {loading && <Loader />}
                  {/* <Form.Group controlId="email"> */}
                  <div className="form-group">
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
                  </div>

                  <div className="form-group">
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
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                  <Row className="py-3">
                    <Col>
                      New Customer? <Link to="/register">Register</Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default LoginScreen;
