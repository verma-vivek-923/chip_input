import { chip_modal } from "../models/chips_model.js";

export const addChips = async (req, res) => {
  const { chip_text } = req.body;

  try {
    if (!chip_text)
      return res.status(400).json({ message: "Enter Chip Value" });

    const find_chip = await chip_modal.findOne({ value: chip_text });

    if (find_chip) return res.status(400).json("Chip Already Exist");

    const new_chip = new chip_modal({
      chipText: chip_text,
    });

    await new_chip.save();

    res.status(200).json({ message: "Chip Add Successfull", new_chip });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const deleteChip = async (req, res) => {
  const { id } = req.params;

  console.log(id)
  const find_chip = await chip_modal.findById(id);

  if (!find_chip) return res.status(400).json({ message: "Chip Not found" });

  await find_chip.deleteOne();

  res.status(200).json({ message: "Chip Deleted Successfully" });
};
