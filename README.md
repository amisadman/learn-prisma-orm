# Learn Prisma ORM

A hands-on learning project exploring **Prisma ORM** with PostgreSQL — covering models, data types, relationships, and CRUD operations.

---

## What is Prisma?

**Prisma** is a modern, type-safe **Object-Relational Mapping (ORM)** for Node.js and TypeScript. It simplifies database interactions by allowing you to work with JavaScript/TypeScript objects instead of writing raw SQL queries.

### Key Benefits:

- **Type Safety** — Auto-generated types from your schema
- **Easy Migrations** — Schema changes are tracked and versioned
- **Intuitive Queries** — Clean, readable syntax for database operations
- **Multi-Database Support** — PostgreSQL, MySQL, SQLite, MongoDB, etc.

---

## Model = Table

In Prisma, a **Model** represents a **Table** in your database.

| Prisma Concept | Database Equivalent |
| -------------- | ------------------- |
| Model          | Table               |
| Field          | Column              |
| Record         | Row                 |

---

## How to Declare a Model

Models are defined in the `schema.prisma` file using the following syntax:

```prisma
model table_name {
  // fields go here
}
```

### Example:

```prisma
model users {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

---

## Data Types

### Common Scalar Types

| Prisma Type | Description       | Example               |
| ----------- | ----------------- | --------------------- |
| `Int`       | Integer numbers   | `id Int`              |
| `String`    | Text data         | `name String`         |
| `Boolean`   | True/False values | `isPublished Boolean` |
| `DateTime`  | Date and time     | `createdAt DateTime`  |
| `Float`     | Decimal numbers   | `price Float`         |

---

## Attributes & Decorators

### `@id` — Primary Key

```prisma
id Int @id
```

### `@default()` — Default Values

```prisma
id Int @id @default(autoincrement())  // Auto-increment
isPublished Boolean @default(false)   // Default to false
createdAt DateTime @default(now())    // Current timestamp
```

### `@unique` — Unique Constraint

```prisma
email String @unique
```

### `@updatedAt` — Auto-update Timestamp

```prisma
updated_at DateTime @updatedAt
```

---

## Relations

### One-to-Many Relation

A user can have **many posts**, but each post belongs to **one user**.

```prisma
model users {
  id    Int    @id @default(autoincrement())
  name  String
  posts post[]  // One user has many posts
}

model post {
  id       Int   @id @default(autoincrement())
  title    String
  author   users @relation(fields: [authorId], references: [id])
  authorId Int
}
```

### One-to-One Relation

A user has **one profile**, and a profile belongs to **one user**.

```prisma
model users {
  id      Int      @id @default(autoincrement())
  name    String
  profile profile?  // Optional one-to-one
}

model profile {
  id     Int   @id @default(autoincrement())
  bio    String?
  userId Int   @unique
  user   users @relation(fields: [userId], references: [id])
}
```

### Relation Syntax Breakdown

```prisma
@relation(fields: [foreignKey], references: [primaryKey])
```

| Part         | Description                                |
| ------------ | ------------------------------------------ |
| `fields`     | The foreign key field in the current model |
| `references` | The primary key field in the related model |

---

## Enum (Enumeration)

Enums define a set of **allowed values** for a field.

### Declaration:

```prisma
enum ROLE {
  USER
  ADMIN
}
```

### Usage in Model:

```prisma
model users {
  id   Int    @id @default(autoincrement())
  name String
  role ROLE   @default(USER)
}
```

---

## CRUD Operations

### Create

```typescript
const createUser = await prisma.users.create({
  data: {
    name: "Sadman Islam",
    email: "sadman@email.com",
    role: "USER", // Optional, defaults to USER
  },
});
```

**With Relations:**

```typescript
const createPost = await prisma.post.create({
  data: {
    title: "Hello World",
    content: "This is my first post",
    isPublished: true,
    authorId: 1, // Foreign key
  },
});
```

---

### Read (Find)

**Find Many:**

```typescript
const allUsers = await prisma.users.findMany();
```

**Find Unique:**

```typescript
const user = await prisma.users.findUnique({
  where: {
    id: 1,
  },
});
```

**Find First:**

```typescript
const user = await prisma.users.findFirst({
  where: {
    email: "sadman@email.com",
  },
});
```

---

### Update

```typescript
const updateUser = await prisma.users.update({
  where: {
    id: 1,
  },
  data: {
    name: "Updated Name",
  },
});
```

**Update Many:**

```typescript
const updateMany = await prisma.users.updateMany({
  where: {
    role: "USER",
  },
  data: {
    role: "ADMIN",
  },
});
```

---

### Delete

```typescript
const deleteUser = await prisma.users.delete({
  where: {
    id: 1,
  },
});
```

**Delete Many:**

```typescript
const deleteMany = await prisma.users.deleteMany({
  where: {
    role: "USER",
  },
});
```

---

### Upsert (Update or Insert)

If the record **exists**, it **updates** it. If **not**, it **creates** a new one.

```typescript
const upsertUser = await prisma.users.upsert({
  where: {
    id: 3,
  },
  update: {
    name: "Updated Name", // If found, update this
  },
  create: {
    name: "New User", // If not found, create with these values
    email: "new@email.com",
  },
});
```

---

## Include vs Select

Both `include` and `select` are used to fetch related data, but they work differently:

### `include` — Fetch All Fields + Relations

Returns **all fields** of the model **plus** the specified relations.

```typescript
const users = await prisma.users.findMany({
  include: {
    posts: true, // Include all posts
    profile: true, // Include profile
  },
});
```

**Output includes:** `id`, `name`, `email`, `role`, `posts`, `profile`

---

### `select` — Fetch Only Specified Fields

Returns **only the fields you specify**. More efficient for large datasets.

```typescript
const users = await prisma.users.findMany({
  select: {
    id: true,
    name: true,
    posts: true, // Can also include relations
  },
});
```

**Output includes:** Only `id`, `name`, `posts` (no `email` or `role`)

---

### Nested Select with Relations

```typescript
const users = await prisma.users.findMany({
  select: {
    id: true,
    name: true,
    profile: {
      select: {
        bio: true,
      },
    },
  },
});
```

---

## Project Setup

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio (GUI)
npx prisma studio
```

---

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/orm/prisma-schema)
- [Prisma Client CRUD API](https://www.prisma.io/docs/orm/prisma-client/queries/crud)

---
