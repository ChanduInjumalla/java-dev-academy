# 📅 Day 24: Exception Best Practices & try-with-resources

## 🎯 Goal of the Day
Learn exception handling best practices, try-with-resources (AutoCloseable), logging, and anti-patterns to avoid.

## 📚 Topics Covered
1. try-with-resources (Java 7+)
2. AutoCloseable Interface
3. Exception Best Practices
4. Exception Anti-Patterns (what NOT to do)
5. Logging Exceptions
6. Phase 5 Review

## ⏰ Key Code
```java
// try-with-resources — auto-closes resources
try (Scanner scanner = new Scanner(new File("data.txt"))) {
    while (scanner.hasNextLine()) {
        System.out.println(scanner.nextLine());
    }
} catch (FileNotFoundException e) {
    System.err.println("File not found: " + e.getMessage());
}
// scanner is automatically closed here, even if exception occurs
```

### Best Practices
1. ✅ Catch specific exceptions, not generic Exception
2. ✅ Use try-with-resources for closeable resources
3. ✅ Log exceptions with meaningful messages
4. ❌ Don't catch and ignore (empty catch blocks)
5. ❌ Don't use exceptions for control flow
6. ❌ Don't catch Throwable or Error

## ✅ End of Day Checklist — Phase 5 Complete!
- [ ] I can handle exceptions properly
- [ ] I understand try-with-resources
- [ ] I know exception best practices
- [ ] Ready for Phase 6: Multithreading
