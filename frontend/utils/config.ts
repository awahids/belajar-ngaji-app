interface Config {
  API_URL: string | undefined;
  SECRET_KEY: string | undefined;
  REDUX_PERSIST_KEY: string | undefined;
  APP_ENV: string | undefined;
  BASE_URL: string | undefined;
  FIREBASE_CONFIG: string | undefined;
  GOOGLE_KEY: string | undefined;
  SELLER_ID: string | undefined;
}

const config: Config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
  REDUX_PERSIST_KEY: process.env.NEXT_PUBLIC_REDUX_PERSIST_KEY,
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  FIREBASE_CONFIG: process.env.NEXT_PUBLIC_FIREBASE_CONFIG,
  GOOGLE_KEY: process.env.NEXT_PUBLIC_GOOGLE_KEY,
  SELLER_ID: process.env.NEXT_PUBLIC_SELLER_ID,
};

export default config;