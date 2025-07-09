# Security Policy

## Project: BookMyDoc

This document outlines the security policies and procedures for the **DABS (Doctor Appointment Booking System)** project.

---

## Supported Versions

We currently support the following deployment stages:

| Stage     | Supported | Notes                        |
|-----------|-----------|------------------------------|
| Production |  Yes     | Actively monitored and maintained |
| Development |  Yes     | Open to contributions and security reviews |
| Staging     |  Partial | Used for internal testing only |

---

##  Reporting a Vulnerability

If you discover a security vulnerability, we **strongly encourage responsible disclosure**.

### Steps:
1. **Do not open public issues** regarding the vulnerability.
2. **Email us directly** at: [thinkelite@hotmail.com](mailto:thinkelite@hotmail.com)
3. Include the following in your message:
   - Description of the issue
   - Steps to reproduce (if possible)
   - Affected endpoints/modules
   - Severity level (High/Medium/Low)

We will acknowledge your report within **48 hours** and aim to resolve valid issues within **7–10 business days**.

---

## Authentication & Authorization

- JWT-based stateless authentication for all routes
- Secure token signing and verification using server-side secret keys
- Role-based access control:
  - Patients: Booking and managing appointments
  - Doctors: Viewing appointments and availability
  - Admin: Managing users and doctors

---

## Data Protection

- Passwords are hashed using **bcrypt** before storage.
- No sensitive data is stored in JWT payloads.
- HTTPS enforced in production environments.
- Environment variables are used for all credentials and API keys.
- Input validation and sanitization using **Express middleware**.

---

## Security Best Practices Implemented

| Area                  | Measure                                              |
|-----------------------|------------------------------------------------------|
| Authentication        | JWT, secure token expiration                        |
| Password Handling     | Bcrypt hashing with salt                            |
| Access Control        | Role-based middleware                              |
| Data Validation       | Express validators, schema-based validation         |
| MongoDB Security      | Mongoose sanitization, noSQL injection protection   |
| Deployment            | `.env` files, no sensitive keys pushed to GitHub    |
| CI/CD                 | Secrets stored securely in GitHub Actions           |

---

## What We Do Not Use

- No cookies/session storage for authentication (JWT only)
- No third-party analytics or data-sharing services
- No Docker in production for this project

---

## Acknowledgments

We welcome and appreciate any effort to improve the security of our system. Ethical hackers, testers, and contributors are always welcome to help us maintain a safe and trustworthy platform.

---

*Last updated: July 9, 2025*
