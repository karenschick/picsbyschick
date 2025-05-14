import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Form, Button, Modal } from "react-bootstrap"; // Import form and modal components from React Bootstrap

// Functional component for the contact form
function ContactForm({ onClose }) {
  // useForm to manage form field values
  const [state, handleSubmit] = useForm("manolnzl");

  if (state.succeeded) {
    return (
      <div className="text-center p-3">
        <h5>Thank you for your message!</h5>
        <Button variant="secondar" onClick={onClose}></Button>
      </div>
    );
  }
  return (
    <>
      {/* Contact form layout using Bootstrap */}
      <Form onSubmit={handleSubmit}>
        {/* Name field */}
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter full name"
            required
          ></Form.Control>
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </Form.Group>

        {/* Email field */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email address"
            required
          ></Form.Control>
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </Form.Group>

        {/* Message field */}
        <Form.Group className="mb-3" controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="textarea"
            name="message"
            placeholder="Enter message"
            rows={4}
            required
          ></Form.Control>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </Form.Group>

        {/* Submit and Close buttons */}
        <div className="d-flex justify-content-center">
          <Button
            className="m-4"
            variant="secondary"
            type="submit"
            disabled={state.submitting}
          >
            Submit
          </Button>
          <Button className="m-4" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </Form>
    </>
  );
}

export default ContactForm;
