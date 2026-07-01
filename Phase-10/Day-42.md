# 📅 Day 42: JDBC Fundamentals

## 🎯 Goal of the Day
Connect Java to MySQL using JDBC (Java Database Connectivity).

## 📚 Topics Covered
1. JDBC Architecture
2. DriverManager, Connection, Statement, ResultSet
3. Loading Driver & Establishing Connection
4. Executing Queries
5. Processing Results
6. Closing Resources

## ⏰ Key Code
```java
String url = "jdbc:mysql://localhost:3306/studentdb";
String user = "root";
String password = "password";

try (Connection conn = DriverManager.getConnection(url, user, password);
     Statement stmt = conn.createStatement();
     ResultSet rs = stmt.executeQuery("SELECT * FROM students")) {

    while (rs.next()) {
        System.out.println(rs.getInt("id") + " - " + rs.getString("name"));
    }
} catch (SQLException e) {
    e.printStackTrace();
}
```

## ✅ End of Day Checklist
- [ ] I can connect Java to MySQL
- [ ] I can execute queries and process results
- [ ] I am ready for Day 43
