# 📅 Day 52: Spring Framework — Introduction & IoC

## 🎯 Goal of the Day
Begin **Phase 13: Spring Framework** — the backbone of enterprise Java.

## 📚 Topics Covered
1. What is Spring? Why Spring?
2. Inversion of Control (IoC) — the core principle
3. Dependency Injection (DI) — IoC in practice
4. Spring Container (ApplicationContext)
5. XML vs Annotation vs Java Config
6. First Spring Application

## Key Concept
IoC means the framework controls object creation and wiring, not you. DI means dependencies are injected into objects rather than created by them.

```java
@Component
class UserService {
    @Autowired
    private UserRepository userRepository;
    // Spring creates and injects the repository!
}
```

## ✅ End of Day Checklist
- [ ] I understand IoC and DI concepts
- [ ] I am ready for Day 53
