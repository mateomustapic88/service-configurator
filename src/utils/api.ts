const API_URL =
  "https://fe-interview-project-backend.accounts-a35.workers.dev/api"; // Base URL

const fetchOptions = (method: string, body?: any) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "x-authentication-token": "borealis-fe-interview-token", // Include the token in the correct header
  };

  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };
};

export const getManufacturers = async () => {
  try {
    const response = await fetch(
      `${API_URL}/manufacturers`,
      fetchOptions("GET")
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch manufacturers: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Rethrow for handling in component
  }
};

export const getServices = async () => {
  try {
    const response = await fetch(`${API_URL}/services`, fetchOptions("GET"));
    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Rethrow for handling in component
  }
};

export const validatePromoCode = async (code: string) => {
  try {
    const response = await fetch(
      `${API_URL}/validate-promo-code/${code}`,
      fetchOptions("POST")
    );
    if (!response.ok) {
      throw new Error(`Failed to validate promo code: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Rethrow for handling in component
  }
};

export const requestFinalQuote = async (requestData: any) => {
  try {
    const response = await fetch(
      `${API_URL}/contact`,
      fetchOptions("POST", requestData)
    );
    if (!response.ok) {
      throw new Error(`Failed to send request: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Rethrow for handling in component
  }
};
