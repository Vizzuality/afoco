# AFOCO

![afoco](https://github.com/Vizzuality/afoco/assets/33252015/f1b59ec2-b53e-4db4-85c7-b67ffca0dd79)

Asian Forest Cooperation Organization (AFoCO) is a treaty-based intergovernmental organization that promotes cooperation towards achieving the shared SDGs and regional and global forestry objectives. Through action-oriented practices, AFoCO aims to contribute to the global goals of increasing forest cover and implementing the Paris Agreement on climate change.
The ongoing project seeks to develop a map-based platform aimed at assisting AFoCO users and partners in enhancing their forest management practices across various project sites spanning 14 countries.

## Usage

### Client

## Installation & development

Requirements:

* NodeJs v18
* Yarn

## Project implementation

This platform is built upon [https://github.com/Vizzuality/front-end-scaffold](https://github.com/Vizzuality/front-end-scaffold)

- [React](https://reactjs.org/) as a UI library
- [Next.js](https://nextjs.org/) as a framework
- [Tailwind CSS](https://tailwindcss.com/) as a styles framework
- Reusable components such as forms, modals, icons, and other most use components
- [Jotai](https://jotai.org/)
- [Typescript](https://www.typescriptlang.org/) already configured
- git workflow and hooks
- editorconfig and code style based on [Airbnb](https://github.com/airbnb/javascript)

## Quick start

In order to start modifying the app, please make sure to correctly configure your workstation:

1. Make sure you have [Node.js](https://nodejs.org/en/) installed
2. (Optional) Install [NVM](https://github.com/nvm-sh/nvm) to manage your different Node.js versions
3. (Optional) Use [Visual Studio Code](https://code.visualstudio.com/) as a text editor to benefit from automatic type checking
4. Configure your text editor with the [Prettier](https://prettier.io/), [ESLint](https://eslint.org/), [EditorConfig](https://editorconfig.org/), [Tailwind CSS](https://tailwindcss.com/docs/plugins) (recommended) and [Headwind](https://github.com/heybourn/headwind) (recommended) plugins
5. (Optional) Configure your editor to “format [code] on save” with ESLint and Prettier **(1)**
6. Use the correct Node.js version for this app by running `nvm use`; if you didn't install NVM (step 2), then manually install the Node.js version described in `.nvmrc`
7. Install the dependencies: `yarn`
8. Start the client with:

```bash
yarn client dev
```

You can access a hot-reloaded version of the app on [http://localhost:3000](http://localhost:3000).

## Testing

To run e2e tests: `yarn cypress:open` and choose e2e configuration

## Deploy on Vercel

First, we recommend to read the guideline about [how to use Vercel](https://vizzuality.github.io/frontismos/docs/guidelines/vercel/).

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Env variables

| Variable name                 | Description                                                             |  Default value                      |
|-------------------------------|-------------------------------------------------------------------------|------------------------------------:|
| NEXT_PUBLIC_API_URL           | URL of the API for widgets Data. 										  | http://localhost:3000   			|
| NEXT_PUBLIC_MAPBOX_API_TOKEN  | Mapbox token. 														  |    									|

### Server CMS

Start the server with:

```bash
yarn cms dev
```

### Types for API

To generate the types for the API, run:

```bash
yarn types build
```

## Usage with Docker (recommended)

To run the app with docker, run:

```bash
docker-compose up --build
```

Open the app in http://localhost:3000 for the client and http://localhost:1337 for the CMS.

NOTE: Docker is recommended for development, but not for production (yet).


## Contribution rules

Please, **create a PR** for any improvement or feature you want to add. Try not to commit anything directly on the `main` branch.

## Vulnerability mitigation

[Dependabot's vulnerability security alerts](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts) are configured in this repository and are displayed to the administrators.

When vulnerabilities are detected, a warning message is displayed at the top of the repository. The list of alerts can be found on the Dependabot alerts page.

Here's a step-by-step guide on how to address vulnerabilities found in production code:

1. Go to the Dependabot alerts page and locate the front-end vulnerability to address
2. Identify if the vulnerability affects production code:
	- To do so run `yarn npm audit --recursive --environment production`
	- If the dependency is _not_ listed by this command, then the vulnerability only affects the development code. You can dismiss the alert on GitHub as “Vulnerable code is not actually used” in the top right corner of the vulnerability page.
	- If the dependency _is_ listed, follow the steps below.
3. On the vulnerability page, click the “Create Dependabot security update” button
	- This will create a Pull Request with a fix for the vulnerability. If GitHub can generate this PR, then you can merge and the security alert will disappear.
	- If the vulnerability can't be patched automatically, follow the steps below.
4. If the action fails, then you can semi-automatically update the vulnerable dependency by running `npm_config_yes=true npx yarn-audit-fix --only prod`
	- `yarn-audit-fix` (see [repository](https://github.com/antongolub/yarn-audit-fix)) is a tool that applies the fixes from `npm audit fix` to Yarn installations
	- The tool might also not be able to fix the vulnerability. If so, continue with the steps below.
5. If the action fails, then you will have to manually update the dependencies until the vulnerability is solved
