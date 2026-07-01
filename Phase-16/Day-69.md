# 📅 Day 69: JPA & Hibernate Introduction

## 🎯 Goal of the Day
Begin **Phase 16: Spring Data JPA + Hibernate**. Understand ORM and entity mapping.

## 📚 Topics Covered
1. What is ORM? (Object-Relational Mapping)
2. JPA vs Hibernate
3. Entity mapping: @Entity, @Table, @Id, @GeneratedValue
4. @Column annotations
5. Spring Data JPA setup
6. H2 in-memory database for development

## ⏰ Key Code
```java
@Entity
@Table(name = "employees")
class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String email;

    private Double salary;
    // Getters, setters, constructors
}

interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByName(String name);
    List<Employee> findBySalaryGreaterThan(Double salary);
}
```

## ✅ Ready for Day 70
