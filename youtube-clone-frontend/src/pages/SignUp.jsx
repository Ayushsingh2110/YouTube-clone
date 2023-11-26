import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
    color: ${({ theme }) => theme.text};
  `;

  const Title = styled.h1`
  font-size: 24px;
  color: azure;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

  const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.bgLighter};
    gap: 10px;
  `;

  const Input = styled.input`
    border: 1px solid azure;
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    width: 50vw;
    min-width: 250px;
    color: azure;
  `;

  const Button = styled.button`
    width: 50vw;
    min-width: 250px;
    max-width: 500px;
    border-radius: 2rem;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: red;
    color: azure;
  `;

  const More = styled.div`
    display: flex;
    margin-top: 10px;
    font-size: 12px;
    color: azure;
  `;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <Title>Sign in With</Title>
      <Form>
        {/*Name*/}
        <Input type="text" placeholder="Username" 
        onChange={e => setName(e.target.value)} />

        {/*Email*/}
        <Input type="text" placeholder="Email" 
        onChange={e => setEmail(e.target.value)}/>

        {/*Password*/}
        <Input type="password" placeholder="Password" 
        onChange={e => setPassword(e.target.value)}/>

        <Button>Sign up</Button>
      </Form>
      <Title>or</Title>
      <Button>Google</Button>
      <More>
        <Link to="/signin" sx={{ color: "lightBlue" }}>
          Sign In
        </Link>
      </More>
    </Container>
  );
};

export default SignUp;
