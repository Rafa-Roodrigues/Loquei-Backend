import axios from 'axios';

export const mapQuest = axios.create({
  baseURL: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_API_KEY}`
});
