# Xen-electronic open API

# Steps to run this project on docker container:
1. Run docker-compose.yml => `docker-compose up -d`
2. Create migration tables => `docker exec server_server_1 npm run typeorm migration:run`
3. Run seed => `docker exec server_server_1 npm run seed`

# Run this on local machine
1. Go to `ormconfig.json` 
2. Change `"host"` to `"localhost"`
3. and run `npm install`

then you can go to web folder to run react js app or check API docs on [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
