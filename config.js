Object.assign(process.env, {
  GIT_AUTHOR_NAME: 'Renovate Bot',
  GIT_AUTHOR_EMAIL: 'bot@example.com',
  GIT_COMMITTER_NAME: 'Renovate Bot',
  GIT_COMMITTER_EMAIL: 'bot@example.com',
});

module.exports = {
  endpoint: process.env.CI_API_V4_URL,
  "printConfig": false,
  "binarySource": "install",
  "repositories": ["corgis.social/k8s-flux"],
  "requireConfig": "required",
  "dependencyDashboard": true,
  "extends": ["docker:disable"],
  "flux": {
    "fileMatch": ["cluster/flux-system/flux-system.yaml$"]
  },
  "helm-values": {"fileMatch": [
    "infra/.+/helmrelease\\.yaml$",
    "apps/.+/helmrelease\\.yaml$"
  ]},
  "rebaseWhen": "behind-base-branch",
  "regexManagers": [
    {
      "fileMatch": ["cluster/.+\\.yaml$"],
      "matchStrings": [
        "registryUrl=(?<registryUrl>.*?)\n *chart: (?<depName>.*?)\n *version: (?<currentValue>.*)\n"
      ],
      "datasourceTemplate": "helm"
    }
  ],
  "packageRules": [
    {
      "matchDatasources": ["docker"],
      "versioning": "semver"
    },
    {"matchUpdateTypes": ["major"], "labels": ["type/major"]},
    {"matchUpdateTypes": ["minor"], "labels": ["type/minor"]},
    {"matchUpdateTypes": ["patch"], "labels": ["type/patch"]},
    {
      "matchDatasources": ["helm"],
      "matchUpdateTypes": ["minor"],
      "semanticCommitType": "feat",
      "semanticCommitScope": "helm"
    },
    {
      "matchDatasources": ["helm"],
      "matchUpdateTypes": ["patch"],
      "semanticCommitType": "fix",
      "semanticCommitScope": "helm"
    },
    {"ignoreTests": true, "matchUpdateTypes": ["minor", "patch"]},
    {"matchDatasources": ["helm"], "ignoreDeprecated": true}
  ],
  "regexManagers": [
     {
       "fileMatch": [
         "cluster/.+\\.yaml$"
       ],
       "matchStrings": [
         "registryUrl=(?<registryUrl>.*?)\n *chart: (?<depName>.*?)\n *version: (?<currentValue>.*)\n"
       ],
       "datasourceTemplate": "helm"
    }
  ]
}

