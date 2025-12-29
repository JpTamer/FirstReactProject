/* eslint-disable no-undef */
import express from 'express';
import pg from 'pg';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Pool } = pg;
const app = express();

app.use(cors());
app.use(express.json());

// Database connection from environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Set timezone to UTC
pool.on('connect', (client) => {
  client.query('SET TIME ZONE \'UTC\'');
});

pool.connect((err) => {
    if (err) {
        console.log("Error connecting to database:", err);
        return;
    }
    console.log("Connected to Neon PostgreSQL database");
});

// Track active order timers to prevent memory leaks
const orderTimers = new Map();

// Auto-progress order through statuses
const autoProgressOrder = async (orderId) => {
    // Clear any existing timer for this order
    if (orderTimers.has(orderId)) {
        clearTimeout(orderTimers.get(orderId));
    }

    const statuses = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
    let currentIndex = 0;

    const progressToNext = async () => {
        currentIndex++;
        if (currentIndex < statuses.length) {
            try {
                await pool.query(
                    'UPDATE Orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
                    [statuses[currentIndex], orderId]
                );
                console.log(`Order ${orderId} updated to ${statuses[currentIndex]}`);
                
                // Schedule next update (15 seconds between each status)
                const timerId = setTimeout(progressToNext, 15000);
                orderTimers.set(orderId, timerId);
            } catch (err) {
                console.error('Error updating order status:', err);
                orderTimers.delete(orderId);
            }
        } else {
            // Clean up timer when order is complete
            orderTimers.delete(orderId);
        }
    };

    // Start progression after 15 seconds
    const initialTimer = setTimeout(progressToNext, 15000);
    orderTimers.set(orderId, initialTimer);
};

// ==================== AUTHENTICATION ENDPOINTS ====================

// Register new user
app.post("/register", async (req, res) => {
    try {
        const { email, password, name, phone, address } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: "Email, password, and name are required" });
        }

        // Check if user already exists
        const checkUser = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);
        if (checkUser.rows.length > 0) {
            return res.status(409).json({ error: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await pool.query(
            "INSERT INTO Users (email, password, name, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, phone, address, created_at",
            [email, hashedPassword, name, phone, address]
        );

        const user = result.rows[0];

        res.status(201).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Login user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user
        const result = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = result.rows[0];

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Remove password from response
        delete user.password;

        res.json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});


// Get all menu items
app.get("/menu", async (req, res) => {
    try {
        const { category } = req.query;
        let query = "SELECT * FROM MenuItems WHERE available = true";
        const params = [];

        if (category) {
            query += " AND category = $1";
            params.push(category);
        }

        query += " ORDER BY category, name";

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});


// Add item to cart
app.post("/cart", async (req, res) => {
    try {
        const { menu_item_id, quantity, user_id } = req.body;

        if (!menu_item_id || !quantity || quantity < 1 || !user_id) {
            return res.status(400).json({ error: "Valid menu_item_id, quantity, and user_id are required" });
        }

        // Check if item exists in menu
        const menuItem = await pool.query("SELECT * FROM MenuItems WHERE id = $1 AND available = true", [menu_item_id]);
        if (menuItem.rows.length === 0) {
            return res.status(404).json({ error: "Menu item not found or unavailable" });
        }

        // Check if item already in cart
        const existing = await pool.query("SELECT * FROM Cart WHERE user_id = $1 AND menu_item_id = $2", [user_id, menu_item_id]);

        let result;
        if (existing.rows.length > 0) {
            // Update quantity
            result = await pool.query(
                "UPDATE Cart SET quantity = quantity + $1 WHERE user_id = $2 AND menu_item_id = $3 RETURNING *",
                [quantity, user_id, menu_item_id]
            );
        } else {
            // Insert new cart item
            result = await pool.query(
                "INSERT INTO Cart (user_id, menu_item_id, quantity) VALUES ($1, $2, $3) RETURNING *",
                [user_id, menu_item_id, quantity]
            );
        }

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Update cart item quantity
app.put("/cart/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ error: "Valid quantity is required" });
        }

        const result = await pool.query(
            "UPDATE Cart SET quantity = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
            [quantity, id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Remove item from cart
app.delete("/cart/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM Cart WHERE id = $1 AND user_id = $2",
            [id, req.user.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        res.json({ message: "Item removed from cart" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Clear entire cart
app.delete("/cart/clear/all", async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ error: "user_id is required" });
        }
        await pool.query("DELETE FROM Cart WHERE user_id = $1", [user_id]);
        res.json({ message: "Cart cleared" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});


// Create order (checkout)
app.post("/orders", async (req, res) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');

        const { delivery_address, phone, notes, user_id } = req.body;

        if (!user_id) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: "user_id is required" });
        }

        // Get cart items
        const cart = await client.query(`
            SELECT c.*, m.price, m.name
            FROM Cart c
            JOIN MenuItems m ON c.menu_item_id = m.id
            WHERE c.user_id = $1
        `, [user_id]);

        if (cart.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: "Cart is empty" });
        }

        // Calculate total
        const total = cart.rows.reduce((sum, item) => sum + (item.quantity * parseFloat(item.price)), 0);

        // Create order
        const orderResult = await client.query(
            "INSERT INTO Orders (user_id, total_amount, delivery_address, phone, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [user_id, total, delivery_address, phone, notes]
        );

        const order = orderResult.rows[0];

        // Create order items
        for (const item of cart.rows) {
            await client.query(
                "INSERT INTO OrderItems (order_id, menu_item_id, quantity, price) VALUES ($1, $2, $3, $4)",
                [order.id, item.menu_item_id, item.quantity, item.price]
            );
        }

        // Clear cart
        await client.query("DELETE FROM Cart WHERE user_id = $1", [user_id]);

        await client.query('COMMIT');

        // Auto-progress order status in the background
        autoProgressOrder(order.id);

        res.status(201).json(order);
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err);
        res.status(500).json({ error: "Server error" });
    } finally {
        client.release();
    }
});

// Get user's orders
app.get("/orders", async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.status(400).json({ error: "user_id is required" });
        }
        const result = await pool.query(
            "SELECT * FROM Orders WHERE user_id = $1 ORDER BY created_at DESC",
            [user_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get order details
app.get("/orders/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({ error: "user_id is required" });
        }

        const orderResult = await pool.query(
            "SELECT * FROM Orders WHERE id = $1 AND user_id = $2",
            [id, user_id]
        );

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        const itemsResult = await pool.query(`
            SELECT oi.*, m.name, m.description, m.image_url
            FROM OrderItems oi
            JOIN MenuItems m ON oi.menu_item_id = m.id
            WHERE oi.order_id = $1
        `, [id]);

        res.json({
            ...orderResult.rows[0],
            items: itemsResult.rows
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Update order status (admin endpoint - for now, no admin check)
app.put("/orders/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const result = await pool.query(
            "UPDATE Orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});


// Add review
app.post("/reviews", async (req, res) => {
    try {
        const { menu_item_id, rating, comment, user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ error: "user_id is required" });
        }

        if (!rating) {
            return res.status(400).json({ error: "Rating is required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        // If menu_item_id provided, check if it exists
        if (menu_item_id) {
            const menuItem = await pool.query("SELECT * FROM MenuItems WHERE id = $1", [menu_item_id]);
            if (menuItem.rows.length === 0) {
                return res.status(404).json({ error: "Menu item not found" });
            }
        }

        // Insert new review (allow multiple general reviews per user)
        const result = await pool.query(
            "INSERT INTO Reviews (user_id, menu_item_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
            [user_id, menu_item_id || null, rating, comment]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get reviews for menu item
app.get("/reviews/item/:menuItemId", async (req, res) => {
    try {
        const { menuItemId } = req.params;

        const result = await pool.query(`
            SELECT r.*, u.name as user_name
            FROM Reviews r
            JOIN Users u ON r.user_id = u.id
            WHERE r.menu_item_id = $1
            ORDER BY r.created_at DESC
        `, [menuItemId]);

        // Calculate average rating
        const avgResult = await pool.query(
            "SELECT AVG(rating)::numeric(10,1) as avg_rating, COUNT(*) as total_reviews FROM Reviews WHERE menu_item_id = $1",
            [menuItemId]
        );

        res.json({
            reviews: result.rows,
            average_rating: avgResult.rows[0].avg_rating || 0,
            total_reviews: parseInt(avgResult.rows[0].total_reviews)
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get all reviews for general restaurant display
app.get("/reviews", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.*, u.name as user_name
            FROM Reviews r
            JOIN Users u ON r.user_id = u.id
            ORDER BY r.created_at DESC
        `);

        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get user's reviews
app.get("/reviews/user/me", async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.status(400).json({ error: "user_id is required" });
        }
        const result = await pool.query(`
            SELECT r.*, m.name as menu_item_name, m.image_url
            FROM Reviews r
            JOIN MenuItems m ON r.menu_item_id = m.id
            WHERE r.user_id = $1
            ORDER BY r.created_at DESC
        `, [user_id]);

        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete review
app.delete("/reviews/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ error: "user_id is required" });
        }

        const result = await pool.query(
            "DELETE FROM Reviews WHERE id = $1 AND user_id = $2",
            [id, user_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.json({ message: "Review deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
