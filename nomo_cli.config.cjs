const nomoCliConfig = {
  deployTargets: {
    production: {
      rawSSH: {
        sshHost: process.env.SSH_TARGET,
        sshBaseDir: "/var/www/production_webons/faucet/",
        publicBaseUrl: "https://faucet.nomo.zone",
        hybrid: true,
      },
    },
  },
};

module.exports = nomoCliConfig;
