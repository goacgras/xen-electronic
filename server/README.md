# Xen-electronic open API

Steps to run this project:

On docker container, after pull / copy file to editor

1. Run docker-compose.yml => `docker-compose up -d`
2. Create migration tables => `docker exec server_server_1 npm run typeorm migration:run`
3. Run seed => `docker exec server_server_1 npm run seed`

then you can go to web folder to run react js app or check API docs on [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
