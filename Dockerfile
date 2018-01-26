FROM node:8

ARG NODE_ENV=production

ENV NODE_ENV=production
ENV PORT=8080

# npm install
ADD package.json /tmp/package.json
COPY .npmrc /tmp/.npmrc

RUN cd /tmp && npm install
RUN rm -f /tmp/.npmrc

RUN mkdir -p /opt/app-root && cp -a /tmp/node_modules /opt/app-root/

WORKDIR /opt/app-root/
COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
