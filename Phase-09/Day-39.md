# 📅 Day 39: Design Patterns (Part 1)

## 🎯 Goal of the Day
Learn the most important design patterns used in Java enterprise applications.

## 📚 Topics Covered
1. What are Design Patterns? (Gang of Four)
2. Creational: Singleton Pattern
3. Creational: Factory Pattern
4. Creational: Builder Pattern
5. Behavioral: Observer Pattern
6. When to use each pattern

## ⏰ Key Code
```java
// Singleton (Thread-safe)
class Database {
    private static volatile Database instance;
    private Database() {}
    static Database getInstance() {
        if (instance == null) {
            synchronized (Database.class) {
                if (instance == null) instance = new Database();
            }
        }
        return instance;
    }
}

// Builder Pattern
class User {
    private final String name, email;
    private final int age;
    private User(Builder b) { name = b.name; email = b.email; age = b.age; }
    static class Builder {
        String name, email; int age;
        Builder name(String n) { name = n; return this; }
        Builder email(String e) { email = e; return this; }
        Builder age(int a) { age = a; return this; }
        User build() { return new User(this); }
    }
}
User user = new User.Builder().name("Chandu").email("c@g.com").age(22).build();
```

## ✅ End of Day Checklist
- [ ] I understand Singleton, Factory, Builder patterns
- [ ] I am ready for Day 40
