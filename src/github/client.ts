import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';
import fs from 'node:fs';
import {
  GITHUB_APP_ID,
  GITHUB_APP_INSTALLATION_ID,
  GITHUB_APP_PRIVATE_KEY_PATH,
  GITHUB_OWNER,
  GITHUB_REPO,
} from '../config/index.ts';

const privateKey = fs.readFileSync(GITHUB_APP_PRIVATE_KEY_PATH, 'utf8');

export async function getGitHubClient() {
  const auth = createAppAuth({
    appId: Number(GITHUB_APP_ID),
    privateKey,
    installationId: Number(GITHUB_APP_INSTALLATION_ID),
  });

  const { token } = await auth({ type: 'installation' });
  return new Octokit({ auth: token });
}

export const repoContext = {
  owner: GITHUB_OWNER,
  repo: GITHUB_REPO,
};
