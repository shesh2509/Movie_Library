import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchedMovie from "../components/SearchedMovie";
import ListComponent from "../components/ListComponent";
import { useNavigate } from "react-router-dom";
import { fetchLists } from '../api';

const Container = styled.div`
    position: relative;
`;

const Container1 = styled.div`
    width: 100vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(../Image/LoginImage.jpg);
    margin-top: 0;
`;

const LogoutButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #343434;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #212121;
    }
`;

const Wrapper = styled.div`
    padding: 20px;
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Text = styled.h1`
    color: white;
    font-size: 40px;
    font-weight: 600;
    text-transform: uppercase;
`;

const SearchBar = styled.div`
    background-color: #343434;
    border-radius: 30px;
    width: 500px;
    min-height: 50px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    flex: 1;
    padding: 0 20px;
    font-size: 20px;
    background-color: transparent;
    border: none;
    color: white;

    &:focus {
        outline: none;
    }
`;

const Icon = styled.div`
    background-color: #343434;
    color: white;
    padding: 0 25px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const MovieDetails = styled.div`
`;

const ListsDetails = styled.div`
    background-image: url(../Image/back2.jpg);
    margin-top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Wrapper1 = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-image: url(../Image/back2.jpg);
`;

const Wrapper2 = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-image: url(../Image/back2.jpg);
`;

export default function Home() {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [lists, setLists] = useState([]);
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');

    const handleSearch = async () => {
        const apiKey = process.env.REACT_APP_OMDB_API_KEY;
        if (!apiKey) {
            console.error("OMDB API key is missing.");
            return;
        }

        try {
            const res = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${search}`);
            console.log(res.data.Search);
            setMovies(res.data.Search || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchLists(accessToken);
                console.log(data);
                setLists(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [accessToken]);

    return (
        <Container>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            <Container1>
                <Wrapper>
                    <Text>Search Movies</Text>
                    <SearchBar>
                        <Input 
                            type='text'
                            placeholder="Search by Title..."
                            autoComplete="off"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <Icon>
                            <SearchIcon onClick={handleSearch} />
                        </Icon>
                    </SearchBar>
                </Wrapper>
            </Container1>

            <MovieDetails>
                <Wrapper1>
                    {movies.map((movie) => (
                        <SearchedMovie 
                            movie={movie}
                            key={movie.imdbID}
                            accessToken={accessToken}
                        />
                    ))}
                </Wrapper1>
            </MovieDetails>

            <ListsDetails>
                <div>
                    <h1 style={{ color: "white", marginTop: "0px" }}>Your Lists</h1>
                </div>

                <Wrapper2>
                    {lists.map((list) => (
                        <ListComponent 
                            list={list}
                            key={list._id}
                            accessToken={accessToken}
                        />
                    ))}
                </Wrapper2>
            </ListsDetails>
        </Container>
    );
}
