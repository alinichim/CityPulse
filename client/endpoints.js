const BASE_URL = "http://10.101.0.90:8000";
const SHELTER_ENDPOINT = BASE_URL + "/shelters/";
const LOGIN_ENDPOINT = BASE_URL + "/login/";
const REGISTER_ENDPOINT = BASE_URL + "/register/";
const USER_ENDPOINT = BASE_URL + "/user/";
const UPDATE_ENDPOINT = BASE_URL + "/update/";
const SOS_ENDPOINT = BASE_URL + "/sms/";

const ADD_FRIEND_ENDPOINT = BASE_URL + "/addfriendd/";
const REMOVE_FRIEND_ENDPOINT = BASE_URL + "/removefriend/";
const SEND_LOCATION_ENDPOINT = BASE_URL + "/sendlocation/";
const GET_LOCATION_ENDPOINT = BASE_URL + "/getlocation/";

const ADD_FAVOURITE_ENDPOINT = BASE_URL + "/add-fav/";
const REMOVE_FAVOURITE_ENDPOINT = BASE_URL + "/remove-fav/";
const GET_FAVOURITE_ENDPOINT = BASE_URL + "/get-fav/";

const GET_ASSOCIATES_ENDPOINT = BASE_URL + "/getassociates/";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getShelters = async (auth) => {
  try {
    const response = await fetch(SHELTER_ENDPOINT, {
      headers: {
        Authorization: `Bearer=${auth}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error };
  }
};

const getProgressData = async (url) => {
  await sleep(500);
  const res = await fetch(url);
  const data = await res.json();

  if (data.job_finished) return data;
  else {
    return await getProgressData(url);
  }
};
const getVenues = async (query) => {
  const params = new URLSearchParams({
    api_key_private: "pri_14a0cd83a0b44cbb95aebf7dbe326faa",
    q: `${query} in bucharest`,
    num: 5,
    fast: false,
    format: "raw",
  });

  const res = await fetch(
    `https://besttime.app/api/v1/venues/search?${params}`,
    {
      method: "POST",
    }
  );
  const data = await res.json();
  const url = data._links.venue_search_progress;
  console.log(url);
  return await getProgressData(url);
};

const callServer = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    // Registration successful
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error };
  }
};

const login = async (email, password) => {
  const body = JSON.stringify({ email, password });
  return callServer(LOGIN_ENDPOINT, body);
};
const register = async (email, password, name) => {
  const body = JSON.stringify({ name, email, password });
  return callServer(REGISTER_ENDPOINT, body);
};

const getUser = async (auth) => {
  try {
    const response = await fetch(USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer=${auth}`,
      },
    });

    // Registration successful
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error };
  }
};
const updateUser = async (auth, user) => {
  try {
    const response = await fetch(UPDATE_ENDPOINT, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer=${auth}`,
      },
      body: JSON.stringify(user),
    });

    // Registration successful
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error };
  }
};

const sendSos = async (auth, location) => {
  try {
    const { longitude = 26.096306, latitude = 44.439663 } = location;
    const response = await fetch(SOS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer=${auth}`,
      },
      body: JSON.stringify({
        longitude: longitude.toString(),
        latitude: latitude.toString(),
      }),
    });

    // Registration successful
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error };
  }
};

const authorize = (data, setAuth) => {
  setAuth(data.Authorization);
};

const addFriend = async (auth, email) => {
  try {
    const response = await fetch(ADD_FRIEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer=${auth}`,
      },
      body: JSON.stringify(email),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error };
  }
};
const removeFriend = async (auth, email) => {
  try {
    const response = await fetch(REMOVE_FRIEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer=${auth}`,
      },
      body: JSON.stringify(email),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error };
  }
};
const sendLocation = async (auth, { latitude, longitude }) => {
  try {
    const response = await fetch(SEND_LOCATION_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer=${auth}`,
      },
      body: JSON.stringify({
        latitude,
        longitude,
        timestamp: new Date().getTime(),
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error };
  }
};
const getLocation = async (auth, email) => {
  console.log(email);
  try {
    const response = await fetch(GET_LOCATION_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer=${auth}`,
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error };
  }
};

const addFavourite = async (auth, favourite) => {
  console.log("fav adding");
  try {
    const response = await fetch(ADD_FAVOURITE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer=${auth}`,
      },
      body: JSON.stringify(favourite),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error };
  }
};
const removeFavourite = async (auth, favourite) => {
  console.log(favourite.venue_id);
  try {
    const response = await fetch(REMOVE_FAVOURITE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer=${auth}`,
      },
      body: JSON.stringify(favourite),
    });

    // Registration successful
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error };
  }
};
const getFavourite = async (auth) => {
  try {
    const response = await fetch(GET_FAVOURITE_ENDPOINT, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer=${auth}`,
      },
    });

    const data = await response.json();
    const cleanData = JSON.parse(data).map(({ data }) => data);
    return cleanData;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error };
  }
};

const getAssociates = async (auth) => {
  try {
    const response = await fetch(GET_ASSOCIATES_ENDPOINT, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer=${auth}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error };
  }
};

export {
  getShelters,
  login,
  register,
  authorize,
  getVenues,
  getUser,
  updateUser,
  sendSos,
  addFriend,
  removeFriend,
  sendLocation,
  getLocation,
  addFavourite,
  removeFavourite,
  getFavourite,
  getAssociates,
};
