const { users } = require('../data');

exports.getAllUsers = (req, res) =>
{
    res.json(users);
};

//=======================================================================   

exports.getUserById = (req, res) =>
{
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));

    if (!user)
    {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
};

//=======================================================================

exports.addUser = (req, res) =>
{
    const { name, email } = req.body;

    if (!name || !email)
    {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser)
    {
        return res.status(400).json({ message: 'Email already exist' });
    }

    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

//=======================================================================

exports.replaceUser = (req, res) =>
{
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email)
    {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const index = users.findIndex(u => u.id === parseInt(id));

    if (index === -1)
    {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check if email already exists with another user
    const existingUserWithEmail = users.find(u => u.email === email && u.id !== parseInt(id));
    if (existingUserWithEmail)
    {
        return res.status(400).json({ message: 'Email already in use by another user' });
    }

    const updatedUser = {
        id: parseInt(id),
        name,
        email
    };

    users[index] = updatedUser;
    res.json(updatedUser);
};

//=======================================================================

exports.deleteUser = (req, res) =>
{
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id));

    if (index === -1)
    {
        return res.status(404).json({ message: 'User not found' });
    }

    const deletedUser = users.splice(index, 1)[0];
    res.json(deletedUser);
}; 