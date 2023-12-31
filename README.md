# sparta-overflow

## Environment variable

- SERVER_PORT: A number of server port
- DATABASE_URL: Address of database for connecting to Prisma
- PASSWORD_HASH_SALT_ROUNDS: Strength of security for bcrypt salt 
- JWT_ACCESS_TOKEN_SECRET: Password for JWT ACCESSTOKEN

## Example

```bash
SERVER_PORT=3000
DATABASE_URL="mysql://root:rootpassword@database-domain.com:3306/db-name"
PASSWORD_HASH_SALT_ROUNDS=10
JWT_ACCESS_TOKEN_SECRET="jwt-select-key"
```

## How to run

```bash
yarn
yarn run dev
```

## ERD diagram
https://drawsql.app/teams/1-510/diagrams/sparta-overflow

## API statement
https://docs.google.com/spreadsheets/d/1gnCp_Eu1T1Fa-bvZhDOJY4NLJKHzVTbUQafOPtP7vaQ/edit#gid=0