import { type Config } from 'prettier';

const config: Config = {
  trailingComma: 'none',
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  plugins: ['prettier-plugin-tailwindcss']
};

export default config;