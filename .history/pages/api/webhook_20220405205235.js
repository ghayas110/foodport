/* eslint-disable import/no-anonymous-default-export */
import { buffer } from "micro"
import * as admin from "firebase-admin"
const  serviceAccount =require('../../permissions.json')

const app =!admin.apps.length
 ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}): admin.app();

cons
export default async (req, res)=> {
    if(req.method==='POST'){

    }
};   
  