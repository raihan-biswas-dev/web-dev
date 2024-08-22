//Name: Santoshi Lamichhane
//Student ID: 100915340

console.log(
  "Hello World this is the main file which will be loaded into each page of the website"
);

function addNavigationButtons() {
  const navbar = document.querySelector(".navbar ul");
  const pages = ["Index", "About", "List", "Add", "Contact"];

  pages.forEach((page) => {
    const listItem = document.createElement("li");
    listItem.className = "nav-item";
    const link = document.createElement("a");
    link.className = "nav-link";
    link.href = page.toLowerCase().replace(" ", "") + ".html";
    link.textContent = page;
    listItem.appendChild(link);
    navbar.appendChild(listItem);
  });
}

function footer() {
  const footerElement = document.querySelector("#mainfooter p");
  if (footerElement) {
    footerElement.innerHTML = `Copyright &copy; ${new Date().getFullYear()} Santoshi Lamichhane`;
  } else {
    console.error("Footer element not found");
  }
}

document.addEventListener("DOMContentLoaded", footer);

document.addEventListener("DOMContentLoaded", addNavigationButtons);
