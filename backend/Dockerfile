# Use an official Maven image as a build stage to compile the application
FROM maven:3.8.5-openjdk-17 AS build

# Set working directory
WORKDIR /app

# Copy the project files
COPY . .

# Package the application
RUN mvn clean package -DskipTests

# Use an official OpenJDK runtime as the final image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the built jar file from the previous build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
