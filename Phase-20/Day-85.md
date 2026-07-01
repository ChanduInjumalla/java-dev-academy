# 📅 Day 85: Dockerizing Spring Boot Applications

## 📚 Topics
1. Dockerfile for Spring Boot
2. Multi-stage builds (build JAR → run)
3. docker-compose for multi-container apps
4. Environment variables in Docker
5. Docker networking
6. Phase 20 Review

## ⏰ Key Files
```dockerfile
# Multi-stage Dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports: ["8080:8080"]
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/mydb
    depends_on: [db]
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: mydb
    ports: ["3306:3306"]
```

## ✅ Phase 20 Complete! Ready for Phase 21: Final Projects
