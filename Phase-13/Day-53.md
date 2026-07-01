# 📅 Day 53: Dependency Injection Deep Dive

## 📚 Topics
1. Constructor Injection (recommended)
2. Setter Injection
3. Field Injection (not recommended)
4. @Autowired, @Qualifier, @Primary
5. Circular Dependencies

```java
@Service
class OrderService {
    private final PaymentService paymentService;

    @Autowired  // Constructor injection — preferred!
    OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}
```

## ✅ End of Day Checklist
- [ ] I understand all DI types
- [ ] I know best practices for injection
- [ ] Ready for Day 54
