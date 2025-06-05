const db = require("../models");
const Role = db.role;
const { Op } = require("sequelize");

// Create a new role
exports.create = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: "Role name is required!" });
  }
  try {
    const role = await Role.create({
      name: req.body.name
    });
    res.status(201).send(role);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all roles
exports.findAll = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).send(roles);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a role by id
exports.delete = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({ message: "Role id is required!" });
  }
  try {
    const deleted = await Role.destroy({ where: { id } });
    if (deleted) {
      res.status(200).send({ message: "Role deleted successfully!" });
    } else {
      res.status(404).send({ message: "Role not found!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Search roles by name or id
exports.search = async (req, res) => {
  const { query } = req.body;
  if (!query || !query.trim()) {
    return res.status(400).send({ message: "Search query is required!" });
  }
  try {
    const roles = await Role.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } }, // case-insensitive partial match
          { id: isNaN(Number(query)) ? -1 : Number(query) }
        ]
      }
    });
    res.status(200).send(roles);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Get role details by id
exports.select = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).send({ message: "Role id is required!" });
  try {
    const role = await Role.findByPk(id);
    if (!role) return res.status(404).send({ message: "Role not found!" });
    res.status(200).send(role);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update role details
exports.update = async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) return res.status(400).send({ message: "Role id and name are required!" });
  try {
    const [updated] = await Role.update({ name }, { where: { id } });
    if (updated) {
      const updatedRole = await Role.findByPk(id);
      res.status(200).send(updatedRole);
    } else {
      res.status(404).send({ message: "Role not found or not updated!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
