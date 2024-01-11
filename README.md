# Development

## Steps to star working in dev mode

1. Install dependencies:

```bash
pnpm i
# or
npm i
# or
yarn
```

2. Build up database (Docker desktop required):

```bash
docker compose up -d
```

3. Create a copy of .env.template file and rename to .env
4. Replace environment variables with your values
5. Execute these commands of Prisma:

```bash
pnpm dlx prisma migrate dev
pnpm dlx generate
# or
npx prisma migrate dev
npx generate
# or
yarn prisma migrate dev
yarn generate
```

6. To create the local database with artificial data (SEED) send a GET request in the following endpoint [localhost:3000/api/seed](localhost:3000/api/seed)

7. Run the project:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

## Prisma commands

### Init Prisma in the project

<!-- Este comando iniciara prisma en el proyecto, creara un archivo .env si no lo tenemos con la variable de entorno a la base de datos y una carpeta en el root llamada "prisma" con un archivo para agregar las configuraciones de modelos, etc -->

```bash
pnpm dlx prisma init
# or
npx prisma init
# or
yarn prisma init
```

### Migrate Prisma model with the database

<!-- Este comando hara que cuando creemos un elemento en la base de datos, Prisma verifique si lo que se esta enviando coincide con el modelo en el archivo "schema.prisma" antes de almacenarlo en la DB.
Recordar que cada vez que hagamos un cambio en el archivo de prisma habrá que realizar la migración nuevamente -->

```bash
pnpm dlx prisma migrate dev
# or
npx prisma migrate dev
# or
yarn prisma migrate dev
```

### Generate Prisma Client

<!-- Esto nos generara un cliente de prisma para poder manipular la base de datos -->

```bash
pnpm dlx generate
# or
npx generate
# or
yarn generate
```

## Prod

## Stage
