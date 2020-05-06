"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const util = require("util");
class ServerlessGitInfo {
    constructor(_serverless) {
        this.execAsync = util.promisify(childProcess.exec);
        this.hooks = {};
        this.variableResolvers = {
            git: (source) => this.gitResolver(source)
        };
    }
    async gitResolver(variableSource) {
        switch (variableSource) {
            case 'git:branch':
                return this.execGitCommand('rev-parse --abbrev-ref HEAD');
            case 'git:commit':
                return this.execGitCommand('rev-parse HEAD');
            case 'git:sha1':
                return this.execGitCommand('rev-parse --short HEAD');
            case 'git:user.name':
                return this.execGitCommand('config user.name');
            case 'git:user.email':
                return this.execGitCommand('config user.email');
            default:
                throw new Error(`${variableSource} is not supported by serverless-git-info plugin`);
        }
    }
    async execGitCommand(args) {
        const command = `git ${args}`;
        const { stdout } = await this.execAsync(command);
        // git responses end with a line terminator, get rid of it
        return stdout.trim();
    }
}
exports.default = ServerlessGitInfo;
module.exports = ServerlessGitInfo;
