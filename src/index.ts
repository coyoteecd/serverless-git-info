import Serverless = require('serverless');
import Plugin = require('serverless/classes/Plugin');

class ServerlessGitInfo implements Plugin {
  public hooks: Plugin.Hooks;

  constructor(serverless: Serverless) {
    this.hooks = {
    };

    serverless.cli.log('serverless-git-info initialized');
  }
}

module.exports = ServerlessGitInfo;
