import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Button, Row, Col, Card } from "react-bootstrap";

//import Message from "../components/Message";
//import Loader from "../components/Loader";

import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const validationSchema = Yup.object().shape({
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  postalCode: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
});

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  //const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    dispatch(saveShippingAddress(values));
    navigate("/payment");
    resetForm();
    setSubmitting(false);
  };

  return (
    <Row>
      <CheckoutSteps step1 step2 />

      <Col md={8}>
        <h1 className="text-center">Shipping</h1>
      </Col>
      <Col md={8}>
        <Formik
          initialValues={{
            address: shippingAddress.address,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country,
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form>
              <Card className="text-center p-3">
                <div className="form-group">
                  <label>Address</label>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <Field
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    className="form-control"
                  />
                  <ErrorMessage name="city" component="div" className="error" />
                </div>

                <div className="form-group">
                  <label>Postal Code</label>
                  <Field
                    type="text"
                    name="postalCode"
                    placeholder="Enter postal code"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="postalCode"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <Field
                    type="text"
                    name="country"
                    placeholder="Enter country"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="error"
                  />
                </div>

                <Button
                  className="mt-4"
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  Continue
                </Button>
              </Card>
            </Form>
          )}
        </Formik>
      </Col>
      <Col md={4}>
        <Card className="p-3">
          <h2>Order Summary</h2>
        </Card>
      </Col>
    </Row>
  );
};

export default ShippingScreen;
