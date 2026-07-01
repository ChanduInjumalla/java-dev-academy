# 📅 Day 20: Queue, Deque, Stack, PriorityQueue

## 🎯 Goal of the Day
Master Queue (FIFO), Stack (LIFO), Deque (double-ended), and PriorityQueue data structures.

## 📚 Topics Covered
1. Queue Interface — FIFO
2. LinkedList as Queue
3. ArrayDeque
4. PriorityQueue (Min-Heap)
5. Stack Class (Legacy) & Deque as Stack
6. Real-World Use Cases

## ⏰ Hour-by-Hour Study Plan (6 Hours)

### Key Code Examples
```java
Queue<String> queue = new LinkedList<>();
queue.offer("First"); queue.offer("Second");
queue.poll();  // "First" — FIFO

Deque<Integer> stack = new ArrayDeque<>();
stack.push(1); stack.push(2); stack.push(3);
stack.pop();   // 3 — LIFO

PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(30); pq.offer(10); pq.offer(20);
pq.poll();  // 10 — smallest first (min-heap)
```

## ✅ End of Day Checklist
- [ ] I understand Queue, Stack, Deque, PriorityQueue
- [ ] I know when to use each
- [ ] I am ready for Day 21
