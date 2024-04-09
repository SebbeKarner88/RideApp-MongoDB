
FROM eclipse-temurin:17-jdk-alpine

VOLUME /tmp

COPY target/MongoDB-Testprogram-0.0.1-SNAPSHOT.jar MongoDB.jar
ENTRYPOINT ["java","-jar","/MongoDB.jar"]
EXPOSE 10000