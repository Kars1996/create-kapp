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