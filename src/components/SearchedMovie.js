import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { fetchLists, createList, addMovieToList } from '../api';
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

const Button = styled.button`
    width: 80%;
    border: none;
    border-radius: 5px;
    padding: 5px 8px;
    background-color: #343434;
    color: white;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5), 0 6px 20px 0 rgba(0,0,0,0.19);

    &:hover{
        background-color: #212121;
        color: white;
        transform: scale(1.05);
        border: solid 0.8px white;
    }
`

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const PopupContent = styled.div`
  background: #212121;
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const ListItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  background:  #343434;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
    margin-right: 20px;
`

const Button1 = styled.button`
    width: 50%;
    border: none;
    border-radius: 5px;
    padding: 8px 10px;
    background-color: #343434;
    color: white;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    margin-top: 10px;
    align-items: center;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5), 0 6px 20px 0 rgba(0,0,0,0.19);

    &:hover{
        background-color: #212121;
        color: white;
        transform: scale(1.05);
        border: solid 0.8px white;
    }
`;

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
const Icon = styled.div`
    color: white;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
`



function Popup({ lists, onClose, onAddToList, accessToken, movie }) {
    const [newListName, setNewListName] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [selectedLists, setSelectedLists] = useState({});
  
    const handleCreateList = async () => {
      if (newListName.trim()) {
        const newList = await createList(newListName, isPublic, accessToken);
        if (newList) {
          await onAddToList(newList._id);
          setSelectedLists((prev) => ({
            ...prev,
            [newList._id]: true,
          }));
          window.location.reload();
        }
        setNewListName('');
        setIsPublic(true);
      }
    };
  
    const handleCheckboxChange = (listId) => {
      setSelectedLists((prev) => ({
        ...prev,
        [listId]: !prev[listId],
      }));
    };
  
    const handleAddToList = async () => {
      try {
        for (const listId of Object.keys(selectedLists)) {
            if (selectedLists[listId]) {
                await addMovieToList(listId, movie, accessToken);
            }
        }
        onClose();
        window.location.reload();
    } catch (error) {
        console.error('handleAddToList Error:', error.message);
    }
    };
  
    return (
      <PopupContainer>
        <PopupContent>
          <Icon>
            <CloseIcon onClick={onClose}/>
          </Icon>
          <h2 style={{color:"white"}}>Select Lists</h2>
          {lists.map((list) => (
            <ListItem key={list._id} selected={selectedLists[list._id]}>
              <Checkbox
                type="checkbox"
                checked={!!selectedLists[list._id]}
                onChange={() => handleCheckboxChange(list._id)}
              />
              {list.name}
            </ListItem>
          ))}
          <Button1 onClick={handleAddToList}>Add to List</Button1>
          <h2>Create a New List</h2>
          <Input
            type="text"
            placeholder="List Name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <div>
            <label>
              <input
                type="radio"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
              />
              Public
            </label>
            <label>
              <input
                type="radio"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
              />
              Private
            </label>
          </div>
          <Button1 onClick={handleCreateList}>Create List</Button1>
        </PopupContent>
      </PopupContainer>
    );
  }
  
  


export default function SearchedMovie({movie, accessToken}) {
  const [showPopup, setShowPopup] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLists(accessToken);
        setLists(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [accessToken]);



  const handleAddToList = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCreateNewList = async (name, isPublic) => {
    try {
        const newList = await createList(name, isPublic, accessToken);
        if (newList) {
            await addMovieToList(newList._id, movie, accessToken);
            setLists((prevLists) => [...prevLists, newList]);
            setShowPopup(false);
        }
    } catch (error) {
        console.error(error.message);
    }
};

const handleAddToListSelection = async (listId) => {
    try {
        await addMovieToList(listId, movie, accessToken);
        setShowPopup(false);
    } catch (error) {
        console.error(error.message);
    }
};

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
            <Button onClick={handleAddToList}>Add to List</Button>
          </Ddiv>
        </Div1>
      </Wrapper>
      {showPopup && (
        <Popup
        lists={lists}
        onClose={handleClosePopup}
        onAddToList={handleAddToListSelection}
        accessToken={accessToken}
        movie={movie}
        handleCreateNewList={handleCreateNewList}
        />
      )}
    </Container>
    )
}

