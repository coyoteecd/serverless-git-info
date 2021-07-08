import Serverless from 'serverless';
import { VariableResolver } from 'serverless/classes/Plugin';
import ServerlessGitInfo from '../src/index';

describe('ServerlessGitInfo', () => {

  it('should create the plugin', () => {
    const plugin = new ServerlessGitInfo({} as Serverless);
    expect(plugin).toBeTruthy();
    expect(plugin.variableResolvers).withContext('no resolvers defined').toBeDefined();
    expect(plugin.variableResolvers.git).withContext('no resolver for git variable prefix').toBeDefined();
  });

  describe('when resolving variables', () => {
    let plugin: ServerlessGitInfo;
    let gitResolver: VariableResolver;
    let newGitResolver: { resolve: ({ address: string }) => Promise<{ value: string }>; };

    beforeEach(() => {
      plugin = new ServerlessGitInfo({} as Serverless);
      gitResolver = plugin.variableResolvers.git as VariableResolver;
      newGitResolver = plugin.configurationVariablesSources.git;
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

    it('should resolve git:user.name', async () => {
      plugin.execAsync = jasmine.createSpy('execAsync').and.resolveTo({ stdout: 'jon' });

      await expectAsync(gitResolver('git:user.name')).toBeResolvedTo('jon');
      expect(plugin.execAsync).toHaveBeenCalledWith('git config user.name');
    });

    it('should resolve git:user.email', async () => {
      plugin.execAsync = jasmine.createSpy('execAsync').and.resolveTo({ stdout: 'jon.snow@got.com' });

      await expectAsync(gitResolver('git:user.email')).toBeResolvedTo('jon.snow@got.com');
      expect(plugin.execAsync).toHaveBeenCalledWith('git config user.email');
    });

    it('should reject unknown variables', async () => {
      plugin.execAsync = jasmine.createSpy('execAsync');

      await expectAsync(gitResolver('git:bad')).toBeRejectedWithError(/git:bad is not supported/);
      expect(plugin.execAsync).not.toHaveBeenCalled();
    });

    it('should resolve git:branch using the new variable resolver', async () => {
      plugin.execAsync = jasmine.createSpy('execAsync').and.resolveTo({ stdout: 'branchy' });

      await expectAsync(newGitResolver.resolve({ address: 'branch' })).toBeResolvedTo({ value: 'branchy' });
      expect(plugin.execAsync).toHaveBeenCalledWith('git rev-parse --abbrev-ref HEAD');
    });
  });
});
