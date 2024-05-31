import styled from "styled-components";
import LockIcon from '@mui/icons-material/Lock';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from "react";
import axios from "axios";
import ListedMovie from "./ListedMovie";

const Container = styled.div`
    position: relative;
`
const Wrapper = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Div1 = styled.div`
    height: 80px;
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #212121;
    border-radius: 15px;
    cursor: pointer;
    color: white;
    box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.5), 10px 6px 20px 0px rgba(0,0,0,0.5);
`

const ListName = styled.h2`
    color: white;
`

const Icon = styled.div`
    color: white;
    height: 50%;
    margin-left: 20px;
    display: flex;
    align-items: center;
`

export default function ListComponent({ list, accessToken }) {

    const [movieDetails, setMovieDetails] = useState([]);

    const fetchMovieDetails = async () => {
        const apiKey = process.env.REACT_APP_OMDB_API_KEY;
        if (!apiKey) {
          console.error("OMDB API key is missing.");
          return;
        }
    
        try {
          const movieDetailsPromises = list.movies.map(async (movie) => {
            const res = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`);
            return res.data;
          });
    
          const details = await Promise.all(movieDetailsPromises);
          setMovieDetails(details);
        } catch (err) {
          console.error(err);
        }
    };

    const handleClick = () => {
        fetchMovieDetails();
    };

    const handleShare = () => {
        const link = `${window.location.origin}/lists/${list._id}`;
        navigator.clipboard.writeText(link).then(() => {
          alert("Shareable link copied to clipboard!");
        }).catch((err) => {
          console.error('Failed to copy: ', err);
        });
    };

    return (
        <Container>
            <Wrapper>
                <Div1 onClick={handleClick}>
                    <ListName>{list.name.toUpperCase()}</ListName>
                    {!list.isPublic && (
                        <Icon>
                            <LockIcon />
                        </Icon>
                    )}

                    {list.isPublic && (
                        <Icon onClick={handleShare}>
                            <ShareIcon />
                        </Icon>
                    )}
                </Div1>
            </Wrapper>

            {movieDetails.map((movie) => (
                <ListedMovie
                    movie={movie}
                    key={movie.imdbID}
                    accessToken={accessToken}
                />
            ))}
        </Container>
    )
}
