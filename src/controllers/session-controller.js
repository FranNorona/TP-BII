export const getCurrentUserController = (req, res) => {
    try {
        const userData = {
            id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.role,
        };

        res.json({ user: userData });
    } catch(error)  {
        res.status(500).json({ error: "Error al validar usuario"});
    }
};