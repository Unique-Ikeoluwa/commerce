const chalk = require("chalk");
const rl = require("./rl");
const data = require("./data");

function register(callback) {
  rl.question("Enter your fullname (e.g. Ikeoluwa Unique): ", (fullName) => {
    const parts = fullName.trim().split(" ");
    if (parts.length < 2) {
      console.log(chalk.red("❌ Fullname must have at least 2 words."));
      return callback();
    }

    const username = parts[1];
    rl.question("Enter your email: ", (email) => {
      if (!email.includes("@")) {
        console.log(chalk.red("❌ Invalid email."));
        return callback();
      }
      rl.question("Enter password (min 5 chars): ", (password) => {
        if (password.length < 5) {
          console.log(chalk.red("❌ Password too short."));
          return callback();
        }

        data.users.push({
          id: data.users.length + 1,
          fullName,
          username,
          email,
          password,
          role: "user",
          cart: [],
          orders: []
        });

        console.log(chalk.green("✅ Registration successful!"));
        callback();
      });
    });
  });
}

function login(callback) {
  rl.question("Enter email: ", (email) => {
    rl.question("Enter password: ", (password) => {
      const user = data.users.find((u) => u.email === email && u.password === password);
      if (user) {
        data.currentUser = user;
        console.log(chalk.greenBright(`✅ Welcome back, ${user.username}!`));
      } else {
        console.log(chalk.red("❌ Invalid email or password."));
      }
      callback();
    });
  });
}

function logout(callback) {
  console.log(chalk.yellow(`👋 Goodbye, ${data.currentUser.username}`));
  data.currentUser = null;
  callback();
}

module.exports = { register, login, logout };
