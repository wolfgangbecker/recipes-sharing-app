import axios from "axios";

import auth, {isAuthenticated} from "./auth";
import { apiEndpoint } from '/../config';

const request = axios.create({
  baseURL: apiEndpoint,
  // baseURL: 'http://localhost:3000'
})

isAuthenticated.subscribe(() => {
  const token = localStorage.getItem('idToken')
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
})

export default request
