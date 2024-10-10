import axios from "axios";

const API_BASE_URL = "https://job-board-api-production.up.railway.app/api/v1";

// Function to handle login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signIn`, {
      email,
      password,
    });
    return response.data; // Return the response data to the caller
  } catch (error) {
    throw error.response?.data || "Login failed"; // Throw error so it can be caught in the component
  }
};

// Function to handle user sign-up
export const signUpUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signUp`, userData);
    return response.data; // Return the response data to the caller
  } catch (error) {
    throw error.response?.data || "Sign-up failed"; // Throw error so it can be caught in the component
  }
};
