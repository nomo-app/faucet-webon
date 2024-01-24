const nomoCliConfig = {
  deployTargets: {
    production: {
      rawSSH: {
        sshHost: process.env.SSH_TARGET,
        sshBaseDir: "/var/www/production_webons/faucet/",
        publicBaseUrl: "https://w.nomo.app/faucet",
      },
    },
  },
};

module.exports = nomoCliConfig;
