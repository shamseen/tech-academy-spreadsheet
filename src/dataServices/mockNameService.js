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

    const names = processData(json);
    return names;

    // handling errors
  } catch (err) {
    console.log(err);
  }
};

// dictionary to hold student names, scores, attendance
function processData(json) {
  let data = {};

  json.forEach((j) => {
    data[j.first_name] = {
      present: false,
      scores: [],
    };
  });

  return data;
}
