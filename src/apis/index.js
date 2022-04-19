import axios from "axios";

export const getCountries = () => axios.get('https://api.covid19api.com/countries');

// Sử dụng template literial để set param động trong get api này
export const getReportByCountry = (country) => axios.get(`https://api.covid19api.com/country/${country}`);