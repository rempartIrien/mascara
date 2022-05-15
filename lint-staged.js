module.exports = {
  "*.{js,jsx,ts,tsx,json,css,js}": ["prettier --write"],
  "*.{js,jsx,ts,tsx}": [
    // "eslint --max-warnings=0",
    "npm run test",
  ],
};
