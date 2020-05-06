import Serverless from 'serverless';
import { VariableResolver } from 'serverless/classes/Plugin';
import ServerlessGitInfo from '../src/index';

describe('ServerlessGitInfo', () => {

  it('should create the plugin', () => {
    const plugin = new ServerlessGitInfo({} as Serverless);
    expect(plugin).toBeTruthy();
    expect(plugin.variableResolvers).toBeDefined('no resolvers defined');
    expect(plugin.variableResolvers.git).toBeDefined('no resolver for git variable prefix');
  });

  describe('when resolving variables', () => {
    let plugin: ServerlessGitInfo;
    let gitResolver: VariableResolver;

    beforeEach(() => {
      plugin = new ServerlessGitInfo({} as Serverless);
      gitResolver = plugin.variableResolvers.git as VariableResolver;
    });

    it('should resolve git:branch', async () => {
      plugin.execAsync = jasmine.createSpy('execAsync').and.resolveTo({ stdout: 'branchy' });

      await expectAsync(gitResolver('git:branch')).toBeResolvedTo('branchy');
      expect(plugin.execAsync).toHaveBeenCalledWith('git rev-parse --abbrev-ref HEAD');
    });

    it('should resolve git:commit', async () => {
      plugin.execAsync = jasmine.createSpy('execAsync').and.resolveTo({ stdout: 'aabbcc' });

      await expectAsync(gitResolver('git:commit')).toBeResolvedTo('aabbcc');
      expect(plugin.execAsync).toHaveBeenCalledWith('git rev-parse HEAD');
    });

    it('should resolve git:sha1', async () => {
      plugin.execAsync = jasmine.createSpy('execAsync').and.resolveTo({ stdout: 'abc' });

      await expectAsync(gitResolver('git:sha1')).toBeResolvedTo('abc');
      expect(plugin.execAsync).toHaveBeenCalledWith('git rev-parse --short HEAD');
    });

    it('should reject unknown variables', async () => {
      plugin.execAsync = jasmine.createSpy('execAsync');

      await expectAsync(gitResolver('git:bad')).toBeRejectedWithError(/git:bad is not supported/);
      expect(plugin.execAsync).not.toHaveBeenCalled();
    });
  });
});
