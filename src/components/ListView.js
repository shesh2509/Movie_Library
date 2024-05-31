import styled from "styled-components";
import ListedMovie from "./ListedMovie";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-image: url(../Image/back2.jpg);
`;

const Loading = styled.div`
    color: white;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`;

const Title = styled.h1`
    width: 100%;
    text-align: center;
    color: white;
    margin-top: 20px;
`;

export default function ListView() {
    const { id } = useParams();
    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            try {
                // const res = await axios.get(`http://localhost:5000/api/movielists/${id}`);
                const res = await axios.get(`https://movie-library-server-nine.vercel.app/api/movielists/${id}`);
                setList(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchList();
    }, [id]);

    useEffect(() => {
        if (list && list.movies && list.movies.length > 0) {
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

            fetchMovieDetails();
        }
    }, [list]);

    if (loading) {
        return <Loading>Loading...</Loading>;
    }

    if (!list) {
        return <Loading>List not found</Loading>;
    }

    return (
        <Container>
            <Title>{list.name.toUpperCase()}</Title>
            {movieDetails.map((movie) => (
                <ListedMovie
                    movie={movie}
                    key={movie.imdbID}
                />
            ))}
        </Container>
    );
}
