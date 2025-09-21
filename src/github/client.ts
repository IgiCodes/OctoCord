import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';
import {
  GITHUB_APP_ID,
  GITHUB_APP_INSTALLATION_ID,
  GITHUB_APP_PRIVATE_KEY_PEM,
  GITHUB_OWNER,
  GITHUB_REPO,
} from '../config/index.ts';

export async function getGitHubClient() {
  const auth = createAppAuth({
    appId: Number(GITHUB_APP_ID),
    privateKey: GITHUB_APP_PRIVATE_KEY_PEM,
    installationId: Number(GITHUB_APP_INSTALLATION_ID),
  });

  const { token } = await auth({ type: 'installation' });
  return new Octokit({ auth: token });
}

export const repoContext = {
  owner: GITHUB_OWNER,
  repo: GITHUB_REPO,
};
