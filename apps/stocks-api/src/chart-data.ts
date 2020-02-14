import { environment } from './environments/environment';

const axios = require('axios')
export const getChartData = async (symbol, period) => {
  const url = `${environment.apiURL}/beta/stock/${symbol}/chart/${period}?token=${environment.apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;

  } catch (error) {
    return error;
  }
};
