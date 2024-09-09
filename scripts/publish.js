const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const bump = (version) => {
    const parts = version.split(".");
    parts[2] = parseInt(parts[2], 10) + 1;
    return parts.join(".");
};

const update = (filePath, newVersion) => {
    const packageJson = JSON.parse(fs.readFileSync(filePath, "utf8"));
    packageJson.version = newVersion;
    fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2), "utf8");
    return newVersion;
};

const main = () => {
    const packagePath = path.join(__dirname, "../package.json");
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    const current = packageJson.version;
    const newVersion = bump(current);

    console.log(
        `\x1b[36mCurrent version: \x1b[38;2;77;143;255m${current}\x1b[36m. Bumping to \x1b[38;2;77;143;255m${newVersion}\x1b[36m...\x1b[37m`
    );

    update(packagePath, newVersion);

    exec("tsc", (err, stdout, stderr) => {
        if (err) {
            console.log(
                "\x1b[31m❌ Build failed with the following error:\x1b[37m"
            );
            console.log(stdout);
            return;
        }
        console.log("\x1b[32mBuild successful!\x1b[36m");

        exec("npm publish --yes", (err, stdout, stderr) => {
            if (err) {
                console.log(
                    "\x1b[31mFailed to publish repo with the following error:\x1b[37m"
                );
                console.log(stdout);
                return;
            }
            console.log(
                `\x1b[36mSuccessfully published and bumped version to ${newVersion}\x1b[37m`
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
                "\x1b[32mNode modules successfully installed. \x1b[33mRestarting in 3 seconds...\x1b[37m"
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
