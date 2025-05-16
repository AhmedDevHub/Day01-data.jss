const { categories, products } = require('../data');

exports.getAllCategories = (req, res) =>
{
    res.json(categories);
};

//=======================================================================

exports.getCategoryProducts = (req, res) =>
{
    const { id } = req.params;
    const category = categories.find(c => c.id === parseInt(id));

    if (!category)
    {
        return res.status(404).json({ message: 'Category not found' });
    }

    const categoryProducts = products.filter(p => p.categoryId === parseInt(id));
    res.json(categoryProducts);
};

//=======================================================================   

exports.addCategory = (req, res) =>
{
    const { name } = req.body;

    if (!name)
    {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newCategory = {
        id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
        name
    };

    categories.push(newCategory);
    res.status(201).json(newCategory);
}; 