
FROM openjdk:17-alpine
ARG JAR_FILE=target/MongoDB-Testprogram-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} MongoDB.jar
ENTRYPOINT ["java","-jar","/MongoDB.jar"]
EXPOSE 8080