import Navigo from "navigo";
import renderFooter from "./components/footer/footer.js";
import renderHeader from "./components/header/header.js";
import renderAbout from "./pages/about/about.js";
import renderAdd from "./pages/add/add.js";
import renderContact from "./pages/contact/contact.js";
import renderHome from "./pages/home/home.js";
import renderList from "./pages/list/list.js";
import renderProducts from "./pages/products/products.js";

const router = new Navigo("/");

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();

  router
    .on("/", async () => {
      await renderHome();
    })
    .on("/about", async () => {
      await renderAbout();
    })
    .on("/contact", async () => {
      await renderContact();
    })
    .on("/add", async () => {
      await renderAdd();
    })
    .on("/list", async () => {
      await renderList();
    })
    .on("/products", async () => {
      await renderProducts();
    })

    .resolve();
});

export default router;
