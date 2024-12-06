# Use the official OpenJDK image from Docker Hub
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled JAR file into the container
COPY target/report-service-0.0.1-SNAPSHOT.jar /app/report-service-0.0.1-SNAPSHOT.jar

# Expose the port your Spring Boot app will run on
EXPOSE 8081

# Command to run the Spring Boot app
ENTRYPOINT ["java", "-jar", "/app/report-service-0.0.1-SNAPSHOT.jar"]