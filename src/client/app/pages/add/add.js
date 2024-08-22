import tmplAdd from "./add.ejs";

export default async function () {
  const strAdd = tmplAdd();
  document.getElementById("app").insertAdjacentHTML("beforeend", strAdd);
}

export const onInit = async () => {
  return {}; // Return any necessary data for rendering.
};
