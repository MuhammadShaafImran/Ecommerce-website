-- Function to check stock availability
CREATE OR REPLACE FUNCTION check_stock_availability(
    _product_ids INTEGER[],
    _quantities INTEGER[]
) 
RETURNS BOOLEAN 
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
    i INTEGER;
    _stock INTEGER;
BEGIN
    -- Validate array lengths
    IF array_length(_product_ids, 1) <> array_length(_quantities, 1) THEN 
        RAISE EXCEPTION 'Product IDs and quantities arrays must have equal length';
    END IF;

    -- Check stock for each product
    FOR i IN 1..array_length(_product_ids, 1) LOOP
        SELECT stock INTO _stock
        FROM inventory
        WHERE product_id = _product_ids[i];

        IF _stock IS NULL THEN
            RAISE EXCEPTION 'Product % not found in inventory', _product_ids[i];
        END IF;

        IF _stock < _quantities[i] THEN
            RETURN FALSE;
        END IF;
    END LOOP;

    RETURN TRUE;
END;
$$;

-- Function to reduce stock
CREATE OR REPLACE FUNCTION reduce_stock(
    _product_id INTEGER,
    _quantity INTEGER
) 
RETURNS VOID 
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE inventory
    SET stock = stock - _quantity,
        updated_at = CURRENT_TIMESTAMP
    WHERE product_id = _product_id AND stock >= _quantity;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Failed to update stock for product %', _product_id;
    END IF;
END;
$$;

-- Function to create payment
CREATE OR REPLACE FUNCTION create_payment(
    _user_id INTEGER,
    _amount DECIMAL,
    _method VARCHAR
)
RETURNS INTEGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
    _payment_id INTEGER;
BEGIN
    INSERT INTO payments (
        user_id,
        amount,
        method,
        status,
        created_at
    ) VALUES (
        _user_id,
        _amount,
        _method,
        'pending',
        CURRENT_TIMESTAMP
    ) RETURNING id INTO _payment_id;

    RETURN _payment_id;
END;
$$;

-- Function to process order
CREATE OR REPLACE FUNCTION process_order(
    _user_id INTEGER,
    _product_ids INTEGER[],
    _quantities INTEGER[],
    _prices DECIMAL[],
    _shipping_cost DECIMAL,
    _discount_amount DECIMAL,
    _payment_method VARCHAR,
    _address_id INTEGER
) 
RETURNS INTEGER 
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
    _order_id INTEGER;
    _payment_id INTEGER;
    _total_amount DECIMAL := 0;
    i INTEGER;
BEGIN
    -- Calculate total amount
    FOR i IN 1..array_length(_product_ids, 1) LOOP
        _total_amount := _total_amount + (_prices[i] * _quantities[i]);
    END LOOP;
    
    -- Add shipping and subtract discount
    _total_amount := _total_amount + _shipping_cost - _discount_amount;

    -- Create payment first
    _payment_id := create_payment(_user_id, _total_amount, _payment_method);

    -- Create order with payment and address
    INSERT INTO orders (
        user_id,
        payment_id,
        address_id,
        status,
        total_amount,
        shipping_cost,
        discount_amount,
        created_at
    ) VALUES (
        _user_id,
        _payment_id,
        _address_id,
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
            price
        ) VALUES (
            _order_id,
            _product_ids[i],
            _quantities[i],
            _prices[i]
        );

        -- Reduce stock
        PERFORM reduce_stock(_product_ids[i], _quantities[i]);
    END LOOP;

    RETURN _order_id;
END;
$$;

-- Trigger function for stock validation
CREATE OR REPLACE FUNCTION validate_cart_item_stock()
RETURNS TRIGGER 
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
    _stock INTEGER;
BEGIN
    SELECT stock INTO _stock
    FROM inventory
    WHERE product_id = NEW.product_id;

    IF _stock IS NULL THEN
        RAISE EXCEPTION 'Product % not found in inventory', NEW.product_id;
    END IF;

    IF _stock < NEW.quantity THEN
        RAISE EXCEPTION 'Insufficient stock for product %', NEW.product_id;
    END IF;

    RETURN NEW;
END;
$$;

-- Add trigger for cart items stock validation
DROP TRIGGER IF EXISTS validate_cart_item_stock ON cart_items;
CREATE TRIGGER validate_cart_item_stock
    BEFORE INSERT OR UPDATE ON cart_items
    FOR EACH ROW
    EXECUTE FUNCTION validate_cart_item_stock();
