export const sendServerError = (error, res) => {
  console.log(error);
  return res.status(500).json({ msg: error.message });
};
