import { connect } from "mongoose"
import {myEnv} from '../conf'

const CONNECTION_STRING = `mongodb+srv://${myEnv.MONGODB_USER}:${myEnv.MONGODB_PWD}@${myEnv.MONGODB_CLUSTER}/${myEnv.MONGODB_DATABASE}`

export async function DbConnect(){
    try {    
        const _db =  await connect(CONNECTION_STRING)
        console.log(`connected: ${myEnv.MONGODB_CLUSTER}`);
        return _db
    } catch (e) {
        console.warn(e.errorResponse)
        return e;
    }
}

