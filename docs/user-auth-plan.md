# User Authentication Implementation Plan

## Overview
Implement email-based authentication system with sign up, sign in, and sign out functionality. Users can view their previous orders and manage their profile.

## Backend Implementation

### 1. Dependencies to Add
```json
{
  "bcryptjs": "^2.4.3",           // Password hashing
  "jsonwebtoken": "^9.0.2",       // JWT tokens (optional, if using JWT)
  "express-session": "^1.17.3",   // Session management (if using sessions)
  "cookie-parser": "^1.4.6"       // Cookie parsing
}
```

### 2. User Model (`server/models/user.js`)
```javascript
{
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // Hashed with bcrypt
  phone: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

**Indexes:**
- `email` (unique)
- `email` + `password` (for login queries)

### 3. API Endpoints (`server/routes/auth.js`)

#### POST `/api/auth/signup`
- **Request Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "confirmPassword": "securePassword123",
    "phone": "555-123-4567"
  }
  ```
- **Validation:**
  - All fields required
  - Email format validation
  - Password: min 8 characters, at least one letter and one number
  - Password and confirmPassword must match
  - Email must be unique
- **Response (Success):**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "_id": "...",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "555-123-4567"
      },
      "token": "jwt_token_here" // or session ID
    }
  }
  ```
- **Response (Error):**
  ```json
  {
    "success": false,
    "error": "Validation failed",
    "details": ["Email already exists", "Password too weak"]
  }
  ```

#### POST `/api/auth/signin`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Validation:**
  - Email and password required
  - Email format validation
- **Response (Success):**
  ```json
  {
    "success": true,
    "data": {
      "user": { /* user object */ },
      "token": "jwt_token_here"
    }
  }
  ```
- **Response (Error):**
  ```json
  {
    "success": false,
    "error": "Invalid email or password"
  }
  ```

#### POST `/api/auth/signout`
- **Request:** Requires authentication (session/token)
- **Response:**
  ```json
  {
    "success": true,
    "message": "Signed out successfully"
  }
  ```

#### GET `/api/auth/me`
- **Request:** Requires authentication
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "user": { /* user object without password */ }
    }
  }
  ```

#### GET `/api/auth/orders`
- **Request:** Requires authentication
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "orders": [ /* array of user's orders */ ]
    }
  }
  ```

### 4. Authentication Middleware (`server/middleware/auth.js`)
- Verify JWT token or session
- Attach user to `req.user`
- Return 401 if not authenticated

### 5. Update Order Model
- Add optional `userId` field to link orders to users
- When user is logged in, automatically link orders to their account

## Frontend Implementation

### 1. Dependencies to Add
```json
{
  "react-hot-toast": "^2.4.1"  // Toast notifications (or custom Toast component)
}
```

### 2. Components to Create

#### `client/src/components/auth/SignUpForm.js`
- **Props:** `onSuccess`, `onError`, `switchToSignIn`
- **Fields:**
  - First Name (required)
  - Last Name (required)
  - Email (required, with validation)
  - Password (required, with validation)
  - Confirm Password (required, must match)
  - Phone Number (required)
- **Features:**
  - SignUp animation at top (`/animations/SignUp.json`)
  - Form validation (client-side)
  - Submit button with loading state
  - Link to switch to Sign In
- **Styling:** Use theme colors
  - Background: `var(--coffee-brown-very-light)` or white
  - Primary buttons: `var(--lime-green)`
  - Text: `var(--coffee-brown)`
  - Borders: `var(--coffee-brown-light)`

#### `client/src/components/auth/SignInForm.js`
- **Props:** `onSuccess`, `onError`, `switchToSignUp`
- **Fields:**
  - Email (required)
  - Password (required)
- **Features:**
  - Form validation
  - Submit button with loading state
  - Link to switch to Sign Up
  - "Forgot Password?" link (future feature)

#### `client/src/components/Toast.js` (or use react-hot-toast)
- **Types:** Success, Error
- **Features:**
  - SuccessToast animation (`/animations/SuccessToast.json`)
  - ErrorToast animation (`/animations/ErrorToast.json`)
  - Auto-dismiss after 3-5 seconds
  - Manual dismiss button

#### `client/src/components/ProfileDropdown.js`
- **Props:** `user`, `onSignOut`, `onViewOrders`
- **Features:**
  - User avatar (userAvatar animation: `/animations/userAvatar.json`)
  - Dropdown menu with:
    - "View Previous Orders" option
    - "Sign Out" option
  - Click outside to close
- **Positioning:** Below avatar in NavBar

### 3. Pages to Create/Update

#### `client/src/app/auth/page.js` or Modal
- **Options:**
  - Option A: Full page at `/auth` with tabs for Sign In / Sign Up
  - Option B: Modal that opens from NavBar
- **State Management:**
  - Toggle between Sign In and Sign Up forms
  - Handle form submissions
  - Show toast notifications

#### `client/src/app/orders/page.js` (Update existing or create new)
- Show user's previous orders
- Filter by status
- Show order details
- Only accessible when authenticated

### 4. Hooks to Create

#### `client/src/hooks/useAuth.js`
```javascript
{
  user: null | User,
  loading: boolean,
  error: string | null,
  signUp: (data) => Promise<void>,
  signIn: (email, password) => Promise<void>,
  signOut: () => Promise<void>,
  refetch: () => Promise<void>
}
```
- Store user in context/state
- Persist session (localStorage or cookies)
- Handle token refresh

#### `client/src/hooks/useUserOrders.js`
- Fetch user's orders
- Cache orders
- Refresh on order creation

### 5. API Client Updates (`client/src/lib/api.js`)

#### Add Auth API
```javascript
export const authApi = {
  signUp: async (data) => { /* POST /api/auth/signup */ },
  signIn: async (email, password) => { /* POST /api/auth/signin */ },
  signOut: async () => { /* POST /api/auth/signout */ },
  getMe: async () => { /* GET /api/auth/me */ },
  getUserOrders: async () => { /* GET /api/auth/orders */ }
};
```

### 6. Update Nav Component (`client/src/components/Nav.js`)

**Conditional Rendering:**
- If `user` exists:
  - Show user avatar (userAvatar animation)
  - Show ProfileDropdown on click
- If `user` is null:
  - Show "Sign In" button/link
  - Opens auth modal/page

**Avatar Styling:**
- Circular container
- Lottie animation inside
- Hover effect
- Position: Right side of NavBar

## Security Considerations

### 1. Password Security
- Hash passwords with bcrypt (salt rounds: 10-12)
- Never return password in API responses
- Use HTTPS in production

### 2. Session Management
- **Option A: JWT Tokens**
  - Store in httpOnly cookies (more secure)
  - Or localStorage (less secure, but simpler)
  - Include expiration (e.g., 7 days)
  - Refresh token for longer sessions

- **Option B: Express Sessions**
  - Store session ID in httpOnly cookie
  - Store session data in server memory or Redis
  - Session expiration

### 3. Validation
- Server-side validation (never trust client)
- Rate limiting on auth endpoints
- Email verification (future feature)
- Password strength requirements

### 4. CORS
- Ensure CORS allows credentials
- Set `credentials: true` in frontend requests

## Implementation Steps

### Phase 1: Backend Setup
1. ✅ Install dependencies
2. ✅ Create User model
3. ✅ Create auth routes
4. ✅ Add authentication middleware
5. ✅ Update Order model to include userId
6. ✅ Add password hashing utilities
7. ✅ Add validation utilities

### Phase 2: Frontend Auth Forms
1. ✅ Create SignUpForm component
2. ✅ Create SignInForm component
3. ✅ Create Toast component
4. ✅ Create auth page/modal
5. ✅ Add form validation
6. ✅ Integrate Lottie animations

### Phase 3: Session Management
1. ✅ Create useAuth hook
2. ✅ Implement token/session storage
3. ✅ Add auth context/provider
4. ✅ Update API client with auth headers

### Phase 4: NavBar Integration
1. ✅ Create ProfileDropdown component
2. ✅ Update Nav component
3. ✅ Add user avatar
4. ✅ Add sign in button

### Phase 5: User Orders
1. ✅ Create/update orders page
2. ✅ Add useUserOrders hook
3. ✅ Filter orders by userId
4. ✅ Display order history

### Phase 6: Testing
1. ✅ Test sign up flow
2. ✅ Test sign in flow
3. ✅ Test sign out flow
4. ✅ Test order viewing
5. ✅ Test error handling
6. ✅ Test form validation

## File Structure

```
server/
  models/
    user.js          (NEW)
  routes/
    auth.js          (NEW)
  middleware/
    auth.js          (NEW)
  utils/
    password.js      (NEW - password hashing)
    validation.js    (UPDATE - add email/password validation)

client/
  src/
    components/
      auth/
        SignUpForm.js        (NEW)
        SignInForm.js        (NEW)
      ProfileDropdown.js     (NEW)
      Toast.js               (NEW)
    hooks/
      useAuth.js             (NEW)
      useUserOrders.js       (NEW)
    app/
      auth/
        page.js              (NEW)
      orders/
        page.js              (UPDATE or NEW)
    lib/
      api.js                 (UPDATE - add authApi)
    context/
      AuthContext.js         (NEW - optional, for global auth state)
```

## Theme Colors Reference

```css
--coffee-brown: #3d2817
--coffee-brown-light: #5a3d2a
--coffee-brown-dark: #2a1a0f
--coffee-brown-very-light: #f5f0eb
--lime-green: #7cb342
--lime-green-light: #9ccc65
--lime-green-dark: #558b2f
```

## Animation Files Required

1. `/client/public/animations/SignUp.json` ✅
2. `/client/public/animations/SuccessToast.json` ✅
3. `/client/public/animations/ErrorToast.json` ✅
4. `/client/public/animations/userAvatar.json` ✅

## Next Steps

1. Review and approve this plan
2. Start with Phase 1 (Backend Setup)
3. Implement incrementally, testing each phase
4. Consider adding email verification in future iteration
5. Consider adding password reset functionality in future iteration

