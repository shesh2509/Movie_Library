import styled from "styled-components";
import React from 'react';

const Container = styled.div`
    position: relative;
`
const Wrapper = styled.div`
    padding: 20px;
    display: flex;
`

const Div1 = styled.div`
    height: 330px;
    width: 250px;
    background-color: #212121;
    border-radius: 15px;
    cursor: pointer;
    color:white;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 10px 6px 20px 0px rgba(0,0,0,0.5);
    &:hover {
        background-color: #343434;
        transform: scale(1.05);
        border: solid white 0.8px;
    }
`

const Image = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    position: absolute;
    margin-top: 25px;
    margin-left: 50px;
`

const Ddiv = styled.div`
    width: 250px;
    margin-top: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

`

const Name = styled.p`
    margin-bottom: 0;
    margin-top: 0;
`
const Name1 = styled.p`
    margin-bottom: 0;
    font-weight: bold;
`

export default function ListedMovie({movie, accessToken}) {

  return (
    <Container>
      <Wrapper>
        <Div1>
          <Image src={movie.Poster} />
          <Ddiv>
            <Name1>{movie.Title.toUpperCase()} <br /></Name1>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Name>Year: {movie.Year}</Name>
              <Name>Type: {movie.Type.toUpperCase()}</Name>
              <Name>imdbID: {movie.imdbID}</Name>
            </div>
          </Ddiv>
        </Div1>
      </Wrapper>
    </Container>
    )
}

