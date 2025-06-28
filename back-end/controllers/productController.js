import { sql } from "../config/db.js";

// Connect the controllers
export const getProducts = async (req, res) => {
  try {
    const products = await sql`
        SELECT * FROM products 
        ORDER BY created_at DESC
        `;
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in getProducts Function:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newProduct = await sql`
    
    INSERT INTO products (name,price,image)
    VALUES (${name},${price},${image})
    RETURNING * 

    `;

    res.status(201).json({
      success: true,
      message: "New Product Added: ",
      data: newProduct[0],
    });
  } catch (error) {
    console.log("Error in createProducts Function:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
        
        SELECT * FROM products WHERE id=${id}
        
        `;
    res.status(200).json({
      success: true,
      message: "Product: ",
      data: product[0],
    });
  } catch (error) {
    console.log("Error in getProduct Function:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteProduct = await sql`
        
        DELETE FROM products WHERE id=${id}

        `;

    if (deleteProduct === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found" });
    }
    console.log("Product Deleted");
    res
      .status(200)
      .json({
        success: true,
        message: "Product Deleted: ",
        data: deleteProduct[0],
      });
  } catch (error) {
    console.log("Error in deleteProduct Function:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const updateProduct = await sql`
        
        UPDATE products
        SET name = ${name}, price = ${price}, image = ${image}
        WHERE id=${id}
        RETURNING*
        
        `;

    if (updateProduct === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found" });
    }

    console.log("Product Updated");
    res
      .status(200)
      .json({
        success: true,
        message: "Product Updated: ",
        data: updateProduct[0],
      });
  } catch (error) {
    console.log("Error in updateProduct Function:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
