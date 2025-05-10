-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  full_name VARCHAR,
  phone VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Images
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  url VARCHAR NOT NULL,
  alt_text VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inventory
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL UNIQUE REFERENCES products(id),
  stock INTEGER NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Carts
CREATE TABLE carts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cart Items
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER NOT NULL REFERENCES carts(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  added_at TIMESTAMPTZ DEFAULT NOW()
);
-- Addresses
CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  addressline1 VARCHAR NOT NULL,
  addressline2 VARCHAR,
  city VARCHAR NOT NULL,
  state VARCHAR,
  postal_code VARCHAR,
  country VARCHAR NOT NULL,
  phone VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  amount DECIMAL NOT NULL,
  method VARCHAR NOT NULL,
  status VARCHAR NOT NULL,
  transaction_id VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  payment_id INTEGER NOT NULL REFERENCES payments(id),
  address_id INTEGER NOT NULL REFERENCES addresses(id),
  status VARCHAR NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE specifications (
    spec_id serial PRIMARY KEY,
    product_id integer,
    connectivity VARCHAR(255),
    batteryLife VARCHAR(255),
    compatibility VARCHAR(255),
    dimensions VARCHAR(255),
    weight VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products(id)
);




--------------------------------------------------------------------------------------------------
-- Create a transaction management schema
CREATE SCHEMA IF NOT EXISTS transactions;

-- Function to check stock availability for multiple products
CREATE OR REPLACE FUNCTION transactions.check_stock_availability(
    _product_ids INTEGER[],
    _quantities INTEGER[]
) RETURNS BOOLEAN AS $$
DECLARE
    i INTEGER;
    _available BOOLEAN := TRUE;
BEGIN
    IF array_length(_product_ids, 1) != array_length(_quantities, 1) THEN 
        RAISE EXCEPTION 'Arrays must have equal length';
    END IF;

    FOR i IN 1..array_length(_product_ids, 1) LOOP
        IF NOT EXISTS (
            SELECT 1 FROM products 
            WHERE id = _product_ids[i] AND stock >= _quantities[i]
        ) THEN
            _available := FALSE;
            EXIT;
        END IF;
    END LOOP;

    RETURN _available;
END;
$$ LANGUAGE plpgsql;

-- Function to reduce stock
CREATE OR REPLACE FUNCTION transactions.reduce_stock(
    _product_id INTEGER,
    _quantity INTEGER
) RETURNS VOID AS $$
BEGIN
    UPDATE products
    SET stock = stock - _quantity
    WHERE id = _product_id AND stock >= _quantity;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Failed to update stock for product %', _product_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to process an order
CREATE OR REPLACE FUNCTION transactions.process_order(
    _user_id INTEGER,
    _product_ids INTEGER[],
    _quantities INTEGER[],
    _prices DECIMAL[],
    _shipping_cost DECIMAL,
    _discount_amount DECIMAL
) RETURNS INTEGER AS $$
DECLARE
    _order_id INTEGER;
    _total_amount DECIMAL := 0;
    i INTEGER;
BEGIN
    -- Calculate total amount
    FOR i IN 1..array_length(_product_ids, 1) LOOP
        _total_amount := _total_amount + (_prices[i] * _quantities[i]);
    END LOOP;
    
    -- Add shipping and subtract discount
    _total_amount := _total_amount + _shipping_cost - _discount_amount;

    -- Create order
    INSERT INTO orders (
        user_id,
        status,
        total_amount,
        shipping_cost,
        discount_amount,
        created_at
    ) VALUES (
        _user_id,
        'pending',
        _total_amount,
        _shipping_cost,
        _discount_amount,
        CURRENT_TIMESTAMP
    ) RETURNING id INTO _order_id;

    -- Create order items and reduce stock
    FOR i IN 1..array_length(_product_ids, 1) LOOP
        -- Add order item
        INSERT INTO order_items (
            order_id,
            product_id,
            quantity,
            price_at_time
        ) VALUES (
            _order_id,
            _product_ids[i],
            _quantities[i],
            _prices[i]
        );

        -- Reduce stock
        PERFORM transactions.reduce_stock(_product_ids[i], _quantities[i]);
    END LOOP;

    RETURN _order_id;
END;
$$ LANGUAGE plpgsql;

-- Function to clear cart
CREATE OR REPLACE FUNCTION transactions.clear_cart(
    _cart_id INTEGER
) RETURNS VOID AS $$
BEGIN
    -- Delete cart items
    DELETE FROM cart_items WHERE cart_id = _cart_id;
    
    -- Mark cart as inactive
    UPDATE carts 
    SET is_active = false,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = _cart_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cart not found: %', _cart_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to update product stock
CREATE OR REPLACE FUNCTION update_stock(product_id INTEGER, reduce_by INTEGER)
RETURNS VOID AS $$
BEGIN
    -- Check if there's enough stock
    IF EXISTS (
        SELECT 1
        FROM products
        WHERE id = product_id AND stock >= reduce_by
    ) THEN
        -- Update stock
        UPDATE products
        SET stock = stock - reduce_by
        WHERE id = product_id;
    ELSE
        RAISE EXCEPTION 'Not enough stock available';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to update multiple products' stock in a transaction
CREATE OR REPLACE FUNCTION update_multiple_stock(
    product_ids INTEGER[],
    quantities INTEGER[]
)
RETURNS VOID AS $$
DECLARE
    i INTEGER;
BEGIN
    -- Check array lengths match
    IF array_length(product_ids, 1) != array_length(quantities, 1) THEN
        RAISE EXCEPTION 'Product IDs and quantities arrays must be the same length';
    END IF;
    
    -- Loop through products and update stock
    FOR i IN 1..array_length(product_ids, 1) LOOP
        PERFORM update_stock(product_ids[i], quantities[i]);
    END LOOP;
END;
$$ LANGUAGE plpgsql;
