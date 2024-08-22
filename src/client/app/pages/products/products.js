import tmpProducts from "./products.ejs";

export default async function () {
  const strProducts = tmpProducts();
  document.getElementById("app").insertAdjacentHTML("beforeend", strProducts);
}

export const onInit = async () => {
  // Initialization code, e.g., fetching data from the server.
  return {}; // Return any necessary data for rendering.
};
