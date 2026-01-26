# Backend Debugging Setup Guide

## Overview
This guide explains how to debug the NestJS backend application with VS Code.

## Prerequisites
- VS Code installed
- Debugger for Chrome/Node extension (usually built-in)
- Backend dependencies installed (`pnpm install`)

## Quick Start

### Method 1: Debug with Nx (Recommended)
1. Open VS Code
2. Go to **Run → Start Debugging** (F5)
3. Select **"Debug backend with Nx"**
4. VS Code will start the backend in debug mode
5. Set breakpoints in your code and they'll pause execution

### Method 2: Attach to Running Backend
1. Start the backend first: `pnpm backend`
2. Go to **Run → Start Debugging** (F5)
3. Select **"Attach to Backend"**
4. The debugger will attach to the running process

### Method 3: Direct Node Debug
1. Go to **Run → Start Debugging** (F5)
2. Select **"Debug Backend (Direct)"**
3. Builds the project and starts debugging

## Features

### Breakpoints
- Click on the line number to set a breakpoint (red dot appears)
- Conditional breakpoints: Right-click → Add Conditional Breakpoint
- Logpoints: Right-click → Add Logpoint (logs without pausing)

### Watch Variables
1. While debugging, go to **Run → View**
2. Add expressions to watch in the **Watch** panel
3. View values as code executes

### Debug Console
- View console.log() output
- Evaluate expressions in real-time
- Type commands directly in the console

### Call Stack
- See which functions called the current function
- Click on any frame to jump to that location
- Understand the execution flow

## Debugging File Upload Service

### Set Breakpoints
1. Open `apps/backend/src/app/file-upload-service.ts`
2. Set breakpoints at:
   - Line 17: `onModuleInit()` - to debug connection issues
   - Line 38: `uploadFile()` - to debug uploads
   - Line 54: `getFile()` - to debug file retrieval

### Example: Debug GridFS Connection
```typescript
// Add this to see what's happening:
async onModuleInit() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    const mongoUrl = 'mongodb://root:root@localhost:27017/lead_intake_funnel?authSource=admin';
    this.mongoClient = new MongoClient(mongoUrl);
    
    console.log('🔍 Awaiting connection...');
    await this.mongoClient.connect();
    console.log('✅ Connected to MongoDB');
    
    // Set breakpoint here to inspect connection
    this.db = this.mongoClient.db('lead_intake_funnel');
    console.log('✅ Database selected');
    
    this.gridFSBucket = new GridFSBucket(this.db, {
      bucketName: 'uploads',
    });
    
    console.log('✅ GridFS bucket initialized');
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    throw error;
  }
}
```

## Common Issues & Solutions

### Issue: Breakpoints not hitting
**Solution:**
- Ensure source maps are enabled: `"sourceMaps": true` in launch.json
- Rebuild the project: `pnpm exec nx build backend`
- Restart the debugger

### Issue: "Port 9229 already in use"
**Solution:**
```bash
# Kill existing process
lsof -ti:9229 | xargs kill -9  # Mac/Linux
Get-Process -Id (Get-NetTCPConnection -LocalPort 9229).OwningProcess | Stop-Process  # Windows
```

### Issue: Debugger connects but code doesn't pause
**Solution:**
- Check that breakpoints are in compiled code (dist folder)
- Verify the outFiles pattern matches your build output
- Rebuild: `pnpm exec nx build backend`

## Advanced Features

### Conditional Breakpoints
```javascript
// Right-click breakpoint → Edit Breakpoint
// Add condition: file.originalname && file.originalname.includes('test')
```

### Watch Expressions
```javascript
// Add to Watch panel:
file.buffer.length     // File size
this.gridFSBucket      // Bucket instance
error.message          // Error details
```

### Debug Console Commands
```javascript
// While paused, type in Debug Console:
typeof this.db
Object.keys(this.gridFSBucket)
this.mongoClient.topology
```

## VS Code Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Start Debugging | F5 |
| Step Over | F10 |
| Step Into | F11 |
| Step Out | Shift+F11 |
| Continue | F5 |
| Toggle Breakpoint | Ctrl+K Ctrl+B |
| View Debug Console | Ctrl+Shift+Y |

## Testing with Requests

### Upload File (test while debugging)
```bash
curl -F "file=@/path/to/file.txt" http://localhost:3000/api/files/upload
```

### Get File
```bash
curl http://localhost:3000/api/files/download/OBJECT_ID
```

## Tips & Best Practices

1. **Use console.log strategically** - Especially for errors and state changes
2. **Set conditional breakpoints** - To avoid stopping on every iteration
3. **Check the Call Stack** - Understand where you are in the code flow
4. **Inspect objects in Watch** - Expand nested properties during execution
5. **Use Debug Console** - Quick way to test expressions
6. **Clean builds before debugging** - Ensure code matches breakpoints

## Resources

- [VS Code Debugging Documentation](https://code.visualstudio.com/docs/editor/debugging)
- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [NestJS Debugging](https://docs.nestjs.com/techniques/debugging)
