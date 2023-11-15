import axios from "axios";
import React, { useState } from "react";
//import { useDispatch } from "react-redux";
import styled from "styled-components";
//import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
//import { auth, provider } from "../firebase";
//import { signInWithPopup } from "firebase/auth";
//import { async } from "@firebase/util";
import { useNavigate, Link } from "react-router-dom";
import { lightBlue } from "@mui/material/colors";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  gap: 10px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  color: azure;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
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



const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const dispatch = useDispatch();
  const navigate = useNavigate()

  /*const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { name, password });
      dispatch(loginSuccess(res.data));
      navigate("/")
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
            navigate("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };*/

  //TODO: REGISTER FUNCTIONALITY


  return (
    <Container>
      <Wrapper>
        <Title>Sign in With</Title>
        <Button>Google</Button>
        <Title>or</Title>
        <Input placeholder="username" />
        <Input type="password" placeholder="password" />
        <Button>Sign in</Button>
        <More>
          <Link to="/signup"
          sx={{color: "lightBlue"}}>Create Account</Link>
        </More>
      </Wrapper>
    
    {/*  <Container>
      <Wrapper>
        <Title>Sign in With</Title>
        <Button >Google</Button>
        <Title>or</Title>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Sign in</Button>
        <Link to="/signup">Create Account</Link>
      </Wrapper>
    </Container>*/}
  </Container>
  

    
    
  );
};

export default SignIn;