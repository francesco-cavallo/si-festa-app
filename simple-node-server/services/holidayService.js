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

    // Togli le feste non global (Tipo la Pentecose)
    const filteredResp = response.data.filter(hldy => hldy.global === true);

    return filteredResp;
}


module.exports = {
    getPublicHolidays
};