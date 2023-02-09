import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Button, Row, Col, Card } from "react-bootstrap";

//import Message from "../components/Message";
//import Loader from "../components/Loader";

import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const validationSchema = Yup.object().shape({
  paymentMethod: Yup.string().required("Required"),
});

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  //const [message, setMessage] = useState(null);

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    if (values.paymentMethod === "PayPal") {
      dispatch(savePaymentMethod(values.paymentMethod));
      navigate("/placeorder");
      resetForm();
      setSubmitting(false);
    } else {
      navigate("/stripe");
    }
  };

  return (
    <Row className="justify-content-md-center">
      <CheckoutSteps step1 step2 step3 />
      <Col sm={6}>
        <Formik
          initialValues={{
            paymentMethod: "PayPal",
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form>
              <h1 className="text-center">Payment Method</h1>
              <Card>
                <Card.Body>
                  <div className="form-group mb-3">
                    <h4 className="mb-3">Select Method</h4>
                    <Col className="form-control">
                      <Field
                        type="radio"
                        id="PayPal"
                        name="paymentMethod"
                        value="PayPal"
                        checked
                      />{" "}
                      <label htmlFor="PayPal">PayPal or Credit Card</label>
                    </Col>
                    <Col className="form-control">
                      <Field
                        type="radio"
                        id="Stripe"
                        name="paymentMethod"
                        value="Stripe"
                      />{" "}
                      <label htmlFor="Stripe">Stripe</label>
                    </Col>
                  </div>
                  <Button type="submit" variant="primary">
                    Continue
                  </Button>
                </Card.Body>
              </Card>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default PaymentScreen;
