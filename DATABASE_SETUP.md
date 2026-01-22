# Database Setup Instructions

## Prerequisites
1. Create a Supabase project at https://supabase.com
2. Get your project URL and anon key from Settings > API

## Setup Steps

### 1. Configure Environment Variables
Create a `.env` file in the root directory with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Disable Email Confirmation
1. In your Supabase dashboard, go to **Authentication** > **Settings**
2. Under **Email Auth**, disable **"Enable email confirmations"**
3. This allows users to register and immediately log in without email verification

### 3. Run Database Schema
1. Open your Supabase dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Click "Run" to execute the SQL

This will create:
- `profiles` table (extends auth.users)
- `projects` table (user projects with due dates)
- `tasks` table (tasks belonging to projects)
- Row Level Security (RLS) policies to ensure users can only access their own data
- Indexes for better query performance
- Triggers to automatically update `updated_at` timestamps
- **Trigger to automatically create profiles** when users sign up (fixes RLS issues)

### 4. Verify Setup
After running the SQL:
- Check that all three tables exist in the Table Editor
- Verify RLS is enabled on all tables
- Test user registration - profile should be created automatically via database trigger

## Security Notes
- All tables have Row Level Security enabled
- Users can only access their own projects and tasks
- The `profiles` table is automatically populated when a user signs up via database trigger (no RLS issues)
- Email confirmation is disabled for immediate login after registration
