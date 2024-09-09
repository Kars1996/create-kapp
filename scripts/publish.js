const { exec } = require("child_process");

const main = () => {
    console.log("\x1b[36mStarting build...\x1b[37m");
    exec("tsc", (err, stdout, stderr) => {
        if (err) {
            console.log(
                "\x1b[31m❌ Build failed with the following error: \x1b[37m"
            );
            console.log(stdout);
            return;
        }
        console.log("\x1b[32mBuild successful! \x1b[36m");
        exec("npm publish", (err, stdout, stderr) => {
            if (err) {
                console.log(
                    "\x1b[31mFailed to publish repo with the following error\x1b[37m"
                );
                console.log(stdout);
                return;
            }
            console.log(
                "\x1b[36mSuccessfully published and bumped version\x1b[37m"
            );
            exec("npm i create-kapp@latest -g", (err, stdout, stderr) => {
                if (err) {
                    console.log(
                        "\x1b[31mFailed to install create-kapp@latest globally.\x1b[37m"
                    );
                    console.log(stdout);
                    process.exit(1);
                }
                console.log("\x1b[36mUpdated local version\x1b[37m");
            });
        });
    });
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
                        console.log("\x1b[31mFailed to restart.\x1b[37m");
                        console.log(err);
                        process.exit(1);
                    }
                    console.log(stdout);
                });
            }, 3000);
        });
    }
}
