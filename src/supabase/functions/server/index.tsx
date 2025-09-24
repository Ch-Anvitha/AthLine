import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from 'npm:@supabase/supabase-js';
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client with service role key
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-e0e89edd/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-e0e89edd/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, user_metadata } = body;

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        ...user_metadata,
        createdAt: new Date().toISOString(),
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Sign up error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store additional user data in KV store
    if (data.user) {
      await kv.set(`user:${data.user.id}`, {
        id: data.user.id,
        email: data.user.email,
        ...user_metadata,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      });
    }

    return c.json({ 
      success: true, 
      message: 'User created successfully',
      user: {
        id: data.user?.id,
        email: data.user?.email,
        ...user_metadata
      }
    });

  } catch (error) {
    console.error('Sign up endpoint error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get user profile endpoint
app.get("/make-server-e0e89edd/profile/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    // Verify user is authenticated
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user || user.id !== userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get user data from KV store
    const userData = await kv.get(`user:${userId}`);
    
    if (!userData) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({ user: userData });

  } catch (error) {
    console.error('Profile endpoint error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update user profile endpoint
app.put("/make-server-e0e89edd/profile/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const updates = await c.req.json();

    // Verify user is authenticated
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user || user.id !== userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get current user data
    const currentData = await kv.get(`user:${userId}`) || {};
    
    // Update user data
    const updatedData = {
      ...currentData,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };

    await kv.set(`user:${userId}`, updatedData);

    return c.json({ 
      success: true, 
      message: 'Profile updated successfully',
      user: updatedData 
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

Deno.serve(app.fetch);