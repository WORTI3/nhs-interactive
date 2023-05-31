declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      OPENAI_API_KEY: string;
      OPENAI_MODEL: string;
    }
  }
}

export {}