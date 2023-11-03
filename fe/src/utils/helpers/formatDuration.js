export function formatDuration(duration) {
  if (!duration) return "0:00";

  const match = duration.match(/PT((\d+)H)?((\d+)M)?((\d+)S)?/);

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (match) {
    hours = parseInt(match[2] || "0");
    minutes = parseInt(match[4] || "0");
    seconds = parseInt(match[6] || "0");
  }

  minutes += hours * 60;

  return minutes + ":" + String(seconds).padStart(2, "0");
}
