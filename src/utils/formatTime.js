export const formatTime = (isoString) => {
  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const time = date.toLocaleTimeString("en-US", options);

  return `${formattedDate}`;
};
