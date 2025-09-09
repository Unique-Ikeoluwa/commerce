const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = rl;



// const readline = require("readline");
// const chalk = require("chalk");

// let users = [];
// let products = [];
// let orders = [];
// let currentUser = null;

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// function showMenu() {
//   console.log(chalk.white.bgBlue("\n=== Shopwell ==="));
  
//   if (!currentUser) {
//     console.log(chalk.cyan("1: Register"));
//     console.log(chalk.cyan("2: Login"));
//     console.log(chalk.cyan("3: View Products"));
//     console.log(chalk.cyan("4: Search Products"));
//     console.log(chalk.red("0: Exit"));
//   } else if (currentUser.role === "admin") {
//     console.log(chalk.cyan("1: Add Product"));
//     console.log(chalk.cyan("2: View Products"));
//     console.log(chalk.cyan("3: Edit Product"));
//     console.log(chalk.cyan("4: View Orders"));
//     console.log(chalk.cyan("5: Process Order"));
//     console.log(chalk.yellow("9: Logout"));
//     console.log(chalk.red("0: Exit"));
//   } else if (currentUser.role === "user") {
//     console.log(chalk.cyan("1: View Products"));
//     console.log(chalk.cyan("2: View Product Details"));
//     console.log(chalk.cyan("3: Add to Cart"));
//     console.log(chalk.cyan("4: View Cart"));
//     console.log(chalk.cyan("5: Checkout"));
//     console.log(chalk.cyan("6: Search Products"));
//     console.log(chalk.cyan("7: View My Orders"));
//     console.log(chalk.yellow("9: Logout"));
//     console.log(chalk.red("0: Exit"));
//   }

//   rl.question(chalk.green("Select an option: "), (option) => {
//     if (!currentUser) {
//       switch (option) {
//         case "1": register(); break;
//         case "2": login(); break;
//         case "3": viewProducts(); break;
//         case "4": searchProducts(); break;
//         case "0": exitApp(); break;
//         default: invalidOption();
//       }
//     } else if (currentUser.role === "admin") {
//       switch (option) {
//         case "1": addProduct(); break;
//         case "2": viewProducts(); break;
//         case "3": editProduct(); break;
//         case "4": viewOrders(); break;
//         case "5": processOrder(); break;
//         case "9": logout(); break;
//         case "0": exitApp(); break;
//         default: invalidOption();
//       }
//     } else {
//       switch (option) {
//         case "1": viewProducts(); break;
//         case "2": productDetails(); break;
//         case "3": addToCart(); break;
//         case "4": viewCart(); break;
//         case "5": checkout(); break;
//         case "6": searchProducts(); break;
//         case "7": viewMyOrders(); break;
//         case "9": logout(); break;
//         case "0": exitApp(); break;
//         default: invalidOption();
//       }
//     }
//   });
// }

// function invalidOption() {
//   console.log(chalk.red("❌ Invalid option, try again."));
//   showMenu();
// }

// function exitApp() {
//   console.log(chalk.magenta("👋 Thank you for using Shopwell!"));
//   rl.close();
// }

// function register() {
//   rl.question("Enter your fullname (e.g. Ikeoluwa Unique): ", (fullName) => {
//     const parts = fullName.trim().split(" ")
//     if (parts < 2){
//       console.log(chalk.red("❌ Fullname is invalid"))
//     }else{
//       username = parts[1]
//       rl.question("Enter your email: ", (email) => {
//         if (!email.trim().includes("@")) {
//           console.log(chalk.red("❌ Email is invalid"))
//         } else {
//           rl.question("Enter your password: ", (password) => {
//             if (password.length < 5){
//               console.log(chalk.red("❌ Password cannot be less than 5 characters"))
//             }else {
//               users.push({
//                 id: users.length + 1,
//                 fullName,
//                 email,
//                 password,
//                 username,
//                 role: "user",
//                 cart: [],
//                 orders: []
//               });
//             console.log(chalk.green("✅ Registration successful! You can now login."));
//             showMenu();
//             }
//           });
//         }
//       });
//     }
//   });
// }

// function login() {
//   rl.question("Enter email: ", (email) => {
//     rl.question("Enter password: ", (password) => {
//       const user = users.find((u) => u.email === email && u.password === password);
//       if (user) {
//         currentUser = user;
//         console.log(chalk.greenBright(`✅ Welcome back, ${user.username}!`));
//       } else {
//         console.log(chalk.red("❌ Invalid email or password."));
//       }
//       showMenu();
//     });
//   });
// }

// const addProduct = (pid, name, description, instock, price) => {
//   fs.readFile("./products.json", "utf-8", (error, data) => {
//     if (error) {
//       console.error("Error reading file:", error);
//       return;
//     }

//     let stock = JSON.parse(data);

//     if (Array.isArray(stock.products)) {
//       stock.products.push({ pid, name, description, instock, price });
//     } else {
//       console.error("Unexpected JSON structure:", stock);
//       return;
//     }

//     fs.writeFile("./users.json", JSON.stringify(stock, null, 2), (err) => {
//       if (err) {
//         console.error("Error writing file:", err);
//       } else {
//         console.log("Product added successfully!");
//       }
//     });
//   });
// };


// const editProduct = (pid, name, description, instock, price) => {
//   fs.readFile("./users.json", "utf-8", (error, data) => {
//     if (error) {
//       console.log(error.message);
//       return;
//     }

//     // console.log(pid);
    

//     const stock = JSON.parse(data);

//     const target = stock.products.find((product) => product.pid === pid.toString());
//     // console.log(target);

//     const editTarget = (name, description, Instock, price) => {
//       target.name = name;
//       target.description = description;
//       target.Instock = Instock;
//       target.price = price;
//     };

//     editTarget(name, description, instock, price);

//     fs.writeFile("./users.json", JSON.stringify(stock, null, 2), (err) => {
//       if (err) {
//         console.error("Error writing file:", err);
//       } else {
//         console.log("Product updated successfully!");
//       }
//     });
//   });
// };

// function logout() {
//   console.log(chalk.yellow(`👋 Goodbye, ${currentUser.username}`));
//   currentUser = null;
//   showMenu();
// }

// function productDetails() {
//   rl.question("Enter product ID: ", (id) => {
//     const product = products.find((p) => p.id == id);
//     if (!product) {
//       console.log(chalk.red("❌ Product not found."));
//     } else {
//       console.log(chalk.blue(`📦 ${product.name}`));
//       console.log(`Description: ${product.description}`);
//       console.log(`In Stock: ${product.quantity}`);
//     }
//     showMenu();
//   });
// }

// function addToCart() {
//   rl.question("Enter product ID: ", (id) => {
//     const product = products.find((p) => p.id == id);
//     if (!product || product.quantity <= 0) {
//       console.log(chalk.red("❌ Product not available."));
//       return showMenu();
//     }
//     rl.question("Enter quantity: ", (qty) => {
//       qty = parseInt(qty);
//       if (qty > product.quantity) {
//         console.log(chalk.red("❌ Not enough stock."));
//       } else {
//         currentUser.cart.push({ productId: product.id, quantity: qty });
//         console.log(chalk.green("✅ Added to cart."));
//       }
//       showMenu();
//     });
//   });
// }

// function viewCart() {
//   if (currentUser.cart.length === 0) {
//     console.log(chalk.yellow("🛒 Cart is empty."));
//   } else {
//     console.log(chalk.blue("🛒 Your Cart:"));
//     currentUser.cart.forEach((item) => {
//       const product = products.find((p) => p.id === item.productId);
//       console.log(`${product.name} - ${item.quantity}`);
//     });
//   }
//   showMenu();
// }

// function checkout() {
//   if (currentUser.cart.length === 0) {
//     console.log(chalk.yellow("🛒 Cart is empty."));
//     return showMenu();
//   }
//   orders.push({ id: orders.length + 1, userId: currentUser.id, items: currentUser.cart, status: "pending" });
//   currentUser.orders.push(orders.length);
//   currentUser.cart = [];
//   console.log(chalk.green("✅ Order placed!"));
//   showMenu();
// }

// function viewMyOrders() {
//   const myOrders = orders.filter((o) => o.userId === currentUser.id);
//   if (myOrders.length === 0) {
//     console.log(chalk.yellow("📭 No orders yet."));
//   } else {
//     myOrders.forEach((o) => {
//       console.log(`Order ${o.id}: ${o.status}`);
//     });
//   }
//   showMenu();
// }

// function viewOrders() {
//   if (orders.length === 0) {
//     console.log(chalk.yellow("📭 No orders yet."));
//   } else {
//     orders.forEach((o) => {
//       const user = users.find((u) => u.id === o.userId);
//       console.log(`Order ${o.id} by ${user.name} - ${o.status}`);
//     });
//   }
//   showMenu();
// }

// function processOrder() {
//   rl.question("Enter order ID to process: ", (id) => {
//     const order = orders.find((o) => o.id == id);
//     if (!order) {
//       console.log(chalk.red("❌ Order not found."));
//       return showMenu();
//     }
//     order.status = "completed";
//     console.log(chalk.green("✅ Order marked as completed."));
//     showMenu();
//   });
// }

// showMenu()

