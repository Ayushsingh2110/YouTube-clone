import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { lightBlue } from "@mui/material/colors";
import { postToServer } from "../utils/fetchFromAPI";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
//import { async } from "@firebase/util";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await postToServer("auth/signin", {email, password} );
      console.log(res)
      dispatch(loginSuccess(res));
      
      navigate("/")
    } catch (err) {
      console.log("error from signin.jsx");
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
        postToServer("auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            profileImg: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res));
            navigate("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  //TODO: REGISTER FUNCTIONALITY


  return (
    <Container>
      <Wrapper>
        <Title>Sign in With</Title>
        <Button onClick={signInWithGoogle}>Google</Button>
        <Title>or</Title>
         {/*Email*/}
         <Input type="text" placeholder="Email" 
        onChange={e => setEmail(e.target.value)}/>

        {/*Password*/}
        <Input type="password" placeholder="Password" 
        onChange={e => setPassword(e.target.value)}/>

        <Button onClick={userLogin}>Sign in</Button>
        <More>
          <Link to="/signup"
          sx={{color: "lightBlue"}}>Create Account</Link>
        </More>
      </Wrapper>
    
  </Container>
    
  );
};

export default SignIn;