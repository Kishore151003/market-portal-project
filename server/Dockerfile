# Start from base image
FROM openjdk:17-jdk-slim

# Set working dir
WORKDIR /app

# Copy project files
COPY . .

# ✅ Add this line to fix permission issue
RUN chmod +x ./mvnw

# Package the app
RUN ./mvnw clean package -DskipTests

# Run the jar
CMD ["java", "-jar", "target/marketportal-0.0.1-SNAPSHOT.jar"]
