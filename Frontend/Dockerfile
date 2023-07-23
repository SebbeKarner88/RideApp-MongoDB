FROM node:20-alpine

ENV TZ=Europe/Stockholm

RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN addgroup app && adduser -S -G app app

WORKDIR /app
RUN chown -R app:app /app

USER app

COPY --chown=app:app package.json ./

RUN npm install

COPY --chown=app:app . .

EXPOSE 5173

CMD ["npm", "run", "dev"]