export async function fetchFromApi(endpointURL, options) {
  const { method, body } = { method: "POST", body: null, ...options };

  const response = await fetch(
    `${process.env.REACT_APP_BACK_URL}/${endpointURL}`,
    {
      method,
      ...(body && { body: JSON.stringify(body) }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const responseData = await response.json();
  return {
    status: response.status,
    data: responseData,
  };
}
