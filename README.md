# serverless-git-info

[![serverless][icon-serverless]][link-serverless]
[![license][icon-lic]][link-lic]
[![build status][icon-ci]][link-ci]
[![npm version][icon-npm]][link-npm]

Exposes git information extracted from the current local repository as Serverless variables.
Similar to [serverless-plugin-git-variables](https://github.com/jacob-meacham/serverless-plugin-git-variables), but without exporting as environment variables and without a dependency on babel-runtime.

## Installation

```
npm install serverless-git-info --save-dev
```

## Usage

Add the following to your `serverless.yml`:

```yml
plugins:
  - serverless-git-info

custom:
  # Each of these variables resolves to the response of the git command in the comment,
  # as executed in the directory where you're deploying from
  gitBranch: ${git:branch}   # git rev-parse --abbrev-ref HEAD
  gitCommit: ${git:commit}   # git rev-parse HEAD
  gitSha1: ${git:sha1}       # git rev-parse --short HEAD
  gitUser: ${git:user.name}  # git config user.name
  gitEmail: ${git:user.email}  # git config user.email

  # You can also combine them as any other Serverless variable
  gitInfo: ${git:branch}@${git:sha1}
```

When you need to expose git info to your Lambda functions:

```yml
plugins:
  - serverless-git-info

provider:
  name: aws
  environment:
    # This will be available to all lambdas
    GIT_COMMIT: ${git:commit}

functions:
  test:
    environment:
      # This will only be available in the 'test' lambda
      GIT_BRANCH: ${git:branch}

```

This plugin does not have any configuration options (yet).

[//]: # (Note: icon sources seem to be random. It's just because shields.io is extremely slow so using alternatives whenever possible)
[icon-serverless]: http://public.serverless.com/badges/v3.svg
[icon-lic]: https://img.shields.io/github/license/coyoteecd/serverless-git-info
[icon-ci]: https://travis-ci.com/coyoteecd/serverless-git-info.svg?branch=master
[icon-npm]: https://badge.fury.io/js/serverless-git-info.svg

[link-serverless]: http://www.serverless.com
[link-lic]: https://github.com/coyoteecd/serverless-git-info/blob/master/LICENSE
[link-ci]: https://travis-ci.com/coyoteecd/serverless-git-info
[link-npm]: https://www.npmjs.com/package/serverless-git-info
