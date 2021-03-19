# Xen-electronic

To run this application, first you need to run the web api end points and then run the web client

## Packages:
### Server:
- Node.js
- Typescript
- PostgreSQL
- Typeorm
- Swagger

### Web:
- React js

## Installation:
1. Clone project `https://github.com/goacgras/xen-electronic.git`
2. Cd to server
3. Run docker-compose.yml => `docker-compose up -d`
4. Create migration tables => `docker exec server_server_1 npm run typeorm migration:run`
5. Run seed => `docker exec server_server_1 npm run seed`
6. Cd to web
7. Install dependency `npm install`
8. Start the web `npm start`
