FROM node:9.7.0
RUN mkdir -p /Jeff-reviews
WORKDIR /Jeff-reviews
COPY . /Jeff-reviews/
RUN npm install
EXPOSE 3001
CMD ["npm", "start"]