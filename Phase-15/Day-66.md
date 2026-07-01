# 📅 Day 66: Request Validation & Global Error Handling

## 📚 Topics Covered
1. Bean Validation (JSR-380): @NotNull, @NotBlank, @Size, @Email, @Min, @Max
2. @Valid annotation
3. BindingResult for validation errors
4. @ControllerAdvice & @ExceptionHandler
5. Global Exception Handler
6. Custom error response format

## ⏰ Key Code
```java
@ControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse("NOT_FOUND", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
            .forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
        return ResponseEntity.badRequest().body(new ErrorResponse("VALIDATION_FAILED", errors));
    }
}
```

## ✅ Ready for Day 67
