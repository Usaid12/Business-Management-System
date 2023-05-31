import '../pre-start';

export default {
  NodeEnv: process.env.NODE_ENV ?? 'dev',
  Port: (process.env.PORT ?? 0),
  CookieProps: {
    Key: 'ExpressGeneratorTs',
    Secret: (process.env.COOKIE_SECRET ?? ''),
    Options: {
      httpOnly: true,
      signed: true,
      path: (process.env.COOKIE_PATH ?? ''),
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      domain: (process.env.COOKIE_DOMAIN ?? ''),
      secure: (process.env.SECURE_COOKIE === 'true'),
    },
  },
  Jwt: {
    ACCESS: {
      SECRET: process.env.JWT_ACCESS_TOKEN_SECRET ?? '',
      EXPIRE: process.env.JWT_ACCESS_TOKEN_EXPIRE ?? '',
    },
  },
  Database: {
    Host: process.env.DB_HOST,
    Port: parseInt(process.env.DB_PORT || '5432'),
    User: process.env.DB_USER,
    Password: process.env.DB_PASSWORD,
    Name: process.env.DB_NAME,
  }
} as const;
