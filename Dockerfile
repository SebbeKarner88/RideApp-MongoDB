
FROM eclipse-temurin:17-jdk-alpine
ENV TZ=Europe/Stockholm

RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ARG JAR_FILE=target/MongoDB-Testprogram-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} MongoDB.jar
ENTRYPOINT ["java","-jar","/MongoDB.jar"]
EXPOSE 8080