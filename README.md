# Development

## Steps to star working in dev mode

1. Up database:

```bash
docker compose up -d
```

2. Rename .env.template file to .env
3. Replace environment variables
4. Execute SEED to [create the local data base](localhost:3000/api/seed)

## Prisma commands

### Init Prisma in the project

<!-- Este comando iniciara prisma en el proyecto, creara un archivo .env si no lo tenemos con la variable de entorno a la base de datos y una carpeta en el root llamada "prisma" con un archivo para agregar las configuraciones de modelos, etc -->

```bash
pnpm dlx prisma init
```

### Migrate Prisma model with the database

<!-- Este comando hara que cuando creemos un elemento en la base de datos, Prisma verifique si lo que se esta enviando coincide con el modelo en el archivo "schema.prisma" antes de almacenarlo en la DB.
Recordar que cada vez que hagamos un cambio en el archivo de prisma habrá que realizar la migración nuevamente -->

```bash
pnpm dlx prisma migrate dev
```

### Generate Prisma Client

<!-- Esto nos generara un cliente de prisma para poder manipular la base de datos -->

```bash
pnpm dlx generate
```

## Prod

## Stage
