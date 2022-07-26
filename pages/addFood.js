

import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import addfood from '../styles/AddFood.module.css'
import Head from 'next/head'
import { useLocation, useParams } from 'react-router';
// import Link from 'next/link'
import { useSelector } from 'react-redux';
import { selectUser } from '.././components/features/UserSlice'
import { addDoc, collection, serverTimestamp, updateDoc,doc } from 'firebase/firestore';
import { db,storage } from '../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
const addFood = () => {
    const user = useSelector(selectUser);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [remail, setRemail] = useState("");
    const [accid, setAccid] = useState("");
    const [url, setURL] = useState("");

    let params = useParams()
    const router = useRouter()
    const {id} = router.query
    const {resname} = router.query
    //  let location = useLocation('')
    useEffect(() => {
  

      const users = localStorage.getItem("email");
      const accid = localStorage.getItem("accid");
      setAccid(accid ? accid : "") 
      setRemail(users ? users : "");
  }, []);
    const addInagetoPost =(e)=>{
      const reader = new FileReader();
      if (e.target.files[0]){
          reader.readAsDataURL(e.target.files[0])
      }
      reader.onload = (readerEvent)=>{
          setFile(readerEvent.target.result);
   
      }
  }
      const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const docRef=  await addDoc(collection(db, 'food'), {
          title:title,
          price:price,
          category:category,
          type:type,
          id:id,
          description:description,
          file:file,
          remail:remail,
          resname:resname,
         
          accid:accid,
        time:serverTimestamp(),
          })
        
         const ImageRef = ref(storage, `food/${docRef.id}/image`);
        //  await uploadString(ImageRef,file,"data_url").then(async (snapshot)=>{
        //      const downloadUrl=await getDownloadURL(ImageRef);
        //      await updateDoc(doc(db,"resturant",docRef.id),{
        //          image:downloadUrl
        //      })
        //  }
        await uploadString(ImageRef,file,'data_url').then(
            async(snapshot)=>{
                const downloadUrl=await getDownloadURL(ImageRef);
              await updateDoc(doc(db,"food",docRef.id),{
                  image:downloadUrl,
                  itemid:docRef.id
              })   
            }
            
        )
        alert("form submited")
        } catch (err) {
          alert(err)
        }
    }
    
    console.log("ghhhh",id)
  return (
    <>
        <Head>
            <title>Food Port</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" />
        </Head>

        <main>
        <div className={addfood.form_img}>
            <div className={addfood.main_from}>
                <div className={addfood.upper_div}></div>    
            </div>

          <form action="">
          <span className={addfood.center_logo}> <img src="/img/logologo.f87723ea.png" alt="" className={addfood.form_logo}/></span>
            <div className="row justify-content-center" id={addfood.form_row}>
                <div className="col-lg-10">

                    <h3 className="text-center">Add Food</h3>

                    <div className={addfood.icons_group}>
                        <img src="/img/signin.png" alt="" />
                        <input type="text" className="form-control" name="" id="" placeholder="category"  onChange={(e) => setCategory(e.target.value) }/>
                    </div>

                    <div className={addfood.icons_group}>
                       <img src="/img/dish.png" alt="" />
                        <select className="form-control" value={type} id={addfood.select_text} onChange={(e) => setType(e.target.value)}>
                          <option>Select Food Type</option>
                          <option value="dinner">Dinner</option>
                          <option value="lunch">Lunch</option>
                          <option value="breakfast">Breakfast</option>
                        </select>
                    </div>

                    <div className={addfood.icons_group}>
                        <img src="/img/title.png" alt="" />
                        <input type="text" className="form-control" name="" id="" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className={addfood.icons_group}>
                        <img src="/img/tag.png" alt="" />
                        <input type="text" className="form-control" name="" id="" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    <div className={addfood.icons_group}>
                        <textarea id="" name=""  placeholder='Description' className={addfood.textdes} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className={addfood.icons_group}>
                        <input type="file" className="form-control" id={addfood.file_input} onChange={addInagetoPost} />
                    </div>
                    <br/>
                    <button className={addfood.form_btns} onClick={handleSubmit}>Submit</button> 
                </div>
            </div>
      </form>
        </div>
        </main>
    </>
  )
}

export default addFood