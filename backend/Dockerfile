# Start from an official Maven image to build the app
FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app
COPY . .

# Build the application
RUN mvn clean package

# Use a lighter image for running the app
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port Spring Boot will run on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
