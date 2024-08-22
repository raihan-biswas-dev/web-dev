import tmpContact from "./contact.ejs";

export default async function () {
  const strContact = tmpContact();
  document.getElementById("app").insertAdjacentHTML("beforeend", strContact);
}

export const onInit = async () => {
  // Initialization code, e.g., fetching data from the server.
  return {}; // Return any necessary data for rendering.
};
