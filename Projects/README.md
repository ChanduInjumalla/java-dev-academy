# 🏗️ Projects Guide

## Project Progression

Projects are ordered from simple to complex. Each builds on previous knowledge.

---

## 🟢 Beginner Projects (Phase 1-4)

### Project 1: Scientific Calculator
**When:** Day 16 (after OOP)
**Skills:** OOP, inheritance, polymorphism, Scanner

**Requirements:**
- Basic operations: +, -, ×, ÷, %
- Advanced: power, square root, factorial
- Use abstract class for operations
- Menu-driven interface
- History of calculations

### Project 2: Student Management System (Console)
**When:** Day 16 (after OOP)
**Skills:** OOP, encapsulation, arrays/collections

**Requirements:**
- Add, view, update, delete students
- Search by name or ID
- Calculate GPA and grades
- Sort by marks or name
- Store in ArrayList

---

## 🟡 Intermediate Projects (Phase 5-9)

### Project 3: Bank Management System
**When:** Day 45 (after JDBC)
**Skills:** OOP, Collections, Exception Handling, JDBC

**Requirements:**
- Account creation with auto-generated account number
- Deposit, withdraw, balance inquiry
- Fund transfer between accounts
- Transaction history
- MySQL database storage
- Proper exception handling

### Project 4: Student Record System (File-Based)
**When:** Day 31 (after File I/O)
**Skills:** File I/O, serialization, OOP

**Requirements:**
- Read/write student data to CSV files
- Serialize student objects
- Search and filter records
- Export reports

---

## 🔴 Advanced Projects (Phase 13-18)

### Project 5: Employee Management System (Spring Boot + Thymeleaf)
**When:** Day 63 (after Spring Boot)
**Skills:** Spring Boot, Thymeleaf, Spring Data JPA

**Requirements:**
- Full CRUD web application
- Thymeleaf templates for UI
- MySQL database with JPA
- Form validation
- Pagination and sorting
- Search functionality

### Project 6: Library Management REST API
**When:** Day 68 (after REST APIs)
**Skills:** Spring Boot, REST, JPA, Validation

**Requirements:**
- RESTful API for managing books
- Borrow/return functionality
- Swagger documentation
- Global error handling
- Request validation
- Pagination

### Project 7: Inventory Management System
**When:** Day 73 (after JPA)
**Skills:** Spring Boot, JPA, complex relationships

**Requirements:**
- Products, Categories, Suppliers
- Complex entity relationships
- Custom queries with @Query
- Auditing (timestamps)
- Reports and analytics

### Project 8: Secured REST API with JWT
**When:** Day 77 (after Security)
**Skills:** Spring Security, JWT, REST

**Requirements:**
- User registration and login
- JWT token-based authentication
- Role-based access control
- Password encryption
- Token refresh

---

## ⚫ Industry-Level Projects (Phase 21)

### Project 9: E-Commerce Backend
**When:** Days 86-88 (Final Project)
**Skills:** Everything combined!

**Requirements:**
- **User Module:** Registration, Login, Profile (JWT auth)
- **Product Module:** CRUD, categories, search, filtering
- **Cart Module:** Add/remove items, quantity management
- **Order Module:** Place order, order history, status tracking
- **Payment Module:** Payment integration stub
- **Admin Module:** Dashboard, user management, reports

**Technical Requirements:**
- Spring Boot 3.x
- Spring Security + JWT
- Spring Data JPA + MySQL
- RESTful APIs with Swagger
- Input validation
- Global exception handling
- Unit & integration tests
- Docker containerization
- Proper logging
- README with API docs

---

## 📋 Project Template

For each project, follow this structure:

```
project-name/
├── src/main/java/com/yourname/project/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── dto/
│   ├── exception/
│   ├── config/
│   └── Application.java
├── src/main/resources/
│   ├── application.yml
│   └── templates/ (if Thymeleaf)
├── src/test/java/
├── Dockerfile
├── docker-compose.yml
├── pom.xml
└── README.md
```

## 🎯 Tips for Building Projects

1. **Plan before coding** — Draw entity diagrams, plan APIs
2. **Start small** — Get basic CRUD working first, then add features
3. **Use Git** — Commit regularly with meaningful messages
4. **Write tests** — At least basic unit tests
5. **Document** — Add README with setup instructions
6. **Deploy** — Push to GitHub, containerize with Docker
7. **Show it off** — Add to your resume and portfolio
