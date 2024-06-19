import prisma from '../database/client.js';

const controller = {};

controller.create = async (req, res) => {
  try {
    const about = await prisma.about.create({ data: req.body });
    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controller.retrieveAll = async (req, res) => {
  try {
    const abouts = await prisma.about.findMany();
    res.status(200).json(abouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controller.retrieveOne = async (req, res) => {
  try {
    const about = await prisma.about.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (about) res.status(200).json(about);
    else res.status(404).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controller.update = async (req, res) => {
  try {
    const about = await prisma.about.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

controller.delete = async (req, res) => {
  try {
    const about = await prisma.about.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default controller;
