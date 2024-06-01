import styled from "styled-components";
import React, { useState } from 'react';
import CloseIcon from "@mui/icons-material/Close";

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

const Popup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60vw;
    height: 60vh;
    transform: translate(-50%, -50%);
    background: #212121;
    color: black;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    z-index: 1000;
`

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`

const Full = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Div2 = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Div3 = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const Title = styled.h2`
  color: white;
`
const Para = styled.p`
  color: white;
  margin-top: 0;
`

const Icon = styled.div`
    color: white;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
`

const PosterDiv = styled.div`
`

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Image1 = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 50%;
`

export default function ListedMovie({ movie, accessToken }) {
    const [showPopup, setShowPopup] = useState(false);
    const [movieDetails, setMovieDetails] = useState(null);

    const apiKey = process.env.REACT_APP_OMDB_API_KEY;
    if (!apiKey) {
      console.error("OMDB API key is missing.");
      return;
  }

    const fetchMovieDetails = async () => {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`);
        const data = await response.json();
        setMovieDetails(data);
        setShowPopup(true);
    };

    return (
        <Container>
            <Wrapper>
                <Div1 onClick={fetchMovieDetails}>
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

            {showPopup && (
                <>
                    <Overlay onClick={() => setShowPopup(false)} />
                    <Popup>
                        {movieDetails ? (
                            <>
                            <Full>
                            <Icon>
                              <CloseIcon onClick={() => setShowPopup(false)}/>
                            </Icon>
                            <Title>{movieDetails.Title}</Title>
                            <Wrapper1>
                            <Div2>
                                <Para><strong>Year:</strong> {movieDetails.Year}</Para>
                                <Para><strong>Rated:</strong> {movieDetails.Rated}</Para>
                                <Para><strong>Released:</strong> {movieDetails.Released}</Para>
                                <Para><strong>Runtime:</strong> {movieDetails.Runtime}</Para>
                                <Para><strong>Genre:</strong> {movieDetails.Genre}</Para>
                                <Para><strong>Writer:</strong> {movieDetails.Writer}</Para>
                                <Para><strong>Director:</strong> {movieDetails.Director}</Para>
                                <Para><strong>IMDB Rating:</strong> {movieDetails.imdbRating}</Para>
                                <Para><strong>BoxOffice:</strong> {movieDetails.BoxOffice}</Para>
                              </Div2>

                              <Div3>
                                <Para><strong>Actors:</strong> {movieDetails.Actors}</Para>
                                <Para><strong>Plot:</strong> {movieDetails.Plot}</Para>
                                <Para><strong>Language:</strong> {movieDetails.Language}</Para>
                                <Para><strong>Country:</strong> {movieDetails.Country}</Para>
                                <Para><strong>Awards:</strong> {movieDetails.Awards}</Para>
                                
                              </Div3>
                              <PosterDiv>
                                <Image1 src={movie.Poster} />
                              </PosterDiv>
                            </Wrapper1>
                              
                            </Full>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </Popup>
                </>
            )}
        </Container>
    )
}
