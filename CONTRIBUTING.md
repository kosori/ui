# Contributing

Thanks for your interest in contributing to kosori-ui. We are delighted to have you here.

Before submitting your first pull request, please take a moment to review this document. We also strongly recommend checking for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@codingcodax](https://x.com/codingcodax).

## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io) and [`workspaces`](https://pnpm.io/workspaces) for development.
- We use [Turborepo](https://turbo.build/repo) as our build system.
- We use [Radix UI](https://www.radix-ui.com/primitives) for accessible components.
- We use [Radix UI Colors](https://www.radix-ui.com/colors) for palette colors.
- We use [Radix UI Icons](https://www.radix-ui.com/icons) and [Lucide Icons](https://lucide.dev/) for icons.
- We use [Tailwind CSS](https://tailwindcss.com) for styling.
- We use [Prettier](https://prettier.io) for code formatting.
- We use [ESLint](https://eslint.org) for linting.

## Structure

This repository is structured as follows:

```
apps
└── www
    ├── content
    └── src
        ├── app
        ├── components
        ├── config
        └── hooks
└── packages
    └── ui
tooling
├── eslint
├── github
├── prettier
├── tailwind
└── typescript
```

| Path                      | Description                              |
| ------------------------- | ---------------------------------------- |
| `apps/www/content`        | The content for the website.             |
| `apps/www/src/app`        | The Next.js application for the website. |
| `apps/www/src/components` | The React components for the website.    |
| `apps/www/src/config`     | The configuration for the website.       |
| `apps/www/src/hooks`      | The hooks for the website.               |
| `packages/ui`             | The UI components.                       |
| `tooling/eslint`          | The ESLint config.                       |
| `tooling/github`          | The CI config.                           |
| `tooling/prettier`        | The Prettier config.                     |
| `tooling/tailwind`        | The Tailwind CSS config.                 |
| `tooling/typescript`      | The TypeScript config.                   |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/kosori/ui.git
# or
gh repo clone kosori/ui
```

### Navigate to project directory

```bash
cd ui
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
pnpm i
```

### Run a workspace

You can use the `pnpm --filter=[WORKSPACE]` command to start the development process for a workspace.

#### Examples

1. To run the `kosori.codingcodax.com` website:

```bash
pnpm --filter=www dev
```

## Documentation

The documentation for this project is located in the `www` workspace. You can run the documentation locally by running the following command:

```bash
pnpm --filter=www dev
```

Documentation is written using [MDX](https://mdxjs.com). You can find the documentation files in the `apps/www/content/docs` directory.

## Components

Our UI components are located in the `packages/ui/src` directory.

When adding or modifying components, please ensure that:

2. You update the documentation.
3. You update the demo component(s).

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new demo for avatar`
  e.g. `feat(ui): add new prop to avatar component`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Requests for new components

If you have a request for a new component, please open a discussion on GitHub. We'll be happy to help you out.
