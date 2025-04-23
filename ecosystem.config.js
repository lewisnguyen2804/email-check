module.exports = {
  apps: [
    {
      name: "HrosDev",
      exec_mode: 'cluster',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env_local: {
        NEXT_PUBLIC_API_KEY: '4CB8B3EE874A94E9F8EDEC369A9E4'
      }
    }
  ]
}