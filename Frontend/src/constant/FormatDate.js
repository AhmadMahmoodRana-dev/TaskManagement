const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export default formatDate