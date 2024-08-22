import tmplAbout from "./about.ejs";

export default async function () {
  console.log("About");

  const strAbout = tmplAbout();
  document.getElementById("app").insertAdjacentHTML("beforeend", strAbout);
}

export const onInit = async () => {
  console.log("About");
  return {};
};
