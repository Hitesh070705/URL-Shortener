const express=require("express")

const {handleGenerateNewShortURL,handleGetURLbyShortId,handleGetAnalytics}=require("../controllers/url")

const router =express.Router()

router.post("/",handleGenerateNewShortURL) 
router.get("/:id",handleGetURLbyShortId)
router.get("/analytics/:id",handleGetAnalytics)
module.exports=router