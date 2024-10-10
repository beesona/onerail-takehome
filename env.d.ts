// global.d.ts or env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
  }
}
