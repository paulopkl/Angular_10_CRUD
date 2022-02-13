const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
const create = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: "Content can't be empty" })
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });
  // Save Tutorial in the database
  tutorial.save(tutorial)
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};
// Retrieve all Tutorials from the database.
const findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Tutorial.find(condition)
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            return res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
// Find a single Tutorial with an id
const findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
        .then(data => {
            if (!data) return res.status(404).send({ message: "Not found Tutorial with id " + id });
            else return res.send(data);
        })
        .catch(err => {
            return res
                .status(500)
                .send({ message: "Error retrieving Tutorial with id=" + id });
        });
};
// Update a Tutorial by the id in the request
const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else return res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};
// Delete a Tutorial with the specified id in the request
const deleteOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findByIdAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
        } else {
            res.send({
            message: "Tutorial was deleted successfully!"
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
        });
        });
};
// Delete all Tutorials from the database.
const deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
        res.send({
            message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all tutorials."
        });
        });
};
// Find all published Tutorials
const findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        });
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteOne,
    deleteAll,
    findAllPublished
}