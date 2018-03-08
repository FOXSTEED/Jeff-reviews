FROM node:9.7.0
RUN mkdir -p /reviews
WORKDIR /reviews
COPY . /reviews/
RUN npm install
EXPOSE 3001
CMD ["npm", "start"]