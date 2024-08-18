const protectedController = (req, res) => {
    res.json(req.user); // req.user contains the payload from the JWT
  };
  
  module.exports = protectedController;
  