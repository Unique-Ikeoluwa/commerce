const chalk = require("chalk");
const rl = require("./rl");
const data = require("./data");
const { register, login, logout } = require("./users");
const { viewProducts, loadProducts, addProduct, editProduct, viewProductDetails } = require("./products");
const { checkout, viewMyOrders, viewOrders, processOrder, searchOrders } = require("./orders");

function showMenu() {
  console.log(chalk.white.bgBlue("\n=== Shopwell ==="));

  if (!data.currentUser) {
    console.log("1: Register");
    console.log("2: Login");
    console.log("0: Exit");
    viewProducts(() => askOption());
  } else if (data.currentUser.role === "admin") {
    viewProducts(() => {
      console.log("1: Add Product");
      console.log("2: Edit Product");
      console.log("3: View Orders");
      console.log("4: Process Order");
      console.log("5: Logout");
      console.log("0: Exit");
      askOption();
    });
  } else {
    viewProducts(() => {
      console.log("\n\n1: Checkout");
      console.log("2: View My Orders");
      console.log("3: Search Orders");
      console.log("4: Logout");
      console.log("0: Exit");
      askOption();
    });
  }
}

function askOption() {
  rl.question(chalk.green("\nSelect option or enter product ID: "), (opt) => {
    const product = data.products.find((p) => p.id.toLowerCase() === opt.toLowerCase());
    if (product) {
      return viewProductDetails(product.id, showMenu);
    }

    if (!data.currentUser) {
      switch (opt) {
        case "1": return register(showMenu);
        case "2": return login(showMenu);
        case "0": return exitApp();
        default: return invalid();
      }
    } else if (data.currentUser.role === "admin") {
      switch (opt) {
        case "1": return addProduct(showMenu);
        case "2": return editProduct(showMenu);
        case "3": return viewOrders(showMenu);
        case "4": return processOrder(showMenu);
        case "5": return logout(showMenu);
        case "0": return exitApp();
        default: return invalid();
      }
    } else {
      switch (opt) {
        case "1": return checkout(showMenu);
        case "2": return viewMyOrders(showMenu);
        case "3": return searchOrders(showMenu);
        case "4": return logout(showMenu);
        case "0": return exitApp();
        default: return invalid();
      }
    }
  });
}

function invalid() {
  console.log(chalk.red("❌ Invalid option."));
  loadProducts();
  showMenu();
}

function exitApp() {
  console.log(chalk.magenta("👋 Thanks for using Shopwell!"));
  rl.close();
}

loadProducts();
showMenu();

module.exports = { showMenu };
