#!/usr/bin/env node

/**
 * StudySync DevOps Platform - Demo Script
 * 
 * Professional demo script for showcasing the complete DevOps pipeline
 * This script demonstrates the end-to-end workflow from development to production
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

class StudySyncDemo {
    constructor() {
        this.colors = {
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m',
            red: '\x1b[31m',
            reset: '\x1b[0m',
            bold: '\x1b[1m'
        };
    }

    log(message, color = 'reset') {
        console.log(`${this.colors[color]}${message}${this.colors.reset}`);
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async runCommand(command, description) {
        this.log(`\n🔧 ${description}`, 'cyan');
        this.log(`Command: ${command}`, 'yellow');

        try {
            const { stdout, stderr } = await execAsync(command);
            if (stdout) this.log(stdout, 'green');
            if (stderr) this.log(stderr, 'red');
            return { success: true, stdout, stderr };
        } catch (error) {
            this.log(`Error: ${error.message}`, 'red');
            return { success: false, error };
        }
    }

    async checkPrerequisites() {
        this.log('\n🔍 Checking Prerequisites...', 'bold');

        const checks = [
            ['docker --version', 'Docker'],
            ['docker compose version', 'Docker Compose'],
            ['git --version', 'Git'],
            ['node --version', 'Node.js']
        ];

        for (const [command, tool] of checks) {
            const result = await this.runCommand(command, `Checking ${tool}`);
            if (!result.success) {
                this.log(`❌ ${tool} not found. Please install it first.`, 'red');
                return false;
            }
            this.log(`✅ ${tool} is available`, 'green');
        }
        return true;
    }

    async startDemo() {
        this.log('🚀 STUDYSYNC DEVOPS PLATFORM DEMO', 'bold');
        this.log('=====================================', 'cyan');

        // Check prerequisites
        const prerequisitesOk = await this.checkPrerequisites();
        if (!prerequisitesOk) {
            this.log('❌ Prerequisites check failed. Exiting demo.', 'red');
            return;
        }

        // Start containers
        this.log('\n🐳 Starting Docker Containers...', 'bold');
        await this.runCommand('docker compose up -d', 'Starting all services');
        await this.sleep(10000); // Wait for services to start

        // Check container status
        await this.runCommand('docker compose ps', 'Checking container status');

        // Test API health
        this.log('\n🔍 Testing API Health...', 'bold');
        await this.sleep(3000);
        await this.runCommand('curl -s http://localhost:5000/api/health', 'Backend API health check');

        // Show resource usage
        await this.runCommand('docker stats --no-stream', 'Container resource usage');

        // Open applications
        this.log('\n🌐 Opening Applications...', 'bold');
        this.log('Frontend: http://localhost:3000', 'cyan');
        this.log('Backend API: http://localhost:5000', 'cyan');
        this.log('Grafana: http://localhost:3001', 'cyan');

        // Feature demonstration
        await this.demonstrateFeatures();

        // Show CI/CD info
        this.log('\n🚀 CI/CD Pipeline Information:', 'bold');
        this.log('GitHub Actions: https://github.com/DevDhruvX/DevOps-Project/actions', 'cyan');
        this.log('Live Frontend: https://studysync-frontend-v7wk.onrender.com', 'cyan');
        this.log('Live Backend: https://studysync-backend-0qov.onrender.com', 'cyan');

        this.log('\n✅ Demo completed successfully!', 'green');
        this.log('🎯 Key DevOps features demonstrated:', 'bold');
        this.log('   • Containerized microservices architecture', 'yellow');
        this.log('   • Automated CI/CD pipeline with GitHub Actions', 'yellow');
        this.log('   • Health monitoring and logging', 'yellow');
        this.log('   • Cloud deployment with zero downtime', 'yellow');
        this.log('   • Database integration and caching', 'yellow');
    }

    async demonstrateFeatures() {
        this.log('\n🎯 Feature Demonstration:', 'bold');

        // Test password validation
        this.log('\n🔒 Testing Password Validation...', 'cyan');

        const shortPasswordTest = {
            name: 'Demo User',
            email: 'demo@test.com',
            password: '123'
        };

        const validPasswordTest = {
            name: 'Demo User Valid',
            email: `demo${Date.now()}@test.com`,
            password: 'securepassword123'
        };

        // Test short password (should fail)
        this.log('Testing short password (should fail):', 'yellow');
        await this.runCommand(
            `curl -s -X POST -H "Content-Type: application/json" -d '${JSON.stringify(shortPasswordTest)}' http://localhost:5000/api/auth/register`,
            'Short password validation test'
        );

        // Test valid password (should succeed)
        this.log('\nTesting valid password (should succeed):', 'yellow');
        await this.runCommand(
            `curl -s -X POST -H "Content-Type: application/json" -d '${JSON.stringify(validPasswordTest)}' http://localhost:5000/api/auth/register`,
            'Valid password registration test'
        );
    }

    async cleanup() {
        this.log('\n🧹 Cleanup (optional)...', 'bold');
        await this.runCommand('docker compose down', 'Stopping all containers');
        this.log('✅ Cleanup completed', 'green');
    }
}

// Run demo if called directly
if (require.main === module) {
    const demo = new StudySyncDemo();

    process.on('SIGINT', async () => {
        console.log('\n\n🛑 Demo interrupted. Cleaning up...');
        await demo.cleanup();
        process.exit(0);
    });

    demo.startDemo().catch(error => {
        console.error('Demo failed:', error);
        process.exit(1);
    });
}

module.exports = StudySyncDemo;