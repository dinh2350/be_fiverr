module.exports.checkExist = (Model) => async (req, res, next) => {
  const { id } = req.params;
  try {
    const detail = await Model.findOne({ _id: id }).exec();
    console.log(detail);
    if (detail) {
      next();
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
