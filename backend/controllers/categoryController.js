import Category from "../models/Category.js";

export async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
}

export async function addCategory(req, res) {
  try {
    const categoryNew = await Category.create(req.body);
    res.status(201).json(categoryNew);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error: error.message });
  }
}
