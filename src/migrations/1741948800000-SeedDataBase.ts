import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDataBase1741948800000 implements MigrationInterface {
  name = 'SeedDataBase1741948800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO products (name, description, price, stock, category, is_customizable, status)
      VALUES 
      ('Bicycle Model A', 'Lightweight mountain bike', 599.99, 11, 'bicycles', true, 'active'),
      ('Bicycle Model B', 'Carbon fiber racing bike', 899.99, 12, 'bicycles', true, 'active'),
      ('Bicycle Model C', 'Hybrid city bike', 499.99, 13, 'bicycles', true, 'active'),
      ('Bicycle Model D', 'Electric commuter bike', 1299.99, 14, 'bicycles', true, 'active'),
      ('Bicycle Model E', 'Kids bike with training wheels', 199.99, 15, 'bicycles', true, 'active'),
      ('Bicycle Model F', 'Folding bike for easy storage', 699.99, 16, 'bicycles', true, 'active'),
      ('Bicycle Model G', 'Gravel adventure bike', 1099.99, 0, 'bicycles', true, 'out_of_stock'),
      ('Bicycle Model H', 'Touring bike for long distances', 1199.99, 0, 'bicycles', false, 'out_of_stock'),
      ('Bicycle Model I', 'Downhill mountain bike', 1499.99, 0, 'bicycles', false, 'discontinued'),
      ('Bicycle Model J', 'Classic cruiser bike', 399.99, 0, 'bicycles', false, 'discontinued');
    `);

    await queryRunner.query(`
      INSERT INTO product_customizations (name, description, price, stock, category, type, is_required)
      VALUES 
      ('Aluminum Frame', 'Lightweight aluminum frame', 100.00, 50, 'bicycles', 'frame_type', false),
      ('Carbon Fiber Frame', 'High performance carbon fiber frame', 300.00, 30, 'bicycles', 'frame_type', false),
      ('Matte Finish', 'Smooth matte frame finish', 50.00, 100, 'bicycles', 'frame_finish', false),
      ('Glossy Finish', 'Glossy and reflective frame finish', 50.00, 100, 'bicycles', 'frame_finish', false),
      ('Alloy Wheels', 'Durable alloy wheels', 120.00, 40, 'bicycles', 'wheels', false),
      ('Carbon Wheels', 'Lightweight carbon wheels', 400.00, 20, 'bicycles', 'wheels', false),
      ('Black Rims', 'Stylish black rims', 30.00, 60, 'bicycles', 'rim_color', false),
      ('Silver Rims', 'Classic silver rims', 30.00, 0, 'bicycles', 'rim_color', false),
      ('Steel Chain', 'Standard steel bicycle chain', 20.00, 80, 'bicycles', 'chain', false),
      ('Titanium Chain', 'Ultra-durable titanium chain', 80.00, 30, 'bicycles', 'chain', false),
      ('Red Color', 'Red bicycle frame', 0.00, 200, 'bicycles', 'color', false),
      ('Blue Color', 'Blue bicycle frame', 0.00, 0, 'bicycles', 'color', false),
      ('Small Size', 'Small bicycle size', 0.00, 100, 'bicycles', 'size', true),
      ('Medium Size', 'Medium bicycle size', 0.00, 100, 'bicycles', 'size', true),
      ('Large Size', 'Large bicycle size', 0.00, 100, 'bicycles', 'size', true),
      ('Steel Material', 'Steel frame for durability', 80.00, 50, 'bicycles', 'material', false),
      ('Aluminum Material', 'Lightweight aluminum frame', 150.00, 0, 'bicycles', 'material', false),
      ('Carbon Material', 'Ultra-light carbon fiber frame', 300.00, 20, 'bicycles', 'material', false),
      ('Bottle Holder', 'Frame-mounted bottle holder', 15.00, 100, 'bicycles', 'aditional_feature', false),
      ('LED Lights', 'Integrated LED safety lights', 50.00, 80, 'bicycles', 'aditional_feature', false);
    `);

    await queryRunner.query(`
      INSERT INTO product_customizations_products (product_id, customization_id)
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Aluminum Frame') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Carbon Fiber Frame') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Matte Finish') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Glossy Finish') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Alloy Wheels') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Carbon Wheels') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Black Rims') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Silver Rims') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Steel Chain') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Titanium Chain') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Red Color') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Blue Color') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Small Size') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Medium Size') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Large Size') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Steel Material') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Aluminum Material') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Carbon Material') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Bottle Holder') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'LED Lights') FROM products WHERE name = 'Bicycle Model A'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Glossy Finish') FROM products WHERE name = 'Bicycle Model B'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Carbon Wheels') FROM products WHERE name = 'Bicycle Model B'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Titanium Chain') FROM products WHERE name = 'Bicycle Model B'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Silver Rims') FROM products WHERE name = 'Bicycle Model C'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Steel Chain') FROM products WHERE name = 'Bicycle Model C'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Titanium Chain') FROM products WHERE name = 'Bicycle Model C'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Red Color') FROM products WHERE name = 'Bicycle Model C'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Blue Color') FROM products WHERE name = 'Bicycle Model C'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Small Size') FROM products WHERE name = 'Bicycle Model C'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Medium Size') FROM products WHERE name = 'Bicycle Model C'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Carbon Fiber Frame') FROM products WHERE name = 'Bicycle Model D'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Matte Finish') FROM products WHERE name = 'Bicycle Model D'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Glossy Finish') FROM products WHERE name = 'Bicycle Model D'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Alloy Wheels') FROM products WHERE name = 'Bicycle Model D'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Carbon Wheels') FROM products WHERE name = 'Bicycle Model D'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Black Rims') FROM products WHERE name = 'Bicycle Model D'
      UNION ALL
      SELECT id, (SELECT id FROM product_customizations WHERE name = 'Silver Rims') FROM products WHERE name = 'Bicycle Model D';
    `);

    await queryRunner.query(`
      INSERT INTO prohibited_customizations (id)
      VALUES (gen_random_uuid()), (gen_random_uuid()), (gen_random_uuid()), (gen_random_uuid());
    
      INSERT INTO product_prohibited_customizations (product_id, prohibited_customization_id)
      SELECT 
        (SELECT id FROM products WHERE name = 'Bicycle Model A'),
        (SELECT id FROM prohibited_customizations LIMIT 1);
    
      INSERT INTO prohibited_customizations_combinations (prohibited_customization_id, customization_id)
      SELECT 
        (SELECT id FROM prohibited_customizations LIMIT 1),
        (SELECT id FROM product_customizations WHERE name = 'Small Size')
      UNION ALL
      SELECT 
        (SELECT id FROM prohibited_customizations LIMIT 1),
        (SELECT id FROM product_customizations WHERE name = 'Red Color');
    
      INSERT INTO product_prohibited_customizations (product_id, prohibited_customization_id)
      SELECT 
        (SELECT id FROM products WHERE name = 'Bicycle Model A'),
        (SELECT id FROM prohibited_customizations LIMIT 1 OFFSET 1);
    
      INSERT INTO prohibited_customizations_combinations (prohibited_customization_id, customization_id)
      SELECT 
        (SELECT id FROM prohibited_customizations LIMIT 1 OFFSET 1),
        (SELECT id FROM product_customizations WHERE name = 'Carbon Wheels')
      UNION ALL
      SELECT 
        (SELECT id FROM prohibited_customizations LIMIT 1 OFFSET 1),
        (SELECT id FROM product_customizations WHERE name = 'Titanium Chain');
    
      INSERT INTO product_prohibited_customizations (product_id, prohibited_customization_id)
      SELECT 
        (SELECT id FROM products WHERE name = 'Bicycle Model B'),
        (SELECT id FROM prohibited_customizations LIMIT 1 OFFSET 2);
    
      INSERT INTO prohibited_customizations_combinations (prohibited_customization_id, customization_id)
      SELECT 
        (SELECT id FROM prohibited_customizations LIMIT 1 OFFSET 2),
        (SELECT id FROM product_customizations WHERE name = 'Glossy Finish')
      UNION ALL
      SELECT 
        (SELECT id FROM prohibited_customizations LIMIT 1 OFFSET 2),
        (SELECT id FROM product_customizations WHERE name = 'Black Rims');
    
      INSERT INTO product_prohibited_customizations (product_id, prohibited_customization_id)
      SELECT 
        (SELECT id FROM products WHERE name = 'Bicycle Model C'),
        (SELECT id FROM prohibited_customizations LIMIT 1 OFFSET 3);
    
      INSERT INTO prohibited_customizations_combinations (prohibited_customization_id, customization_id)
      SELECT 
        (SELECT id FROM prohibited_customizations LIMIT 1 OFFSET 3),
        (SELECT id FROM product_customizations WHERE name = 'Steel Material')
      UNION ALL
      SELECT 
        (SELECT id FROM prohibited_customizations LIMIT 1 OFFSET 3),
        (SELECT id FROM product_customizations WHERE name = 'Blue Color');
    `);
    
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM prohibited_customizations_combinations;`);
    await queryRunner.query(`DELETE FROM product_prohibited_customizations;`);
    await queryRunner.query(`DELETE FROM product_customizations_products;`);
    await queryRunner.query(`DELETE FROM prohibited_customizations;`);
    await queryRunner.query(`DELETE FROM product_customizations;`);
    await queryRunner.query(`DELETE FROM products;`);
  }
}
