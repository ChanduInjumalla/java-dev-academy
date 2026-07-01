# 📅 Day 38: Annotations & Reflection

## 🎯 Goal of the Day
Understand annotations (metadata for code) and the Reflection API (inspecting classes at runtime).

## 📚 Topics Covered
1. Built-in Annotations (@Override, @Deprecated, @SuppressWarnings, @FunctionalInterface)
2. Custom Annotations
3. Meta-Annotations (@Target, @Retention)
4. Reflection API — inspecting classes at runtime
5. Getting class info, methods, fields via reflection
6. When to use reflection (frameworks like Spring)

## ⏰ Key Code
```java
// Custom annotation
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface LogExecution {
    String value() default "default";
}

// Reflection
Class<?> clazz = Employee.class;
System.out.println("Class: " + clazz.getName());
for (Method m : clazz.getDeclaredMethods()) {
    System.out.println("Method: " + m.getName());
}
```

## ✅ End of Day Checklist
- [ ] I understand annotations and can create custom ones
- [ ] I understand reflection basics
- [ ] I am ready for Day 39
