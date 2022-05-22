module.exports = {
  "*.{js,jsx,ts,tsx,json,css,js}": ["prettier --check"],
  "*.{js,jsx,ts,tsx}": ["eslint --max-warnings=0"],
  "src/**/*.{js,jsx,ts,tsx}": ["npm run test"],
};
