# 📅 Day 47: Gradle Fundamentals

## 🎯 Goal of the Day
Master Gradle — the modern, flexible build tool gaining rapid adoption.

## 📚 Topics Covered
1. What is Gradle? Maven vs Gradle
2. build.gradle (Groovy DSL)
3. Gradle Project Structure
4. Dependencies & Repositories
5. Gradle Tasks
6. Gradle Wrapper

## ⏰ Key Code (build.gradle)
```groovy
plugins {
    id 'java'
    id 'application'
}
repositories {
    mavenCentral()
}
dependencies {
    implementation 'mysql:mysql-connector-java:8.0.33'
    testImplementation 'org.junit.jupiter:junit-jupiter:5.9.3'
}
application {
    mainClass = 'com.company.Main'
}
```

## ✅ End of Day Checklist
- [ ] I can create Gradle projects
- [ ] I know Maven vs Gradle differences
- [ ] I am ready for Day 48
