# Contributing

## Requirements

- [bun](https://bun.sh) or [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

## Developer Setup

Rename `.env.example` to `.env.local` and fill in the values:

- DB_CONNECTION_STRING - MongoDB connection string in the format `mongodb://<username>:<password>@<host>:<port>/<database>`
- IMAGE_UPLOAD_PUBLIC_PATH - The public path where images will be uploaded to, relative to `public/`
- INTERNAL_SECRET - A secret string used for internal operations (subject to change)

Clone the repository and install dependencies:

```bash
git clone https://github.com/felipemullen/keep-nothing
cd keep-nothing
bun install
bun run dev
```
