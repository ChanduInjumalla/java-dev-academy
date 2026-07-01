# 📅 Day 46: Maven Fundamentals

## 🎯 Goal of the Day
Begin **Phase 11: Build Tools**. Master Maven — the most popular Java build tool.

## 📚 Topics Covered
1. What is Maven? Why build tools?
2. POM.xml — Project Object Model
3. Maven Project Structure
4. Dependencies & Repositories
5. Maven Lifecycle (validate, compile, test, package, install, deploy)
6. Maven Plugins

## ⏰ Key Code (pom.xml)
```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.company</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0.0</version>

    <dependencies>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.33</version>
        </dependency>
    </dependencies>
</project>
```

## ✅ End of Day Checklist
- [ ] I can create Maven projects
- [ ] I understand POM.xml and dependencies
- [ ] I am ready for Day 47
