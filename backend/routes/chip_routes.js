import express from "express";
import { chip_modal } from "../models/chips_model.js";
import { addChips, deleteChip } from "../controllers/chip_controller.js";

const router=express.Router();

router.post("/add",addChips )

router.delete("/delete/:id",deleteChip)

router.get("/fetchChip",async(req,res)=>{

    try {
        const allChip=await chip_modal.find().sort({createdAt:-1});
    
        if(!allChip) return  res.status(400).json({message:'NO Chip Found'})

        res.status(200).json({allChip})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Something Went Wrong",error})
    }
})

export default router;
