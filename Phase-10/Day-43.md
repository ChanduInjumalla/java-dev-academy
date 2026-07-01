# 📅 Day 43: PreparedStatement & Transactions

## 🎯 Goal of the Day
Master PreparedStatement for security and transactions for data integrity.

## 📚 Topics Covered
1. PreparedStatement — parameterized queries
2. SQL Injection Prevention
3. CRUD with PreparedStatement
4. Transactions (ACID properties)
5. commit(), rollback(), setAutoCommit()
6. Batch Processing

## ⏰ Key Code
```java
// PreparedStatement — safe from SQL injection!
String sql = "INSERT INTO students (name, email, gpa) VALUES (?, ?, ?)";
try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, "Alice");
    pstmt.setString(2, "alice@email.com");
    pstmt.setDouble(3, 9.2);
    pstmt.executeUpdate();
}

// Transaction
conn.setAutoCommit(false);
try {
    // Multiple operations
    stmt1.executeUpdate();
    stmt2.executeUpdate();
    conn.commit();  // All succeed
} catch (SQLException e) {
    conn.rollback();  // All fail
}
```

## ✅ End of Day Checklist
- [ ] I can use PreparedStatement
- [ ] I understand SQL injection and prevention
- [ ] I understand transactions
- [ ] I am ready for Day 44
