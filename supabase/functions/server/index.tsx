import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2";

const app = new Hono();

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

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Initialize storage bucket
const bucketName = 'make-07dde686-waste-photos';

(async () => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, { public: false });
      console.log(`Created storage bucket: ${bucketName}`);
    }
  } catch (error) {
    console.error('Error initializing storage bucket:', error);
  }
})();

// Health check endpoint
app.get("/make-server-07dde686/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up route
app.post("/make-server-07dde686/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      console.error(`Signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }
    
    // Store user in KV with initial points
    await kv.set(`users:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      points: 0
    });
    
    return c.json({ user: data.user });
  } catch (error) {
    console.error(`Error during signup: ${error}`);
    return c.json({ error: 'Signup failed' }, 500);
  }
});

// Get user profile
app.get("/make-server-07dde686/user/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const user = await kv.get(`users:${userId}`);
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    return c.json({ user });
  } catch (error) {
    console.error(`Error fetching user profile: ${error}`);
    return c.json({ error: 'Failed to fetch user' }, 500);
  }
});

// Delete user account
app.delete("/make-server-07dde686/user/:userId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const userId = c.req.param('userId');
    
    // Check if user is deleting their own account
    if (user.id !== userId) {
      return c.json({ error: 'Forbidden: You can only delete your own account' }, 403);
    }
    
    // Delete user data from KV store
    await kv.del(`users:${userId}`);
    
    // Delete all user's wastes
    const allWastes = await kv.getByPrefix('wastes:');
    const userWastes = allWastes.filter((w: any) => w.userId === userId || w.collectedBy === userId);
    const wasteKeys = userWastes.map((w: any) => `wastes:${w.id}`);
    if (wasteKeys.length > 0) {
      await kv.mdel(wasteKeys);
    }
    
    // Delete user from Supabase Auth
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);
    
    if (deleteError) {
      console.error(`Error deleting user from auth: ${deleteError.message}`);
      // Continue even if auth deletion fails - user data is already removed
    }
    
    return c.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(`Error deleting user account: ${error}`);
    return c.json({ error: 'Failed to delete account' }, 500);
  }
});

// Create or update waste
app.post("/make-server-07dde686/waste", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const formData = await c.req.formData();
    const lat = parseFloat(formData.get('lat') as string);
    const lng = parseFloat(formData.get('lng') as string);
    const address = formData.get('address') as string;
    const category = formData.get('category') as string;
    const collected = formData.get('collected') === 'true';
    const photoFile = formData.get('photo') as File;
    const declaredPhotoFile = formData.get('declaredPhoto') as File;
    
    // Generate waste ID
    const wasteId = `waste_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    let photoUrl = null;
    let declaredPhotoUrl = null;
    
    // Upload collected photo if provided
    if (photoFile) {
      const photoPath = `${wasteId}_collected.jpg`;
      const arrayBuffer = await photoFile.arrayBuffer();
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(photoPath, arrayBuffer, { contentType: 'image/jpeg' });
      
      if (uploadError) {
        console.error(`Photo upload error: ${uploadError.message}`);
        return c.json({ error: 'Failed to upload photo' }, 500);
      }
      
      const { data: urlData } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(photoPath, 31536000); // 1 year expiry
      
      photoUrl = urlData?.signedUrl;
    }
    
    // Upload declared photo if provided
    if (declaredPhotoFile) {
      const photoPath = `${wasteId}_declared.jpg`;
      const arrayBuffer = await declaredPhotoFile.arrayBuffer();
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(photoPath, arrayBuffer, { contentType: 'image/jpeg' });
      
      if (uploadError) {
        console.error(`Declared photo upload error: ${uploadError.message}`);
        return c.json({ error: 'Failed to upload declared photo' }, 500);
      }
      
      const { data: urlData } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(photoPath, 31536000); // 1 year expiry
      
      declaredPhotoUrl = urlData?.signedUrl;
    }
    
    // Create waste record
    const waste = {
      id: wasteId,
      userId: user.id,
      lat,
      lng,
      address,
      category,
      declaredPhoto: declaredPhotoUrl,
      collected,
      collectedPhoto: photoUrl,
      collectedBy: collected ? user.id : null,
      collectedAt: collected ? new Date().toISOString() : null,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`wastes:${wasteId}`, waste);
    
    // Update user points
    const userData = await kv.get(`users:${user.id}`);
    let pointsToAdd = 0;
    
    if (collected && declaredPhotoFile) {
      // Déclarer + jeter
      pointsToAdd = 40;
    } else if (collected) {
      // Jeter seulement (ramasser un déchet existant)
      pointsToAdd = 20;
    } else if (declaredPhotoFile) {
      // Déclarer seulement
      pointsToAdd = 10;
    }
    
    if (userData) {
      userData.points = (userData.points || 0) + pointsToAdd;
      await kv.set(`users:${user.id}`, userData);
    }
    
    return c.json({ waste, pointsAdded: pointsToAdd });
  } catch (error) {
    console.error(`Error creating waste: ${error}`);
    return c.json({ error: 'Failed to create waste' }, 500);
  }
});

// Get wastes near location
app.get("/make-server-07dde686/wastes/nearby", async (c) => {
  try {
    const lat = parseFloat(c.req.query('lat') || '0');
    const lng = parseFloat(c.req.query('lng') || '0');
    const radius = parseFloat(c.req.query('radius') || '5'); // km
    const collectedFilter = c.req.query('collected'); // 'true', 'false', or undefined for all
    
    // Get all wastes
    const allWastes = await kv.getByPrefix('wastes:');
    
    // Filter by distance and collection status
    const nearbyWastes = allWastes.filter((waste: any) => {
      const distance = calculateDistance(lat, lng, waste.lat, waste.lng);
      const withinRadius = distance <= radius;
      
      if (collectedFilter === undefined) {
        return withinRadius;
      }
      
      const isCollected = collectedFilter === 'true';
      return withinRadius && waste.collected === isCollected;
    });
    
    return c.json({ wastes: nearbyWastes });
  } catch (error) {
    console.error(`Error fetching nearby wastes: ${error}`);
    return c.json({ error: 'Failed to fetch wastes' }, 500);
  }
});

// Collect an existing waste
app.post("/make-server-07dde686/waste/:wasteId/collect", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const wasteId = c.req.param('wasteId');
    const formData = await c.req.formData();
    const photoFile = formData.get('photo') as File;
    
    if (!photoFile) {
      return c.json({ error: 'Photo required' }, 400);
    }
    
    // Get existing waste
    const waste = await kv.get(`wastes:${wasteId}`);
    if (!waste) {
      return c.json({ error: 'Waste not found' }, 404);
    }
    
    if (waste.collected) {
      return c.json({ error: 'Waste already collected' }, 400);
    }
    
    // Upload photo
    const photoPath = `${wasteId}_collected.jpg`;
    const arrayBuffer = await photoFile.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(photoPath, arrayBuffer, { contentType: 'image/jpeg' });
    
    if (uploadError) {
      console.error(`Photo upload error: ${uploadError.message}`);
      return c.json({ error: 'Failed to upload photo' }, 500);
    }
    
    const { data: urlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(photoPath, 31536000);
    
    // Update waste
    waste.collected = true;
    waste.collectedPhoto = urlData?.signedUrl;
    waste.collectedBy = user.id;
    waste.collectedAt = new Date().toISOString();
    
    await kv.set(`wastes:${wasteId}`, waste);
    
    // Update user points
    const userData = await kv.get(`users:${user.id}`);
    if (userData) {
      userData.points = (userData.points || 0) + 20;
      await kv.set(`users:${user.id}`, userData);
    }
    
    return c.json({ waste, pointsAdded: 20 });
  } catch (error) {
    console.error(`Error collecting waste: ${error}`);
    return c.json({ error: 'Failed to collect waste' }, 500);
  }
});

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

Deno.serve(app.fetch);