-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create MenuItems table
CREATE TABLE IF NOT EXISTS MenuItems (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    image_url TEXT,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Cart table
CREATE TABLE IF NOT EXISTS Cart (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES MenuItems(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, menu_item_id)
);

-- Create Orders table
CREATE TABLE IF NOT EXISTS Orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    delivery_address TEXT,
    phone VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create OrderItems table
CREATE TABLE IF NOT EXISTS OrderItems (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES Orders(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES MenuItems(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Reviews table
CREATE TABLE IF NOT EXISTS Reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES MenuItems(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_cart_user ON Cart(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON Orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON Orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON OrderItems(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON Reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_menu_item ON Reviews(menu_item_id);

-- Insert menu items matching your restaurant menu
INSERT INTO MenuItems (name, description, price, category, image_url) VALUES
-- Starters
('Soup', 'Italian vegetable soup', 3.49, 'Starters', '/images/Soup.jpg'),
('Salad', 'Fresh garden salad mixed with goat cheese', 5.49, 'Starters', '/images/Salad.jpg'),
('Arancini', 'Risotto balls filled with cheese', 4.99, 'Starters', '/images/Arancini.webp'),
('Bruschetta', 'Grilled bread with tomato & basil', 2.49, 'Starters', '/images/Bruschetta.webp'),

-- Pizzas
('Margherita Pizza', 'Classic with mozzarella & basil', 8.99, 'Pizzas', '/images/Margherita-pizza.jpg'),
('Bresaola Pizza', 'Air-dried, salted beef with arugula', 7.99, 'Pizzas', '/images/BresaolaPizza.webp'),
('Quatro Formaggi Pizza', 'Mozzarella, gorgonzola, parmesan, ricotta', 9.49, 'Pizzas', '/images/Quatro.webp'),

-- Pastas
('Lasagna', 'Layers of pasta with meat sauce & béchamel', 6.49, 'Pastas', '/images/Lasagna.jpg'),
('Pasta Alfredo', 'Creamy sauce & parmesan', 10.99, 'Pastas', '/images/fettuccine-alfredo.jpg'),
('Truffle Pasta', 'Black truffle with creamy sauce', 12.49, 'Pastas', '/images/Truffle.jpg'),
('Pesto Pasta', 'Basil pesto with pine nuts', 9.49, 'Pastas', '/images/Pesto.jpg'),

-- Desserts
('Tiramisu', 'Italian coffee dessert', 6.49, 'Desserts', '/images/tiramisu.jpg'),
('Pain Perdue', 'French toast with caramelized sugar', 7.49, 'Desserts', '/images/PainPerdue-1.jpg')
ON CONFLICT DO NOTHING;
