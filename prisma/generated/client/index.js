Object.defineProperty(exports, '__esModule', { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/library.js');

const Prisma = {};

exports.Prisma = Prisma;
exports.$Enums = {};

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: '6.6.0',
  engine: 'f676762280b54cd07c770017ed3711ddde35f37a',
};

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
Prisma.PrismaClientValidationError = PrismaClientValidationError;
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag;
Prisma.empty = empty;
Prisma.join = join;
Prisma.raw = raw;
Prisma.validator = Public.validator;

/**
 * Extensions
 */
Prisma.getExtensionContext = Extensions.getExtensionContext;
Prisma.defineExtension = Extensions.defineExtension;

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull,
};

const path = require('path');

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable',
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  username: 'username',
  email: 'email',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.MaterialScalarFieldEnum = {
  id: 'id',
  name: 'name',
  specification: 'specification',
  unit: 'unit',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.UserRoletypesScalarFieldEnum = {
  id: 'id',
  role: 'role',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.UserRolesScalarFieldEnum = {
  userId: 'userId',
  userRoletypeId: 'userRoletypeId',
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc',
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  name: 'name',
  username: 'username',
  email: 'email',
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last',
};

exports.Prisma.MaterialOrderByRelevanceFieldEnum = {
  name: 'name',
  specification: 'specification',
  unit: 'unit',
};

exports.Prisma.UserRoletypesOrderByRelevanceFieldEnum = {
  role: 'role',
  description: 'description',
};

exports.Prisma.ModelName = {
  User: 'User',
  Material: 'Material',
  UserRoletypes: 'UserRoletypes',
  UserRoles: 'UserRoles',
};
/**
 * Create the Client
 */
const config = {
  generator: {
    name: 'client',
    provider: {
      fromEnvVar: null,
      value: 'prisma-client-js',
    },
    output: {
      value: '/home/node/sisman-be/prisma/generated/client',
      fromEnvVar: null,
    },
    config: {
      engineType: 'library',
    },
    binaryTargets: [
      {
        fromEnvVar: null,
        value: 'debian-openssl-3.0.x',
        native: true,
      },
    ],
    previewFeatures: [],
    sourceFilePath: '/home/node/sisman-be/prisma/schema.prisma',
    isCustomOutput: true,
  },
  relativeEnvPaths: {
    rootEnvPath: '../../../.env',
    schemaEnvPath: '../../../.env',
  },
  relativePath: '../..',
  clientVersion: '6.6.0',
  engineVersion: 'f676762280b54cd07c770017ed3711ddde35f37a',
  datasourceNames: ['db'],
  activeProvider: 'mysql',
  postinstall: false,
  inlineDatasources: {
    db: {
      url: {
        fromEnvVar: 'DB_URL',
        value: null,
      },
    },
  },
  inlineSchema:
    'generator client {\n  provider = "prisma-client-js"\n  output   = "generated/client"\n}\n\ndatasource db {\n  provider = "mysql"\n  url      = env("DB_URL")\n}\n\nmodel User {\n  id          Int         @id @default(autoincrement())\n  name        String      @db.VarChar(63)\n  username    String      @db.VarChar(63)\n  email       String      @unique @db.VarChar(127)\n  createdAt   DateTime    @default(now()) @map("created_at") @db.Timestamp(0)\n  updatedAt   DateTime    @updatedAt @map("updated_at") @db.Timestamp(0)\n  users_roles UserRoles[]\n\n  @@map("users")\n}\n\nmodel Material {\n  id            BigInt   @id @db.UnsignedBigInt\n  name          String   @db.TinyText\n  specification String?  @db.VarChar(1022)\n  unit          String   @db.VarChar(31)\n  isActive      Boolean  @default(true)\n  createdAt     DateTime @default(now()) @map("created_at") @db.Timestamp(0)\n  updatedAt     DateTime @updatedAt @map("updated_at") @db.Timestamp(0)\n\n  @@map("materials")\n}\n\nmodel UserRoletypes {\n  id          Int         @id\n  role        String      @db.VarChar(255)\n  description String      @db.Text\n  createdAt   DateTime    @default(now()) @map("created_at") @db.Timestamp(0)\n  updatedAt   DateTime    @updatedAt @map("updated_at") @db.Timestamp(0)\n  users_roles UserRoles[]\n\n  @@map("users_roletypes")\n}\n\nmodel UserRoles {\n  userId          Int           @map("user_id")\n  userRoletypeId  Int           @map("user_roletype_id")\n  users           User          @relation(fields: [userId], references: [id], onUpdate: Restrict, map: "users_roles_ibfk_1")\n  users_roletypes UserRoletypes @relation(fields: [userRoletypeId], references: [id], onUpdate: Restrict, map: "users_roles_ibfk_2")\n\n  @@id([userId, userRoletypeId])\n  @@index([userRoletypeId], map: "role_id")\n  @@map("users_roles")\n}\n',
  inlineSchemaHash:
    'b70d9fe4d9cf00b0e132d9d7d1fee3ad246bddb2b6d3e197be0aa4f9d6a44f27',
  copyEngine: true,
};

const fs = require('fs');

config.dirname = __dirname;
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = ['prisma/generated/client', 'generated/client'];

  const alternativePath =
    alternativePaths.find((altPath) => {
      return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'));
    }) ?? alternativePaths[0];

  config.dirname = path.join(process.cwd(), alternativePath);
  config.isBundled = true;
}

config.runtimeDataModel = JSON.parse(
  '{"models":{"User":{"dbName":"users","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":["VarChar",["63"]],"isGenerated":false,"isUpdatedAt":false},{"name":"username","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":["VarChar",["63"]],"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":["VarChar",["127"]],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":["Timestamp",["0"]],"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":["Timestamp",["0"]],"isGenerated":false,"isUpdatedAt":true},{"name":"users_roles","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UserRoles","nativeType":null,"relationName":"UserToUserRoles","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Material":{"dbName":"materials","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"BigInt","nativeType":["UnsignedBigInt",[]],"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":["TinyText",[]],"isGenerated":false,"isUpdatedAt":false},{"name":"specification","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":["VarChar",["1022"]],"isGenerated":false,"isUpdatedAt":false},{"name":"unit","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":["VarChar",["31"]],"isGenerated":false,"isUpdatedAt":false},{"name":"isActive","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":["Timestamp",["0"]],"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":["Timestamp",["0"]],"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"UserRoletypes":{"dbName":"users_roletypes","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"role","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":["VarChar",["255"]],"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":["Text",[]],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","dbName":"created_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":["Timestamp",["0"]],"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","dbName":"updated_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":["Timestamp",["0"]],"isGenerated":false,"isUpdatedAt":true},{"name":"users_roles","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UserRoles","nativeType":null,"relationName":"UserRolesToUserRoletypes","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"UserRoles":{"dbName":"users_roles","schema":null,"fields":[{"name":"userId","dbName":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"userRoletypeId","dbName":"user_roletype_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"users","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"UserToUserRoles","relationFromFields":["userId"],"relationToFields":["id"],"relationOnUpdate":"Restrict","isGenerated":false,"isUpdatedAt":false},{"name":"users_roletypes","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UserRoletypes","nativeType":null,"relationName":"UserRolesToUserRoletypes","relationFromFields":["userRoletypeId"],"relationToFields":["id"],"relationOnUpdate":"Restrict","isGenerated":false,"isUpdatedAt":false}],"primaryKey":{"name":null,"fields":["userId","userRoletypeId"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{},"types":{}}',
);
defineDmmfProperty(exports.Prisma, config.runtimeDataModel);
config.engineWasm = undefined;
config.compilerWasm = undefined;

const { warnEnvConflicts } = require('./runtime/library.js');

warnEnvConflicts({
  rootEnvPath:
    config.relativeEnvPaths.rootEnvPath &&
    path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
  schemaEnvPath:
    config.relativeEnvPaths.schemaEnvPath &&
    path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath),
});

const PrismaClient = getPrismaClient(config);
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);

// file annotations for bundling tools to include these files
path.join(__dirname, 'libquery_engine-debian-openssl-3.0.x.so.node');
path.join(
  process.cwd(),
  'prisma/generated/client/libquery_engine-debian-openssl-3.0.x.so.node',
);
// file annotations for bundling tools to include these files
path.join(__dirname, 'schema.prisma');
path.join(process.cwd(), 'prisma/generated/client/schema.prisma');
