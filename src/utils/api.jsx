export const fetchDataFromApi = async (query) => {
  try {
    let url = `https://youtube138.p.rapidapi.com/${query}&hl=en&gl=US`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ce05425585msh15b42a2f34ef93bp1652d4jsn1ea6b23e764c",
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
  },
};
