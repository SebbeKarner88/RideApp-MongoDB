FROM node:20-alpine

RUN addgroup app && adduser -S -G app app

WORKDIR /app
RUN chown -R app:app /app

USER app

COPY --chown=app:app package.json ./

RUN npm install

COPY --chown=app:app . .

EXPOSE 5173

CMD ["npm", "run", "dev"]