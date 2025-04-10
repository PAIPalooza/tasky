# tasky
Personalized Task Manager

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   cd frontend
   vercel
   ```

#### Environment Variables

Set the following environment variables in Vercel:
- `NEXT_PUBLIC_API_ENDPOINT`: Your AWS API Gateway endpoint

### Continuous Deployment

The project is set up for automatic deployment on Vercel when pushing to the `main` branch.
