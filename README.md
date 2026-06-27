# 🎉 Campus Event RSVP System
### AWS + Full Stack Builder Cohort Project

A scalable, serverless full-stack web application designed to list campus events, track registration metrics, and process student RSVPs in real time. This project utilizes an optimized single-Lambda backend microservice architecture connected to a highly available Amazon Aurora MySQL cluster.

---

## 🧱 Production Architecture

```text
[Frontend UI] ──> [AWS Lambda Function URL] ──> [Amazon Aurora MySQL Cluster]
 (Local/GitHub)             (Node.js Handler)                  (database-1)

---

## 📁 Project Structure
.
├── index.html           # Core Frontend Interface (Event Grid, Modals, Forms & Vanilla JS)
├── index.js             # Unified Lambda Backend Microservice (Routing & DB Logic)
├── database-notes.txt   # SQL Schema definitions and sample seed records
├── package.json         # Node.js manifest and runtime dependencies
├── package-lock.json    # Strict dependency lockfile
└── .gitignore           # Ignored system and local workspace files

***gitignore***
node_modules/
.DS_Store
.env


### Backend (Lambda)
**environment variables** in your Lambda configuration
| Variable | Example | Description |
|-----------|----------|-------------|
| REGION | ap-southeast-2 | AWS region |
| DB_HOST | database-1.cluster-xxxxx.ap-south-1.rds.amazonaws.com | Aurora Cluster Endpoint |
| DB_USER | admin | Database Root User |
| DB_PASS | ******** | Database Master Password |
| DB_NAME | eventsdb | Active Application Database |

**Install dependencies**
```bash
npm install
```

---



###Relational Database Schema
CREATE DATABASE IF NOT EXISTS eventsdb;
USE eventsdb;

-- 1. Events Master Table
CREATE TABLE IF NOT EXISTS campus_events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL
);

-- 2. Attendee RSVP Registrations Table
CREATE TABLE IF NOT EXISTS event_rsvps (
    rsvp_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES campus_events(event_id) ON DELETE CASCADE
);
 ---

### API Summary
| Method | Path | Purpose |
|---------|------|----------|
| GET | `/events` | Fetch all events |
| GET | `/event/{event_id}` | Fetch single event |
| POST | `/rsvp` | Submit RSVP |

----

###CORS
"headers": {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}
