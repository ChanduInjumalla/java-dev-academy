# 📅 Day 26: Synchronization & Thread Safety

## 🎯 Goal of the Day
Understand race conditions, synchronization, locks, and deadlocks.

## 📚 Topics Covered
1. Race Conditions — what can go wrong
2. synchronized Keyword (methods and blocks)
3. Intrinsic Locks & Monitor
4. Deadlock — causes and prevention
5. Thread-safe vs Non-thread-safe
6. volatile Keyword

## ⏰ Key Code
```java
class BankAccount {
    private int balance = 1000;

    synchronized void withdraw(int amount) {
        if (balance >= amount) {
            balance -= amount;
        }
    }

    synchronized int getBalance() { return balance; }
}
```

## ✅ End of Day Checklist
- [ ] I understand race conditions and synchronization
- [ ] I can use synchronized keyword
- [ ] I am ready for Day 27
