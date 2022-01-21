# Ride the Rail!

A Cypress test automation demo.

---

## Installation

Clone repository with SSH:

```sh
git clone git@github.com:cjbramble/ride-the-rail.git
```

Switch to root of project:

```sh
cd ride-the-rail
```

Install package:

```sh
npm install
```

Test install succeded:

```sh
./node_modules/.bin/cypress open
```

---

## Configuration

In `cypress.json` the `baseUrl` is currently set to <replace>.

To override or use additional configurations create a separate `cypress.env.json`.

Example:

```json
{
    "baseUrl": "<replace>"
}
```

## Usage

We use custom Scripts in `package.json` to open Cypress, run all tests, and some other things from the command line.

```json
"scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "git:hook": "husky install",
    "format": "prettier --write ."
}
```

To open Cypress:

```sh
npm run cy:open
```

To run all tests:

```sh
npm run cy:run
```

---

## Formatter

We're going to let robots do some formatting for us. Enable the git hook for [Prettier](https://prettier.io/) by using a couple of scripts from `package.json`.

```sh
npm run git:hook
```

Now every time you make a commit the formatter will run. If you wish to run the formatter prior to commit (recommended) then just use the format script.

```sh
npm run format
```

## Official Cypress Docs

<https://docs.cypress.io/guides/overview/why-cypress>
