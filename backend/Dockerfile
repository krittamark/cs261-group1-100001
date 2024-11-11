FROM openjdk:24-jdk-slim

COPY ./target/crudAPI-0.0.1-SNAPSHOT.jar backend-api.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/backend-api.jar"]