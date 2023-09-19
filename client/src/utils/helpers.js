export async function fetchFromApi(endpointURL, opts) {
  const { method, body } = { method: "POST", body: null, ...opts };

  const res = await fetch(`${process.env.BACK_URL}/${endpointURL}`, {
    method,
    ...(body & { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
