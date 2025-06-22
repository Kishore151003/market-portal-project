# Use OpenJDK 17 base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Package the app using Maven
RUN ./mvnw clean package -DskipTests

# Run the app
CMD ["java", "-jar", "target/marketportal-0.0.1-SNAPSHOT.jar"]
