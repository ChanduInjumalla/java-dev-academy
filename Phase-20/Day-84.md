# 📅 Day 84: Docker Fundamentals

## 🎯 Begin **Phase 20: Docker Basics**.

## 📚 Topics
1. What is Docker? Containers vs VMs
2. Docker Architecture (daemon, client, registry)
3. Docker Images & Containers
4. Dockerfile — building custom images
5. Docker commands (build, run, stop, rm, logs, exec)
6. Docker Hub

## ⏰ Key Commands
```bash
# Build image
docker build -t my-java-app .

# Run container
docker run -d -p 8080:8080 --name app my-java-app

# View logs
docker logs app

# Stop and remove
docker stop app && docker rm app
```

## ✅ Ready for Day 85
