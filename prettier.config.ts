import { type Config } from 'prettier';

const config: Config = {
  trailingComma: 'none',
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 120,
  plugins: ['prettier-plugin-tailwindcss']
};

export default config;
