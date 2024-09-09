const { exec } = require("child_process");

const main = () => {
  console.log("Starting build...");
  exec("tsc", (err, stdout, stderr) => {
    if (err) {
      console.log(
        "❌ Build failed with the following error: "
      );
      console.log(stdout);
      return;
    }
    console.log("\x1b[32mBuild successful! \x1b[37m");
    exec("npm publish", (err, stdout, stderr) => {
        if (err) {
            console.log("Failed to publish repo with folloing error")
            console.log(stdout)
            return
        }
        console.log("Sucessfully bumped version")
        exec("npm i create-kapp@latest -g", (err, stdout, stderr) => {
          if (err) {
            console.log("Failed to install create-kapp@latest globally. \x1b[37m");
            console.log(stdout);
            process.exit(1);
          }
          console.log("Updated local version")
        })
    })
  })
};

try {
  main();
} catch (e) {
  if (e.code === "MODULE_NOT_FOUND") {
    console.log(
      "\x1b[31mNode modules are not installed. \x1b[33mInstalling...\x1b[37m"
    );
    exec("npm i", (err, stdout, stderr) => {
      if (err) {
        console.log("\x1b[31mFailed to install node modules. \x1b[37m");
        console.log(err);
        process.exit(1);
      }
      console.log(stdout);
      console.log(
        "\x1b[32mNode modules successfully installed. \x1b[33mRestarting in 3 seconds... \x1b[37m"
      );
      setTimeout(() => {
        exec("node scripts/publish.js", (err, stdout, stderr) => {
          if (err) {
            console.log("\x1b[31mFailed to restart. \x1b[37m");
            console.log(err);
            process.exit(1);
          }
          console.log(stdout);
        });
      }, 3000);
    });
  }
}
