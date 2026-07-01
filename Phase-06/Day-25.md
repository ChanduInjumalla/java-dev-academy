# 📅 Day 25: Multithreading — Thread Basics

## 🎯 Goal of the Day
Begin **Phase 6: Multithreading**. Understand threads, thread lifecycle, and how to create threads using Thread class and Runnable interface.

## 📚 Topics Covered
1. What is Multithreading? (Process vs Thread)
2. Thread Class — extending Thread
3. Runnable Interface — implementing Runnable
4. Thread Lifecycle (NEW, RUNNABLE, RUNNING, BLOCKED, TERMINATED)
5. Thread Methods (start, run, sleep, join, yield)
6. Thread Priority

## ⏰ Key Code
```java
// Method 1: Extend Thread
class MyThread extends Thread {
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
            try { Thread.sleep(500); } catch (InterruptedException e) {}
        }
    }
}

// Method 2: Implement Runnable (preferred)
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Running in: " + Thread.currentThread().getName());
    }
}

// Using Lambda (best for simple tasks)
Thread t = new Thread(() -> System.out.println("Lambda thread!"));
t.start();
```

## ✅ End of Day Checklist
- [ ] I understand processes vs threads
- [ ] I can create threads using Thread and Runnable
- [ ] I understand thread lifecycle
- [ ] I am ready for Day 26
