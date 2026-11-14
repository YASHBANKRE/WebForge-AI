import generateResponse from "../config/openRouter.js";
import extractJson from "../utils/extractJson.js";
    export const getCurrentUser = async (req, res) => {
        try{
            if(!req.user)return res.json({user: null});
            return res.json(req.user);
        }catch(e){
            return res.status(500).json({message: `get current user error: ${e}`});
        }
    }

    // export const generateDemo = async(req, res)=>{
    //     try{
    //         const result = await generateResponse("hello")
    //         const data = await extractJson(result);
    //         return res.status(200).send(data);
    //     }catch(e){
    //         return res.status(500).json({message: `generate demo error: ${e}`});
    //     }
    // }