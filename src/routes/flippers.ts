import { Hono } from 'hono'
import {Flipper} from '../models/flippers'
import { isValidObjectId } from 'mongoose'

const api = new Hono().basePath('/flippers')

api.get('/', async (c)=>{
    const allFlipper = await Flipper.find(
        {}, // query
        {}, // projection
        {
            populate:'marque'
        }
    )

    return c.json(allFlipper)
})

api.get('/:flipperId', async (c)=>{
    const _id = c.req.param('flipperId')

    if(isValidObjectId(_id)){
        const oneFlipper = await Flipper.findOne({_id})
        return c.json(oneFlipper)
    }
    return c.json({msg:'ObjectId malformed'},400)
})

api.post('/',async (c)=>{
    const body = await c.req.json()
    try {
        const newFlipper  = new Flipper(body)
        const saveFlipper = await newFlipper.save()
        return c.json(saveFlipper, 201)
    } catch (error:unknown) {
        return c.json(error._message,400)
    }
})

api.post('/:flipperId/:marqueId',async (c)=>{
    const flipperId  = c.req.param('flipperId')
    const marqueId  = c.req.param('marqueId')

    const q = {
        marqueId:flipperId
    }
    const updateQuery = {
        $addToSet:{
            marque:marqueId
        }
    }
    const tryToUpdate = await Flipper.findOneAndUpdate(q,updateQuery,{new:true})
    return c.json(tryToUpdate)  
})

api.put('/:flipperId',async (c)=>{
    const _id  = c.req.param('flipperId')
    const body = await c.req.json()
    const q = {
        _id
    }
    const updateQuery = {
        ...body
    }
    const tryToUpdate = await Flipper.findOneAndUpdate(q,updateQuery,{new:true})
    return c.json(tryToUpdate,200)

})

api.patch('/:flipperId',async (c)=>{
    const _id  = c.req.param('flipperId')
    const body = await c.req.json()
    const q = {
        _id
    }
    const {imgUri,...rest} = body

    const updateQuery = {
        $addToSet:{
            imgUri:imgUri
        },
        $set:{...rest}
    }
    const tryToUpdate = await Flipper.findOneAndUpdate(q,updateQuery,{new:true})
    return c.json(tryToUpdate,200)

})

api.delete('/:flipperId',async (c)=>{
    const _id  = c.req.param('flipperId')
    const tryToDelete = await Flipper.deleteOne({_id})
    const {deletedCount} = tryToDelete
    if(deletedCount){
        return c.json({msg:"DELETE done"})
    }
    return c.json({msg:"not found"},404)
    
})

export default api