module.exports = {
  apps: [
    {
      name: "HrosDev",
      exec_mode: "fork",
      script: "node_modules/vite/bin/vite.js",
      args: "preview",
      env_local: {
        VITE_API_KEY: "4CB8B3EE874A94E9F8EDEC369A9E4",
      },
    },
  ],
};
