# 📅 Day 22: Exception Handling — try-catch-finally

## 🎯 Goal of the Day
Begin **Phase 5: Exception Handling**. Learn to write robust, crash-resistant code by handling runtime errors gracefully.

## 📚 Topics Covered
1. What are Exceptions? (vs Errors)
2. Exception Hierarchy (Throwable → Error / Exception)
3. Checked vs Unchecked Exceptions
4. try-catch Block
5. finally Block
6. Multiple catch Blocks
7. Multi-catch (Java 7+)
8. Common Exception Types

## ⏰ Hour-by-Hour Study Plan (6 Hours)

### Exception Hierarchy
```
Throwable
├── Error (serious, don't catch)
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── VirtualMachineError
└── Exception
    ├── RuntimeException (unchecked)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   ├── ArithmeticException
    │   ├── ClassCastException
    │   └── IllegalArgumentException
    └── Checked Exceptions
        ├── IOException
        ├── FileNotFoundException
        ├── SQLException
        └── ClassNotFoundException
```

### Key Code
```java
try {
    int result = 10 / 0;  // ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero: " + e.getMessage());
} catch (Exception e) {
    System.out.println("General error: " + e.getMessage());
} finally {
    System.out.println("This ALWAYS runs");  // Cleanup code
}
```

## ✅ End of Day Checklist
- [ ] I understand the exception hierarchy
- [ ] I can use try-catch-finally
- [ ] I know checked vs unchecked exceptions
- [ ] I am ready for Day 23
