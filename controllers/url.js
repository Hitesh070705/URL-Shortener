const shortid=require("shortid")
const URL=require("../models/url")

async function handleGenerateNewShortURL(req,res){
    const body=req.body
    if(!body.URL) return res.status(400).json({error:"URL is required"})
    const shortID=shortid()
    await URL.create({
    shortID:shortID,
    redirectURL:body.URL,
    visitHistory:[],
    createdBy:req.user._id
    })
    return res.render("home",
    {id:shortID}
    )
}

async function handleGetURLbyShortId(req,res){
       const shortID=req.params.id
       const entry=await URL.findOneAndUpdate(
        {shortID:shortID},
        { $push: { visitHistory : { timestamp: Date.now() }  } }
        )
       res.redirect(entry.redirectURL)
}

async function handleGetAnalytics(req,res){
    const shortID=req.params.id
    const result=await URL.findOne({shortID})
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory   
    })
}

module.exports={
    handleGenerateNewShortURL,
    handleGetURLbyShortId,
    handleGetAnalytics
}