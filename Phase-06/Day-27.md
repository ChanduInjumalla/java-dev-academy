# 📅 Day 27: Thread Communication & ExecutorService

## 🎯 Goal of the Day
Master inter-thread communication (wait/notify), ExecutorService, and thread pools.

## 📚 Topics Covered
1. wait(), notify(), notifyAll()
2. Producer-Consumer Pattern
3. ExecutorService & Thread Pools
4. Callable & Future
5. ScheduledExecutorService

## ⏰ Key Code
```java
ExecutorService executor = Executors.newFixedThreadPool(3);
executor.submit(() -> System.out.println("Task 1"));
executor.submit(() -> System.out.println("Task 2"));

Future<Integer> future = executor.submit(() -> { return 42; });
System.out.println("Result: " + future.get());
executor.shutdown();
```

## ✅ End of Day Checklist
- [ ] I understand wait/notify
- [ ] I can use ExecutorService
- [ ] I am ready for Day 28
