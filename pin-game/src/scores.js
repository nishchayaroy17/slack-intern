const API_URL = "https://api.restful-api.dev/objects";
const OBJECT_ID = "ff8081819d150699019d3f604d224b9c";

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

    await fetch(`${API_URL}/${OBJECT_ID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "pin-game-leaderboard",
        data: { scores },
      }),
    });
  } catch (e) {
    console.warn("Failed to save score:", e);
  }
}

export async function getLeaderboard(max = 20) {
  try {
    const res = await fetch(`${API_URL}/${OBJECT_ID}`);
    const json = await res.json();
    return (json.data?.scores || []).slice(0, max);
  } catch {
    return [];
  }
}
