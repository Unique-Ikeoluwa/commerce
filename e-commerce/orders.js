const chalk = require("chalk");
const rl = require("./rl");
const data = require("./data");

function checkout(callback) {
  if (!data.currentUser.cart || data.currentUser.cart.length === 0) {
    console.log(chalk.yellow("🛒 Cart is empty."));
    return callback();
  }

  data.currentUser.cart.forEach((item) => {
    const product = data.products.find((p) => p.id === item.productId);
    if (product) {
      product.quantity -= item.quantity;
    }
  });

  const newOrder = {
    id: data.orders.length + 1,
    userId: data.currentUser.id,
    items: [...data.currentUser.cart],
    status: "pending",
  };

  data.orders.push(newOrder);
  data.currentUser.orders.push(newOrder.id);
  data.currentUser.cart = [];

  console.log(chalk.green("✅ Order placed!"));
  callback();
}

function viewMyOrders(callback) {
  const myOrders = data.orders.filter((o) => o.userId === data.currentUser.id);
  if (myOrders.length === 0) {
    console.log(chalk.yellow("📭 You have no orders."));
  } else {
    myOrders.forEach((o) => {
      console.log(`Order ${o.id} - ${o.status}`);
      o.items.forEach((item) => {
        const product = data.products.find((p) => p.id === item.productId);
        console.log(`- ${product.name} x${item.quantity}`);
      });
    });
  }
  callback();
}

function viewOrders(callback) {
  if (data.orders.length === 0) {
    console.log(chalk.yellow("📭 No orders yet."));
  } else {
    data.orders.forEach((o) => {
      const user = data.users.find((u) => u.id === o.userId);
      console.log(`Order ${o.id} by ${user.fullName} - ${o.status}`);
    });
  }
  callback();
}

function processOrder(callback) {
  rl.question("Enter order ID to process: ", (id) => {
    const order = data.orders.find((o) => o.id == id);
    if (!order) {
      console.log(chalk.red("❌ Order not found."));
      return callback();
    }
    order.status = "completed";
    console.log(chalk.green("✅ Order completed."));
    callback();
  });
}

function searchOrders(callback) {
  rl.question("Enter order ID: ", (id) => {
    const order = data.orders.find((o) => o.id == id && o.userId === data.currentUser.id);
    if (!order) {
      console.log(chalk.red("❌ Order not found."));
    } else {
      console.log(chalk.green(`✅ Order ${order.id}: ${order.status}`));
      order.items.forEach((item) => {
        const product = data.products.find((p) => p.id === item.productId);
        console.log(`- ${product.name} x${item.quantity}`);
      });
    }
    callback();
  });
}

module.exports = { checkout, viewMyOrders, viewOrders, processOrder, searchOrders };

