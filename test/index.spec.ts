// eslint-disable-next-line @typescript-eslint/no-var-requires
const ServerlessGitInfo = require('../src/index');

describe('ServerlessGitInfo', () => {

  it('should create the plugin', () => {
    const serverless = {
      cli: jasmine.createSpyObj(['log'])
    };

    const plugin = new ServerlessGitInfo(serverless);
    expect(plugin).toBeTruthy();
    expect(serverless.cli.log).toHaveBeenCalled();
  });
});
