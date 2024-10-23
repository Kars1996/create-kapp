# KAPP - Kickstart Your Project with Ease 🚀 

### Consider giving this a ⭐ to show support!

KAPP is a CLI tool designed to help you quickly set up your projects using pre-defined templates. Whether you're starting a new Next.js app, Discord bot, or any general project, KAPP has got you covered with streamlined setup, customization, and user-friendly interactions.

```bash
npm i create-kapp@latest -g
```

## Features 🌟
- **Template Categories**: Choose from categories such as Next.js, Discord.js, and General.
- **Quickstart Templates**: Select predefined project templates like NextTemplate, APITemplate, DJS14Template, and more.
- **Interactive UI**: Styled UI powered by [prompts](https://www.npmjs.com/package/prompts) and [kolorist](https://www.npmjs.com/package/kolorist) for a smooth and visually appealing experience.
- **Hyperlinks**: Clickable links to helpful resources like GitHub repositories and websites.
- **Customization**: Easily extend KAPP by adding new templates and options.

## Getting Started 🛠️

### Prerequisites
- [Node.js](https://nodejs.org/) v14.x or higher
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kars1996/create-kapp.git
   cd kapp-cli
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Compile the TypeScript code:
   ```bash
   npm run build
   ```

4. Optionally, link the CLI globally (recommended for easier access):
   ```bash
   npm link
   ```

### Usage

Once the CLI is installed, you can start using KAPP to initialize your projects:

1. Start the CLI by running:
   ```bash
   create-kapp
   ```

2. Follow the prompts to select your template category and template, and provide a file path for your project.

3. Watch as KAPP downloads and initializes the template for you!

### Customizing Templates 🧩

KAPP is designed to be flexible and easy to extend. To add new templates:

1. Navigate to `src/index.ts`.
2. Add your new template to the `templateOptions` object under the appropriate category.
3. Customize the prompts and project initialization logic as needed.

### File Structure

```plaintext
kapp-cli/
├── src/
│   ├── download.ts       # Handles downloading and extracting project templates.
│   ├── index.ts          # Main CLI logic and user interaction.
│   ├── setup.ts          # CLI Utilitys for setting up the project.
│   └── ui.ts             # Custom UI elements and interactions.
├── package.json          # NPM dependencies and scripts.
├── tsconfig.json         # TypeScript configuration.
└── README.md             # Project documentation (you are here!).
```
---

Made with 💙 by [Kars](https://kars.bio) - [GitHub](https://github.com/Kars1996)
```
create-kapp
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ master
│  │     │  └─ v2.4
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ HEAD
│  │           ├─ master
│  │           └─ v2.4
│  ├─ objects
│  │  ├─ 12
│  │  │  └─ 8dced1c1611dc371e3302268eb42051bf9c05d
│  │  ├─ 14
│  │  │  └─ 6d4a421040e424fb178ac08fad23b22cec9992
│  │  ├─ 1b
│  │  │  └─ 1bd7b975cd41db764ab267c349faabc099f028
│  │  ├─ 20
│  │  │  └─ 3c751c5354700b8f1aaf5fd8436d06b5ee7f5c
│  │  ├─ 2a
│  │  │  └─ 34a0a85d9057a2c7f5dd7d160ffd72b8036423
│  │  ├─ 32
│  │  │  └─ 9f177aad1fc42cab03bf3688f47f6c8f2ff9d3
│  │  ├─ 36
│  │  │  └─ c9163cdbd00eca73951ae5d9e72513deef223c
│  │  ├─ 37
│  │  │  └─ 7d5692bd70b6af47743fb35537b1b25b505aec
│  │  ├─ 40
│  │  │  └─ 230419b81c2bf44380370ad866280af211d7d9
│  │  ├─ 44
│  │  │  └─ b2390c3ccbfc57afcbc7e4459cd0099a0be488
│  │  ├─ 4f
│  │  │  └─ 63f24ecf033aa47134dcac1f4c3e3caf1ccaf2
│  │  ├─ 52
│  │  │  └─ 2aaa6655ab30aae2754d3df5ee76397c5a1954
│  │  ├─ 54
│  │  │  ├─ 11de5a9cc7a08d2ee94a16d846113537fe69ee
│  │  │  └─ 8c40969ac254b215f84687244d86afdd21326b
│  │  ├─ 5a
│  │  │  └─ 78414196f632d98518b50b82447916473ee13a
│  │  ├─ 61
│  │  │  └─ 51e5ab0abd5fbcae8d47dc37dc926025c9a1db
│  │  ├─ 9a
│  │  │  └─ 303f21f825e95316647095926a7a30ba46a449
│  │  ├─ ab
│  │  │  └─ 837f37a1670dd162e225cd3f343c587f5f14c8
│  │  ├─ b7
│  │  │  └─ 9b867873b1bc3c0201a225c64c9a63857438aa
│  │  ├─ c0
│  │  │  ├─ 80b9d3c685bdc74a1c89a5b37e62d3b241cdd7
│  │  │  └─ 851e35daa2ff555b3501c4d568610a60f7792c
│  │  ├─ c7
│  │  │  └─ fc471b123e3c359c8e72a7d497a48aa1ef6857
│  │  ├─ d0
│  │  │  ├─ 07ffd741f21b3130e59f01bc02e17855ee18b5
│  │  │  └─ b2f040de2e7d843a4a154728f2ea4bdbff02c4
│  │  ├─ d2
│  │  │  └─ d115bf55c2eabedae01ceba1d2154d5c9f6a04
│  │  ├─ d6
│  │  │  └─ 4238ec2e0cc1e5a6da530b045e311b89458eef
│  │  ├─ df
│  │  │  └─ 42e6ff1b12cebff8703b6133c187e323753591
│  │  ├─ e1
│  │  │  └─ ea19ce21978ddd265a4b2a56ebd92339f46f3d
│  │  ├─ e2
│  │  │  └─ 16244831ed1aa8ba79812af520f712207fed5e
│  │  ├─ e4
│  │  │  └─ 90fdb7bb6707b2edfe8f8df1a08e4993190cfd
│  │  ├─ e7
│  │  │  └─ 140d1cf223b0585b379295c9235ff29568358c
│  │  ├─ e9
│  │  │  └─ 4a04608a48b3e2d44c1699f19e7ea8a52f8105
│  │  ├─ ea
│  │  │  └─ 9edfdff54b4fc3eac147808c0900e64baec1e5
│  │  ├─ ff
│  │  │  └─ 37899d1edd0166c320b89b508e473ee3344742
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-966797dc03679169fd89a52c66ec1664c0fc60d9.idx
│  │     ├─ pack-966797dc03679169fd89a52c66ec1664c0fc60d9.pack
│  │     └─ pack-966797dc03679169fd89a52c66ec1664c0fc60d9.rev
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  ├─ master
│     │  └─ v2.4
│     ├─ remotes
│     │  └─ origin
│     │     ├─ HEAD
│     │     ├─ master
│     │     └─ v2.4
│     └─ tags
├─ .gitattributes
├─ .gitignore
├─ .npmignore
├─ LICENSE
├─ package.json
├─ README.md
├─ scripts
│  └─ publish.js
├─ src
│  ├─ data
│  │  ├─ args.ts
│  │  └─ consts.ts
│  ├─ index.ts
│  ├─ lib
│  │  ├─ download.ts
│  │  └─ setup.ts
│  ├─ release
│  ├─ types
│  │  └─ index.d.ts
│  └─ utils
│     ├─ analytics.ts
│     ├─ logging.ts
│     ├─ UI.ts
│     └─ validate.ts
├─ TODO.md
└─ tsconfig.json

```