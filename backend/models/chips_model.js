import mongoose  from "mongoose";

const chip_Scheme=mongoose.Schema({
    chipText :{
        type:String,
        required:true
    }
},{timestamps:true,versionkey:false})


export const chip_modal=mongoose.model("Chips",chip_Scheme);