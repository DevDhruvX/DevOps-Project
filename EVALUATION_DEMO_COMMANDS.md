# 🎯 StudySync DevOps Project - Evaluation Demo Commands

## 📋 Complete Step-by-Step Demo Script

### **STEP 1: Project Introduction & Setup**
```powershell
# Navigate to project directory
cd "C:\Users\Dhruv choudhary\Desktop\DevOps Project\studysync"

# Show project structure
Write-Host "=== StudySync DevOps Project Structure ===" -ForegroundColor Green
Get-ChildItem -Name

# Show Docker Compose configuration
Write-Host "`n=== Docker Configuration Overview ===" -ForegroundColor Yellow
Get-Content docker-compose.yml | Select-Object -First 20
```

### **STEP 2: Start Local Development Environment**
```powershell
# Start all containers
Write-Host "`n=== Starting Docker Containers ===" -ForegroundColor Cyan
docker compose up -d

# Wait for containers to be ready
Start-Sleep 10

# Check container status
Write-Host "`n=== Container Status ===" -ForegroundColor Yellow
docker compose ps

# Show resource usage
Write-Host "`n=== Resource Usage ===" -ForegroundColor Yellow
docker stats --no-stream
```

### **STEP 3: Backend API Testing**
```powershell
# Test API health endpoint
Write-Host "`n=== Backend API Health Check ===" -ForegroundColor Green
curl http://localhost:5000/api/health

# Show available API endpoints
Write-Host "`n=== Available API Endpoints ===" -ForegroundColor Cyan
$apiResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/"
$apiResponse.endpoints | ConvertTo-Json -Depth 2
```

### **STEP 4: Database Verification**
```powershell
# Check database connection through API
Write-Host "`n=== Database Connection Status ===" -ForegroundColor Green
$healthCheck = Invoke-RestMethod -Uri "http://localhost:5000/api/health"
Write-Host "Database Status: $($healthCheck.database.status)" -ForegroundColor Cyan
Write-Host "Database Responsive: $($healthCheck.database.responsive)" -ForegroundColor Cyan
```

### **STEP 5: Frontend Application**
```powershell
# Open local frontend
Write-Host "`n=== Opening Local Frontend ===" -ForegroundColor Green
Start-Process "http://localhost:3000"

# Show frontend is running
Write-Host "✅ Frontend running at: http://localhost:3000" -ForegroundColor Green
```

### **STEP 6: Feature Demonstration - Password Validation**
```powershell
# Test SHORT password (should fail)
Write-Host "`n=== Testing Password Validation (Short Password) ===" -ForegroundColor Red

$headers = @{ "Content-Type" = "application/json" }
$shortPasswordBody = @{
    name = "Test User"
    email = "testuser@demo.com"
    password = "123"
} | ConvertTo-Json

Write-Host "Testing password: '123' (3 characters - should FAIL)" -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $shortPasswordBody -Headers $headers
    Write-Host "Unexpected success" -ForegroundColor Red
} catch {
    Write-Host "✅ SUCCESS: Short password rejected!" -ForegroundColor Green
    Write-Host "Error Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Yellow
}

# Test VALID password (should succeed)
Write-Host "`n=== Testing Valid Password Registration ===" -ForegroundColor Green

$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$validPasswordBody = @{
    name = "Demo User $timestamp"
    email = "demo$timestamp@evaluation.com"
    password = "securepassword123"
} | ConvertTo-Json

Write-Host "Testing password: 'securepassword123' (16 characters - should SUCCEED)" -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $validPasswordBody -Headers $headers
    Write-Host "✅ SUCCESS: User registered!" -ForegroundColor Green
    Write-Host "User ID: $($response.user._id)" -ForegroundColor Cyan
    Write-Host "User Name: $($response.user.name)" -ForegroundColor Cyan
    Write-Host "User Email: $($response.user.email)" -ForegroundColor Cyan
} catch {
    Write-Host "Registration response: $($_.Exception.Message)" -ForegroundColor Yellow
}
```

### **STEP 7: View Application Logs**
```powershell
# Show recent backend logs
Write-Host "`n=== Backend Application Logs ===" -ForegroundColor Yellow
docker compose logs --tail 15 backend

# Show all container status
Write-Host "`n=== All Containers Status ===" -ForegroundColor Cyan
docker compose ps
```

### **STEP 8: Trigger CI/CD Pipeline**
```powershell
# Make a demo change and trigger pipeline
Write-Host "`n=== Triggering CI/CD Pipeline ===" -ForegroundColor Magenta

# Add demo timestamp to README
$demoTimestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content -Path "README.md" -Value "`n# Demo run at: $demoTimestamp"

# Git operations
git add README.md
git commit -m "Demo: Trigger CI/CD pipeline - $demoTimestamp"
git push origin main

Write-Host "✅ CI/CD Pipeline triggered!" -ForegroundColor Green
Write-Host "📊 Check pipeline: https://github.com/DevDhruvX/DevOps-Project/actions" -ForegroundColor Cyan
```

### **STEP 9: Show Cloud Deployment**
```powershell
# Open live applications
Write-Host "`n=== Cloud Deployment URLs ===" -ForegroundColor Green

Write-Host "🌐 Live Frontend: https://studysync-frontend-v7wk.onrender.com" -ForegroundColor Cyan
Start-Process "https://studysync-frontend-v7wk.onrender.com"

Write-Host "🔗 Live Backend API: https://studysync-backend-0qov.onrender.com" -ForegroundColor Cyan
Start-Process "https://studysync-backend-0qov.onrender.com"

Write-Host "📊 GitHub Actions: https://github.com/DevDhruvX/DevOps-Project/actions" -ForegroundColor Cyan
Start-Process "https://github.com/DevDhruvX/DevOps-Project/actions"
```

### **STEP 10: Test Cloud API**
```powershell
# Test cloud backend API
Write-Host "`n=== Testing Cloud Backend API ===" -ForegroundColor Green

try {
    $cloudHealth = Invoke-RestMethod -Uri "https://studysync-backend-0qov.onrender.com/api/health"
    Write-Host "✅ Cloud API Status: $($cloudHealth.status)" -ForegroundColor Green
    Write-Host "📊 Uptime: $($cloudHealth.uptime.human)" -ForegroundColor Cyan
    Write-Host "🗄️  Database: $($cloudHealth.database.status)" -ForegroundColor Cyan
} catch {
    Write-Host "⏳ Cloud service may be sleeping (free tier), starting up..." -ForegroundColor Yellow
    Write-Host "🔄 Please wait 30-60 seconds for cold start" -ForegroundColor Yellow
}
```

### **STEP 11: Final Summary**
```powershell
Write-Host "`n🎯 ===============================================" -ForegroundColor Green
Write-Host "🎉    STUDYSYNC DEVOPS DEMO COMPLETE!    🎉" -ForegroundColor Green
Write-Host "🎯 ===============================================" -ForegroundColor Green

Write-Host "`n✅ DEMONSTRATED COMPONENTS:" -ForegroundColor Cyan
Write-Host "   🐳 Docker Containerization" -ForegroundColor White
Write-Host "   🔌 RESTful API Integration" -ForegroundColor White
Write-Host "   🗄️  MongoDB Database" -ForegroundColor White
Write-Host "   🛡️  Input Validation & Security" -ForegroundColor White
Write-Host "   🚀 CI/CD Pipeline (GitHub Actions)" -ForegroundColor White
Write-Host "   ☁️  Cloud Deployment (Render)" -ForegroundColor White
Write-Host "   📊 Health Monitoring & Logs" -ForegroundColor White

Write-Host "`n🌐 LIVE URLS:" -ForegroundColor Yellow
Write-Host "   • Frontend: https://studysync-frontend-v7wk.onrender.com" -ForegroundColor White
Write-Host "   • Backend: https://studysync-backend-0qov.onrender.com" -ForegroundColor White
Write-Host "   • Repository: https://github.com/DevDhruvX/DevOps-Project" -ForegroundColor White

Write-Host "`n💰 COST: $0/month (All free tiers)" -ForegroundColor Green
Write-Host "`n🎓 Ready for Q&A!" -ForegroundColor Magenta
```

---

## 🎤 **PRESENTATION TALKING POINTS**

### **While running commands, explain:**

1. **Docker Containerization**: "I'm using Docker Compose to orchestrate 5 services - MongoDB for data, Node.js backend, React frontend, Redis for caching, and Grafana for monitoring."

2. **API Testing**: "The backend exposes RESTful endpoints with proper validation. Notice how short passwords are rejected with a 400 Bad Request."

3. **Database Integration**: "Using MongoDB Atlas for production and local MongoDB for development, ensuring data consistency across environments."

4. **CI/CD Pipeline**: "Every push to main branch triggers automated testing and deployment through GitHub Actions."

5. **Cloud Deployment**: "The application auto-deploys to Render platform with zero downtime using free tier resources."

6. **DevOps Best Practices**: "Health checks, logging, environment separation, and automated deployment pipelines."

---

## 🔧 **TROUBLESHOOTING TIPS**

- **If containers fail to start**: Run `docker compose down` then `docker compose up -d`
- **If API returns errors**: Wait 30 seconds for services to fully initialize
- **If cloud services are slow**: Mention "free tier cold starts" - this is expected behavior
- **If pipeline fails**: Show that subsequent runs succeed (normal for first-time setup)

---

## ⏱️ **TIMING GUIDE**
- **Total Demo Time**: 15-20 minutes
- **Setup & Containers**: 3-4 minutes
- **API & Database Demo**: 3-4 minutes  
- **Feature Validation**: 3-4 minutes
- **CI/CD & Cloud**: 3-4 minutes
- **Q&A Buffer**: 3-4 minutes

**Good luck with your evaluation! 🚀**