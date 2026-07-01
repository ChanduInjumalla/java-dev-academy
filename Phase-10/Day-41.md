# 📅 Day 41: SQL & MySQL Basics

## 🎯 Goal of the Day
Begin **Phase 10: Database**. Learn SQL fundamentals using MySQL.

## 📚 Topics Covered
1. Relational Database Concepts
2. MySQL Installation & Setup
3. SQL: CREATE DATABASE, CREATE TABLE
4. SQL: INSERT, SELECT, UPDATE, DELETE
5. WHERE, ORDER BY, LIMIT
6. SQL Joins (INNER, LEFT, RIGHT)

## ⏰ Key SQL
```sql
CREATE DATABASE studentdb;
USE studentdb;
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    gpa DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO students (name, email, gpa) VALUES ('Chandu', 'c@g.com', 8.5);
SELECT * FROM students WHERE gpa > 8.0 ORDER BY gpa DESC;
```

## ✅ End of Day Checklist
- [ ] MySQL is installed and running
- [ ] I can write CRUD SQL queries
- [ ] I am ready for Day 42
