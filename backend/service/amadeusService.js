const axios = require('axios')

const HOTEL_API_KEY = process.env.HOTEL_API_KEY;
const HOTEL_SECRET_KEY = process.env.HOTEL_SECRET_KEY;
const TOKEN_URL = process.env.TOKEN_URL;
const HOTEL_BY_CITY_URL = process.env.HOTEL_BY_CITY_URL;
const HOTEL_OFFERS_URL = process.env.HOTEL_OFFERS_URL;

console.log("BY_CITY_URL:", HOTEL_BY_CITY_URL);
console.log("OFFERS_URL:", HOTEL_OFFERS_URL);


let accessToken = null;
let tokenExpiry = 0;
async function fetchAccessToken(){
    const now = Date.now()
    if(accessToken && now < tokenExpiry - 5000){
        return accessToken
    }
    const params = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: HOTEL_API_KEY,
        client_secret: HOTEL_SECRET_KEY
    })
    const res = await axios.post(TOKEN_URL, params.toString(),{
        headers: { "Content-Type": 'application/x-www-form-urlencoded'}
    })
    const { access_token, expires_in } = res.data
    accessToken = access_token
    tokenExpiry = Date.now() + expires_in * 1000
    return accessToken
}

function formatToYYYYMMDD(date) {
    return new Date(date).toISOString().split("T")[0];
}


async function getHotelByCity(cityCode){
    const token = await fetchAccessToken()
    const res = await axios.get(`${HOTEL_BY_CITY_URL}?cityCode=${cityCode}`,{
        headers: { Authorization: `Bearer ${token}`}
    })
    return res.data
}
async function  getHotelDetails(hotelIds, checkInDate, checkOutDate, adults = 1) {
    try {
        const token = await fetchAccessToken()
        const params = new URLSearchParams()
        params.append('hotelIds', Array.isArray(hotelIds) ? hotelIds.map(id => id.trim()).join(',') : hotelIds )
        if(checkInDate) params.append('checkInDate', formatToYYYYMMDD(checkInDate))
        if(checkOutDate) params.append('checkOutDate', formatToYYYYMMDD(checkOutDate))
        params.append("adults",String(adults))

        console.log("Hotel Request URL:", `${HOTEL_OFFERS_URL}?${params.toString()}`);

        const res = await axios.get(`${HOTEL_OFFERS_URL}?${params.toString()}`,{
            headers: { Authorization: `Bearer ${token}`}
        })
        return res.data
    } catch (error) {
        console.error("Error fetching hotel details:", error.response?.data || error.message);
        throw new Error(error.response?.data?.errors?.[0]?.detail || "Failed to fetch hotel details");
    }
    
}
// async function getHotelDetails(hotelId, checkInDate, checkOutDate, adults = 1) {
//   try {
//     const token = await fetchAccessToken();

//     const params = new URLSearchParams();
//     params.append("hotelId", hotelId);
//     if (checkInDate) params.append("checkInDate", checkInDate);
//     if (checkOutDate) params.append("checkOutDate", checkOutDate);
//     params.append("adults", String(adults));

//     console.log("V2 Hotel Offers URL:", `${HOTEL_OFFERS_URL}?${params.toString()}`);

//     const res = await axios.get(`${HOTEL_OFFERS_URL}?${params.toString()}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     return res.data;

//   } catch (error) {
//     console.error("Error fetching V2 hotel offers:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.errors?.[0]?.detail || "Failed to fetch hotel offers");
//   }
// }

module.exports = {
    getHotelByCity,
    getHotelDetails,
    fetchAccessToken
}