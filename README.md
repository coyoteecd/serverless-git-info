# serverless-git-info

[![serverless][icon-serverless]][link-serverless]
[![license][icon-lic]][link-lic]
[![build status][icon-ci]][link-ci]
[![npm version][icon-npm]][link-npm]

Exposes git information extracted from the current local repository as Serverless variables.

## Installation

```
npm install serverless-git-info --save-dev
```

## Usage

Add the following to your `serverless.yml`:

```yml
plugins:
  - serverless-git-info
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
