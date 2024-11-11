FROM openjdk:16-alpine

COPY ./target/backend-api.jar backend-api.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/backend-api.jar"]