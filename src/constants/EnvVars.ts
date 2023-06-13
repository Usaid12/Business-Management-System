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
    REFRESH: {
      SECRET: process.env.JWT_REFRESH_TOKEN_SECRET ?? '',
      EXPIRE: process.env.JWT_REFRESH_TOKEN_EXPIRE ?? '',
    },
  },
  Database: {
    Host: process.env.DB_HOST,
    Port: parseInt(process.env.DB_PORT ?? '5432'),
    User: process.env.DB_USER,
    Password: process.env.DB_PASSWORD,
    Name: process.env.DB_NAME,
  },
  SuperAdmin: {
    FirstName: process.env.SUPER_ADMIN_FIRST_NAME?.toString(),
    LastName: process.env.SUPER_ADMIN_LAST_NAME?.toString(),
    Gender: process.env.SUPER_ADMIN_GENDER?.toString(),
    Email: process.env.SUPER_ADMIN_EMAIL?.toString(),
    Password: process.env.SUPER_ADMIN_PASSWORD?.toString(),
    ContactNo: process.env.SUPER_ADMIN_CONTACT_NO?.toString(),
    RoleId: parseInt(process.env.SUPER_ADMIN_ROLE_ID ?? '2'),
  },
} as const;
