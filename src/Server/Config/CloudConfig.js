class CloudConfig {
  constructor() {
    const config = require("./cloud-config.json");

    let USE_PROD_SERVER_IN_DEVELOPMENT = false;
    if (window.location.href.includes('10.0.0.148')) {
      // Testing on local network so need to use production main server.
      USE_PROD_SERVER_IN_DEVELOPMENT = true;
    }

    this.main = config.main_production;

    const isDevelopment = () => {
      return process.env.NODE_ENV === "development";
    }

    if (isDevelopment() && !USE_PROD_SERVER_IN_DEVELOPMENT) {
      this.main = config.main_development;
    }
  }
}

export default new CloudConfig();
