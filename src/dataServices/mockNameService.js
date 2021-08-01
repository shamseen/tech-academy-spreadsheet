const namesAPI = {
  key: process.env.REACT_APP_MOCKAROO_KEY,
  route: process.env.REACT_APP_MOCKAROO_ROUTE,
};

export const getNames = async () => {
  const url = `https://my.api.mockaroo.com/${namesAPI.route}?key=${namesAPI.key}`;

  try {
    // getting and formatting data
    const response = await fetch(url);
    const json = await response.json();

    const names = json.map((j) => j.first_name);

    return names;

    // handling errors
  } catch (err) {
    console.log(err);
  }
};
