const getAccessToken = () => {
  return localStorage.getItem('accessToken');
}
export const createList = async (name, isPublic) => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    // Handle case where token is not available
    console.error('Access token not available');
    return;
  }

  try {
    const response = await fetch('https://movie-library-server-nine.vercel.app/api/movielists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` // Set the token in the Authorization header
      },
      body: JSON.stringify({ name, public: isPublic })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create list');
    }

    const newList = await response.json();
    return newList;
  } catch (error) {
    console.error('createList Error:', error.message);
    throw error;
  }
};

export const addMovieToList = async (listId, movie, accessToken) => {
  const response = await fetch(`https://movie-library-server-nine.vercel.app/api/movielists/${listId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ movies: [movie] })
  });
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add movie to list');
  }
  return response.json();
};

export const fetchLists = async (accessToken) => {
  try {
    const response = await fetch('https://movie-library-server-nine.vercel.app/api/movielists', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch lists: ' + response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error('fetchLists Error:', error.message);
    throw error;
  }
};
