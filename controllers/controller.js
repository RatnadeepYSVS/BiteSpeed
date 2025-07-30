import { supabase } from "../dbconnect.js"
export const create = async (req,res)=>{ 
    const { body } = req
    const { email,phoneNumber } = body
    if(!email && !phoneNumber ){
        return res.status(422).json({
            "msg":"Woa!! You might wanna check your request!!"
        })
    }
    const { data,error } = await supabase.from("Contact").select("id,email,phoneNumber").or([`email.eq.${email},phoneNumber.eq.${phoneNumber}`])
    if(error){
        return res.status(500).json({
            "error":error
        })
    }
    if(data.length===0){
        let resp = await supabase.from("Contact").insert([{...body}])
        if(resp.error){
            return res.status(500).json({
                "error":resp.error
            })
        }
        return res.status(201).json({
            "msg":"data pushed"
        })
    }
    let primData = data[0]
    let dataBody = { linkedId:primData.id,linkPrecedence:"secondary" }
    let resp = await supabase.from("Contact").insert([{...dataBody,...body}])
    if(resp.error){
        return res.status(500).json({
            "error":resp.error
        })
    }
    let contactData= {
        "primaryContactId":primData.id,
        "emails":[...new Set(data.map(i=>i.email))],
        "phoneNumbers":[...new Set(data.map(i=>i.phoneNumber))],
        "secondaryContacts":[...data.slice(1).map(i=>i.id)]
    }
    return res.status(200).json({
        "contact":contactData
    })
}