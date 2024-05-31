import { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(../Image/LoginImage.jpg);
    margin-top: 0;
`

const Wrapper = styled.div`
    padding: 20px;
    width: 30%;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: white;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 15px;
    font-size: 15px;
    background-color: #343434;
    color: white;
    border: none;
    border-radius: 30px;

    &:focus{
        outline: none;
    }

`

const Button = styled.button`
    width: 40%;
    border: none;
    border-radius: 5px;
    padding: 15px 20px;
    background-color: #343434;
    color: white;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
    margin-left: 105px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5), 0 6px 20px 0 rgba(0,0,0,0.19);

    &:hover{
        background-color: #212121;
        color: white;
        transform: scale(1.05);
        border: solid 0.8px white;
    }
`
const Text = styled.p`
    color: white;
    font-size: 15px;

`

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://movie-library-server-nine.vercel.app/api/auth/login', {email, password});
            localStorage.setItem('accessToken', res.data.accessToken);
            console.log(res);
            navigate('/home')
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title> LOGIN </Title>
                <Form onSubmit={handleSubmit}>
                    <Input 
                        placeholder = "Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input 
                        placeholder = "Password" 
                        type = "password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit">LOGIN</Button>
                </Form>
            </Wrapper>
            <Text>Don't have an account ? 
                <a href="/signup" style={{color:'Red', textDecoration:"none", marginLeft:"5px"}}>SignUp</a></Text>
        </Container>
    )
}
