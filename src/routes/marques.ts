import { Hono } from 'hono'
import {Marque} from '../models/marques'
import { isValidObjectId } from 'mongoose'

const api = new Hono().basePath('/marques')

api.get('/', async (c)=>{
    const allMarque = await Marque.find()

    return c.json(allMarque)
})

api.get('/:marqueId', async (c)=>{
    const _id = c.req.param('marqueId')

    if(isValidObjectId(_id)){
        const oneMarque = await Marque.findOne({_id})
        return c.json(oneMarque)
    }
    return c.json({msg:'ObjectId malformed'},400)
})

api.post('/',async (c)=>{
    const body = await c.req.json()
    try {
        const newMarque  = new Marque(body)
        const saveMarque = await newMarque.save()
        return c.json(saveMarque, 201)
    } catch (error:unknown) {
        return c.json(error._message,400)
    }
})

api.put('/:marqueId',async (c)=>{
    const _id  = c.req.param('marqueId')
    const body = await c.req.json()
    const q = {
        _id
    }
    const updateQuery = {
        ...body
    }
    const tryToUpdate = await Marque.findOneAndUpdate(q,updateQuery,{new:true})
    return c.json(tryToUpdate,200)

})

api.delete('/:marqueId',async (c)=>{
    const _id  = c.req.param('marqueId')
    const tryToDelete = await Marque.deleteOne({_id})
    const {deletedCount} = tryToDelete
    if(deletedCount){
        return c.json({msg:"DELETE done"})
    }
    return c.json({msg:"not found"},404)
    
})

export default api