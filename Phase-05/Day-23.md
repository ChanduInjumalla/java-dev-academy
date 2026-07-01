# 📅 Day 23: Custom Exceptions, throws & throw

## 🎯 Goal of the Day
Learn to create custom exceptions, propagate exceptions with `throws`, and throw exceptions deliberately with `throw`.

## 📚 Topics Covered
1. throw Keyword — deliberately throwing exceptions
2. throws Keyword — declaring exceptions
3. Custom Exception Classes
4. Exception Propagation (Call Stack)
5. Chained Exceptions
6. throw vs throws

## ⏰ Key Code
```java
class InsufficientFundsException extends Exception {
    private double amount;
    public InsufficientFundsException(double amount) {
        super("Insufficient funds. Short by: ₹" + amount);
        this.amount = amount;
    }
}

class BankAccount {
    private double balance;
    void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);
        }
        balance -= amount;
    }
}
```

## ✅ End of Day Checklist
- [ ] I can create custom exceptions
- [ ] I understand throw vs throws
- [ ] I am ready for Day 24
