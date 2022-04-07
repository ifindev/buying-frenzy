## Knex Commands

- Migrate Up Specific migration file

```bash
npx knex migrate:up migrations_name --knexfile ./src/db/knexfile.ts
```

- Creating migration file

```bash
npx knex migrate:make migrations_name --migrations-directory src/db/migrations -x ts
```

- Creating seed file

```bash
npx knex seed:make seed_file_name --knexfile ./src/db/knexfile.ts -x ts
```

- Seed Specific Files:

```bash
npx knex seed:run --specific=seed-filename.js --specific=another-seed-filename.js --knexfile ./src/db/knexfile.ts
```
