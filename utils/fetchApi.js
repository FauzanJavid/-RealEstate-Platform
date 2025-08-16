import axios from "axios";
import { mockProperties } from './mockData';

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  try {
    const { data } = await axios.get((url), {
      headers: {
        'x-rapidapi-host': 'bayut.p.rapidapi.com',
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY ,
      },
    });
    
    return data;
  } catch (error) {
    console.warn('API request failed, using mock data:', error.message);
    // Return mock data when API fails
    return mockProperties;
  }
}
