import tmpList from "./list.ejs";

export default async function () {
  const strList = tmpList();
  document.getElementById("app").insertAdjacentHTML("beforeend", strList);
}

export const onInit = async () => {
  // Initialization code, e.g., fetching data from the server.
  return {}; // Return any necessary data for rendering.
};
