const API_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "69cac42136566621a8625c34";
const MASTER_KEY = "$2a$10$j2dhEtBuiae8ufVIkzXwLu8q4yZokRXaJ/IoV2UXFn8dYqYQ4IcNO";

export async function saveScore(name, pinpointScore, mascotScore) {
  try {
    const scores = await getLeaderboard(999);
    scores.push({
      name,
      pinpointScore,
      mascotScore,
      totalScore: pinpointScore + mascotScore,
      timestamp: Date.now(),
    });
    scores.sort((a, b) => b.totalScore - a.totalScore);

    await fetch(`${API_URL}/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY
      },
      body: JSON.stringify({ scores }),
    });
  } catch (e) {
    console.warn("Failed to save score:", e);
  }
}

export async function getLeaderboard(max = 20) {
  try {
    const res = await fetch(`${API_URL}/${BIN_ID}`, {
      headers: {
        "X-Master-Key": MASTER_KEY
      }
    });
    const json = await res.json();
    return (json.record?.scores || []).slice(0, max);
  } catch {
    return [];
  }
}
