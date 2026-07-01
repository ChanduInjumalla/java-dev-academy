# 📅 Day 76: JWT Authentication

## 📚 Topics
1. What is JWT? Token structure (Header.Payload.Signature)
2. JWT workflow (login → token → authenticate)
3. JwtTokenProvider utility class
4. JwtAuthenticationFilter
5. Securing REST APIs with JWT
6. Token refresh strategy

## ⏰ Key Flow
```
Client → POST /api/auth/login (username, password)
Server → Validates credentials → Returns JWT token
Client → GET /api/employees (Authorization: Bearer <token>)
Server → Validates JWT → Returns data
```

## ✅ Ready for Day 77
