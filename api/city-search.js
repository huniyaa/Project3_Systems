export default async function handler(req, res) {
  const { name } = req.query;

  if (!name || name.length < 2) {
    return res.status(400).json([]);
  }

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/city?name=${encodeURIComponent(name)}`,
      {
        headers: {
          "X-Api-Key": process.env.API_NINJAS_KEY
        }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json([]);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("City search error:", err);
    res.status(500).json([]);
  }
}
