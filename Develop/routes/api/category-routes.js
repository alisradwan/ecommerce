const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      attributes: ["id", "category_name"],
      include: [
        { model: Product },
        { attributes: ["id", "product_name", "price", "stock", "category_id"] },
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      attributes: ["id", "category_name"],
      include: [
        { model: Product },
        { attributes: ["id", "product_name", "price", "stock", "category_id"] },
      ],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No Category found with that id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const creatCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(creatCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No Category found with this id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: "No Category found with this id!" });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
