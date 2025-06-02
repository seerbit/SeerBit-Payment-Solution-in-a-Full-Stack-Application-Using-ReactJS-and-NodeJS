require("dotenv").config();

module.exports = {
  PUBLIC_KEY: process.env.SEERBIT_PUBLIC_KEY,

  SECRET_KEY: process.env.SEERBIT_SECRET_KEY,

  BEARER_TOKEN: process.env.SEERBIT_BEARER_TOKEN,
};
