# Yellow Team Software Development Kit (YDK)

## Overview

The Yellow Team Software Development Kit (YDK) is a collection of libraries and tools that enable developers to build applications with a consistent architecture and best practices. The YDK is built on top of the [Nx Workspace](https://nx.dev/react) and [React](https://reactjs.org/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)

## Development

### Creating new workspace

```bash
npx create-nx-workspace@latest --name=ydk.js --preset=ts-standalone --style=css --nx-cloud=skip --interactive=false --workspaceType=package-based --pm=pnpm 
```

### Add to existing workspace

```bash
npx nx@latest init --nx-cloud=skip --interactive=false --workspaceType=package-based 
```

## Start local registy
```bash
npx nx g @nx/js:setup-verdaccio 
npx nx run @ywteam/ydk-js:local-registry
```

## Add a library to the workspace
```bash
LIB_NAME=ydk-api && npx nx g @nx/js:library --name=$LIB_NAME --directory=packages/$LIB_NAME --importPath=@yellowteam/$LIB_NAME --publishable=true --pascalCaseFiles=false --projectNameAndRootFormat=as-provided --testEnvironment=node --unitTestRunner=jest --bundler=tsc --dry-run
```

## Build all libraries
```bash
npx nx run-many --target=build --all=true --parallel=50 --configuration=production
```

## Test all libraries
```bash
npx nx run-many --target=test --all=true --parallel=100
npx nx run-many --target=lint --all=true --parallel=100
```

## Release all libraries
```bash
npx nx release --first-release --dry-run
npx nx release --first-release --specifier=prerelease --preid alpha --git-tag  --dry-run
npx nx release version --first-release --specifier prerelease --preid beta --git-tag --dry-run
npx nx release changelog --first-release --git-tag  --dry-run
npx nx release publish --dry-run
```


## Deploy all libraries
```bash
npx nx run-many --target=nx-release-publish --all=true --parallel=50 
```