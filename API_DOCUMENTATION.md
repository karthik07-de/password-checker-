# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

---

### Login User
**POST** `/auth/login`

Authenticate and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

---

### Get Current User
**GET** `/auth/me`

Get the authenticated user's information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Password Operations

### Check Password Strength
**POST** `/passwords/check-strength`

Analyze password strength and get feedback.

**Request Body:**
```json
{
  "password": "MyPassword123!"
}
```

**Response:**
```json
{
  "strength": "strong",
  "score": 7,
  "maxScore": 8,
  "feedback": [],
  "length": 14,
  "hasLowercase": true,
  "hasUppercase": true,
  "hasNumbers": true,
  "hasSpecialChars": true
}
```

---

### Check Password Breach
**POST** `/passwords/check-breach`

Check if password has been exposed in data breaches.

**Request Body:**
```json
{
  "password": "password123"
}
```

**Response:**
```json
{
  "isBreached": true,
  "breachCount": 123456,
  "message": "This password has been seen 123,456 times in data breaches"
}
```

---

### Generate Password
**POST** `/passwords/generate`

Generate a random secure password.

**Request Body:**
```json
{
  "length": 16,
  "uppercase": true,
  "lowercase": true,
  "numbers": true,
  "symbols": true
}
```

**Response:**
```json
{
  "password": "aB3$xY9#mK2@pL5!",
  "strength": "strong",
  "score": 8
}
```

---

## Password Vault

### Get All Passwords
**GET** `/vault`

Retrieve all saved passwords for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "password_id",
    "website": "example.com",
    "username": "user@example.com",
    "password": "decrypted_password",
    "notes": "My account",
    "strength": "strong",
    "isCompromised": false,
    "breachCount": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Create Password Entry
**POST** `/vault`

Save a new password to the vault.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "website": "example.com",
  "username": "user@example.com",
  "password": "MySecurePassword123!",
  "notes": "My account"
}
```

**Response:**
```json
{
  "_id": "password_id",
  "website": "example.com",
  "username": "user@example.com",
  "password": "MySecurePassword123!",
  "notes": "My account",
  "strength": "strong",
  "isCompromised": false,
  "breachCount": 0,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Update Password Entry
**PUT** `/vault/:id`

Update an existing password entry.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "website": "example.com",
  "username": "newuser@example.com",
  "password": "NewPassword123!",
  "notes": "Updated account"
}
```

**Response:**
```json
{
  "_id": "password_id",
  "website": "example.com",
  "username": "newuser@example.com",
  "password": "NewPassword123!",
  "notes": "Updated account",
  "strength": "strong",
  "isCompromised": false,
  "breachCount": 0,
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### Delete Password Entry
**DELETE** `/vault/:id`

Delete a password entry from the vault.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Entry deleted successfully"
}
```

---

### Get Vault Statistics
**GET** `/vault/stats`

Get statistics about saved passwords.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "total": 10,
  "weak": 2,
  "medium": 3,
  "strong": 5,
  "compromised": 1
}
```

---

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request**
```json
{
  "message": "Validation error message"
}
```

**401 Unauthorized**
```json
{
  "message": "Not authorized, no token"
}
```

**404 Not Found**
```json
{
  "message": "Resource not found"
}
```

**429 Too Many Requests**
```json
{
  "message": "Too many requests, please try again later"
}
```

**500 Internal Server Error**
```json
{
  "message": "Server error message"
}
```

---

## Rate Limits

- General API: 100 requests per 15 minutes
- Authentication endpoints: 5 requests per 15 minutes
- Breach checking: 10 requests per minute

---

## Notes

- All timestamps are in ISO 8601 format
- Passwords are encrypted before storage
- Breach checking uses k-anonymity (only first 5 chars of hash sent)
- JWT tokens expire after 30 days
