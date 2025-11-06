module.exports = {
  apps: [
    {
      name: "jisa-next",
      script: "./server.js",
      cwd: "/var/www/jisa-next/runtime",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
}
