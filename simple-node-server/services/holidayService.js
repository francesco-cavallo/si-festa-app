const axios = require("axios");

const baseURL = "https://date.nager.at/api/v3/";
const countryCode = "IT";


async function getPublicHolidays(year) {

    const response = await axios.get(
        `${baseURL}PublicHolidays/${year}/${countryCode}`,
        {
            headers: {
                accept: "text/plain"
            }
        }
    );

    return response.data;
}


module.exports = {
    getPublicHolidays
};