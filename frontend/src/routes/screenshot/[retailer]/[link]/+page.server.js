import fs from 'fs'
import path from 'path'

export const load = async ({ locals, params }) => {

    if(!locals.session){
        throw redirect(303, '/login')
    }

    const downloadImg = async() => {
        const response = await fetch(`https://pricezag.com/screenshot/${params.retailer}/${params.link}`)
        const buffer = await response.arrayBuffer()

        const dirPath = path.join('./static', 'screenshot')
        const filePath = path.join(dirPath, `${params.retailer}-${params.link}`)


        if(!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath)
        }

        fs.writeFile(filePath, Buffer.from(buffer), (err) => {
            if(err){
                throw err;
            }
            console.log('screenshot successfully downloaded.')
        })

        const fileName = `${params.retailer}-${params.link}`

        return fileName;
    }

    const fileName = await downloadImg()
    
    return { params, fileName }
}