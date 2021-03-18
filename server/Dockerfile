FROM node:15

#create folder in container nama appls
WORKDIR /app

#copy everything to /app (not ideal cuz everything including node_modules)
COPY . .

#to make node_modules exclude from copy, create .dockerignore
RUN npm install

#run command when container created
CMD [ "npm", "start"]