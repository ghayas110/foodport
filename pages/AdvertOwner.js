import React, { useEffect, useState } from "react";
import Head from "next/head";
import ResturentSidebar from "./ResturentSidebar";
import DCss from "../styles/dashboard.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from ".././components/features/UserSlice";
import Link from "next/link";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import SalesChart from "../components/SalesChart";
import { createUserWithEmailAndPassword, getAuth, deleteUser } from 'firebase/auth'
import { updateDoc, collection, onSnapshot, orderBy, query, doc, getDocs, where, getDoc, addDoc,deleteDoc } from 'firebase/firestore'
import { db,storage } from "../firebase";
import { TopRes } from "../components/TopRes";
import { TopFood } from "../components/TopFood";

function AdvertOwner() {
  const router = useRouter();
  const user = useSelector(selectUser);
const [usersName, setUsersName] = useState("");
const [visible, setVisible] = useState(false)
  // const [userModal, setUserModal] = useState()
  const [changeData, setChangeData] = useState()
  const [fdata, setFData] = useState()
  const [userData, setUserData] = useState([])
  const [status, setStatus] = useState(false)
  const [flag,setFlag] = useState(false)
  var data = [];

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
 
  useEffect(() => {
    try {
      
      getUser()
      const auth = getAuth();
      const admin=auth.currentUser
      console.log(admin,"admin")

    } catch (error) {
      console.error(error)
    }
  }, [flag])
 
  const getUser = async () => {
   
    const querySnapshot = await getDocs(collection(db, "advertize"), );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data.push({ id: doc.id, ...doc.data() })
      // setUserData(userData=>[...userData,doc.data()])
    })
    const filterData =  data.filter((item)=> item.email===usersName)
    if (filterData) {
      setUserData(filterData)
    }
  }


  const handleModal = async (e) => {
    let modalData = await userData.filter(item => e.target.id == item.id)
    await setFData(modalData[0])
    setVisible(!visible)
  }
  const handleData = (e) => {
    setFData(
      {
        ...fdata, [e.target.name]: e.target.value
      }
    )
  }


  const checkStatus = (e) => {
    if (e.target.name === "edit") {

      console.log("Edit button pressed")
      setStatus(true) // for edit button 
      handleModal(e)
    }
    if (e.target.name === "addUser") {

      console.log("addUser button pressed")
      setStatus(false)  // for add button
      handleModal(e)
    }
  }

  
  
  const firebaseUpdate = async () => {
    const washingtonRef = doc(db, "userid", fdata.id);
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      name: fdata.name,
      email: fdata.email,
      password: fdata.password,
      phone: fdata.phone,
      // address: fdata.address,
    });
    setVisible(false)
    setFlag(!flag)
  }
 
 
 
  const firebaseAdd = async () => {
    await createUserWithEmailAndPassword(auth, fdata.email, fdata.password)
    .then((userCredential) => {
      // Signed in 
      console.log(userCredential)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "userid"), {
      name: fdata.name,
      email: fdata.email,
      password: fdata.password,
      phone: fdata.phone,
      select : "business",
      
      // address: fdata.address,
    });
    console.log("Document written with ID: ", docRef.id);
    setVisible(false)
    setFlag(!flag)

  }

  
  
  
  const delUser = async(e) => {
    const id = e.target.id.substring(1)
    // console.log(id.substring(1))
  //   auth.deleteUser(uid)
  // .then(() => {
  //   console.log('Successfully deleted user');
  // })
  // .catch((error) => {
  //   console.log('Error deleting user:', error);
  // });
    await deleteDoc(doc(db, "userid", id)).then(doc=>console.log(doc));
    setFlag(!flag)
  }

  // console.log(fdata);

  const SignOut = () => {
    if (usersName !== "logged Out") {
      localStorage.clear();
      router.push("./Main_login");
    }}



    useEffect(() => {
      // Perform localStorage action

      const users = localStorage.getItem("email");
      setUsersName(users ? users : "logged Out");
    }, []);

    return (
      <>
        <Head>
          <title>Food Port</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
            rel="stylesheet"
          />
        </Head>
        <main>
          <ResturentSidebar />

          {/* <!-- CARDS SECTION --> */}
          <div className={`${DCss.main_dashboard}`}>
            <div className="container">
              <div className={`${DCss.rows} ${DCss.dash_head_row}`}>
                <div className={`${DCss.dash_head_width_scd}`}>
                  <h5>
                    Welcome to Dashboard
                    <br />
                    <span> Your Name :{`${usersName}`}</span>
                  </h5>
                </div>
                <div className={`${DCss.dash_head_width}`}>
                 
                  <li onClick={SignOut}>
                    <a>Logout</a>
                  </li>
                </div>
              </div>
              <div className={`${DCss.rows}`}>
                {/* <!-- FIRTS REVIEWS SECTION --> */}
                <div className={`${DCss.left_reviews}`}>
                  <h3 className={`${DCss.left_reviews_head_fir}`}>
                    Total views
                  </h3>
                  <div className={`${DCss.progress_reviews}`}>
                    <span className={`${DCss.review_head_sec}`}>
                      Total Ads Posted
                    </span>
                    <div className={`${DCss.progress}`}>
                      <span
                        className={`${DCss.title} ${DCss.timer}`}
                        data-from="0"
                        data-to="85"
                        data-speed="1800"
                      >
                        850
                      </span>
                      <div className={`${DCss.overlay}`}></div>
                      <div className={`${DCss.left}`}></div>
                      <div className={`${DCss.right}`}></div>
                    </div>
                  </div>
               
                </div>

                {/* <!-- CHART BAR SECTION --> */}
                <div className={`${DCss.chart_wrapper} `} style={{backgroundColor : "Gray", height :"100%"}}>
                  <h3 className={`${DCss.left_reviews_head_fir}`}>
                    Post Ad
                  </h3>
                  {/* <canvas id={`${DCss.c}`}></canvas> */}
                  {userData?.map((item, index) => (
                  <div>
             <p>Name:{item.name}</p> 
              
             <p>Email:{item.email}</p> 
        <p>Package{item.packages}</p>   
<a href={item.image}>Image</a> 
</div>             
))}
                </div>
              </div>

              {/* <!-- CARDS SECTION --> */}
   

              {/* <!-- CUSTOMER REVEIWS SECTION --> */}
          
            </div>
          </div>
        </main>
      </>
    );
  };


export default AdvertOwner;
