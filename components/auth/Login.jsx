"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { auth } from "./../../firebase/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const adminLogin = async (e) => {
    e.preventDefault();
    const result = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div className="login-container">
      <Image
        src="https://res.cloudinary.com/dkibnftac/image/upload/v1693452538/pexels-photo-3879495_eatfw0.webp"
        alt="login_img"
        height={1000}
        width={1000}
        quality={100}
      />

      <form onSubmit={adminLogin}>
        <h3>Admin Login</h3>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">*</InputGroup.Text>
          <Form.Control
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Login;
