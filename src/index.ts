import Serverless = require('serverless');
import Plugin = require('serverless/classes/Plugin');
import childProcess = require('child_process');
import util = require('util');

export default class ServerlessGitInfo implements Plugin {
  public hooks: Plugin.Hooks;
  public variableResolvers: Plugin.VariableResolvers;
  public execAsync = util.promisify(childProcess.exec);

  constructor(_serverless: Serverless) {
    this.hooks = {
    };
    this.variableResolvers = {
      git: (source) => this.gitResolver(source)
    };
  }

  private async gitResolver(variableSource: string): Promise<string> {
    switch (variableSource) {
      case 'git:branch':
        return this.execGitCommand('rev-parse --abbrev-ref HEAD');
      case 'git:commit':
        return this.execGitCommand('rev-parse HEAD');
      case 'git:sha1':
        return this.execGitCommand('rev-parse --short HEAD');
      default:
        throw new Error(`${variableSource} is not supported by serverless-git-info plugin`);
    }
  }

  private async execGitCommand(args: string): Promise<string> {
    const command = `git ${args}`;
    const { stdout } = await this.execAsync(command);

    // git responses end with a line terminator, get rid of it
    return stdout.trim();
  }
}

module.exports = ServerlessGitInfo;
