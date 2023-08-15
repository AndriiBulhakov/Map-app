const connectWebflow = async () => {
    const url = process.env.WEBFLOW_API_URL;
    const authorizationAccess = process.env.WEBFLOW_API_TOKEN;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: authorizationAccess
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data; // Повертаємо отримані дані
    } catch (error) {
      console.error('error:', error);
      throw error;
    }
};

module.exports = connectWebflow;