const chalk = require("chalk");
const rl = require("./rl");
const data = require("./data");
const fs = require("fs");
const { register } = require("./users");

const PRODUCTS_FILE = "./products.json";

function loadProducts() {
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, "utf-8");
    data.products = JSON.parse(raw);
  } catch (err) {
    console.log(chalk.yellow("⚠️ No products.json found. Starting with empty list."));
    data.products = [];
  }
}

function saveProducts() {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data.products, null, 2));
}

function addProduct(callback) {
  rl.question("Enter product name: ", (name) => {
    rl.question("Enter description: ", (description) => {
      rl.question("Enter quantity: ", (qty) => {
        rl.question("Enter price: ", (price) => {
          const newProduct = {
            id: `P${data.products.length + 1}`,
            name,
            description,
            quantity: parseInt(qty),
            price: parseFloat(price),
          };

          data.products.push(newProduct);
          saveProducts();
          console.log(chalk.green("✅ Product added."));
          callback();
        });
      });
    });
  });
}

function editProduct(callback) {
  rl.question("Enter product ID to edit: ", (id) => {
    const product = data.products.find((p) => p.id == id);
    if (!product) {
      console.log(chalk.red("❌ Product not found."));
      return callback();
    }

    rl.question("New name (leave empty to keep current): ", (name) => {
      rl.question("New description: ", (description) => {
        rl.question("New stock quantity: ", (qty) => {
          rl.question("New price: ", (price) => {
            product.name = name || product.name;
            product.description = description || product.description;
            product.quantity = qty ? parseInt(qty) : product.quantity;
            product.price = price ? parseFloat(price) : product.price;

            saveProducts();
            console.log(chalk.green("✅ Product updated."));
            callback();
          });
        });
      });
    });
  });
}
function viewProducts(callback) {
  if (data.products.length === 0) {
    console.log(chalk.gray("📦 No products available."));
  } else {
    console.log(chalk.blue("📦 Products:"));
    data.products.forEach((p) =>
      console.log(
        `${chalk.yellow(p.id)}. ${p.name} - ${p.description} ${chalk.gray(
          `(Stock: ${p.quantity})`
        )} ${chalk.green(`$${p.price}`)}`
      )
    );
  }
  callback();
}

function viewProductDetails(productId, callback) {
  const product = data.products.find((p) => p.id === productId);
  if (!product) {
    console.log(chalk.red("❌ Product not found."));
    return callback();
  }

  console.log(chalk.cyan("\n=== Product Details ==="));
  console.log(`${chalk.yellow(product.id)} - ${product.name}`);
  console.log(chalk.gray(product.description));
  console.log(chalk.gray(`Stock: ${product.quantity}`));
  console.log(chalk.green(`Price: $${product.price}`));

  rl.question("\nDo you want to buy this product? (y/n): ", (ans) => {
    if (ans.toLowerCase() === "y") {
      if (!data.currentUser) {
        console.log(chalk.red("⚠️ You must register or login to buy."));
        return register(callback);
      }
      rl.question("How many would you like to buy? ", (qty) => {
        const quantity = parseInt(qty);
        if (quantity > product.quantity) {
          console.log(chalk.red("❌ Not enough stock."));
          return callback();
        }

        addToCart(product, quantity);
        callback();
      });
    } else {
      callback();
    }
  });
}

function addToCart(product, quantity) {
  if (!data.currentUser.cart) {
    data.currentUser.cart = [];
  }

  const existing = data.currentUser.cart.find((item) => item.productId === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    data.currentUser.cart.push({ productId: product.id, quantity });
  }

  console.log(chalk.green(`✅ ${quantity} x ${product.name} added to your cart.`));
}

module.exports = { loadProducts, viewProducts, addProduct, editProduct, viewProductDetails };

