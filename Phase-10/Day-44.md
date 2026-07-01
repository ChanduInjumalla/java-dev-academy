# 📅 Day 44: DAO Pattern & Connection Pooling

## 🎯 Goal of the Day
Learn the Data Access Object pattern and connection pooling for production-ready database access.

## 📚 Topics Covered
1. DAO Pattern — separating database logic
2. StudentDAO Interface & Implementation
3. Connection Pooling (HikariCP)
4. Database Configuration Best Practices
5. Repository Pattern Introduction

## ⏰ Key Code
```java
interface StudentDAO {
    void insert(Student student);
    Student findById(int id);
    List<Student> findAll();
    void update(Student student);
    void delete(int id);
}

class StudentDAOImpl implements StudentDAO {
    private final DataSource dataSource;
    // Implementation using PreparedStatement
}
```

## ✅ End of Day Checklist
- [ ] I understand the DAO pattern
- [ ] I know about connection pooling
- [ ] I am ready for Day 45
