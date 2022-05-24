import Router from 'next/router';
import React from 'react'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import DCss from '../styles/dashboard.module.css'
import { selectResturant } from './features/ResSlice';
import tab_style from '../styles/tabs.module.css'
import Link from 'next/link'
 const LocalChainTabs = ({obj}) => {
    console.log(obj); 
    const router = useRouter();
    const  dispatch = useDispatch();
    const openResturant=()=>{
        let payload = obj
         dispatch(selectResturant(payload));
        router.push('/resbox', obj)
      }
      function handleClickedd() {
        router.push({ pathname: "/addFood", state: obj });
        
      }
      console.log(obj);
  return (
      
   
  <div className={tab_style.content_box}>
      <img src={obj?.data().image} className={tab_style.img_box_item}  />
      <div className={tab_style.content_text_box}>
          <h5 className={tab_style.content}>
              {obj?.data().resName}
              <span className={`${tab_style.rating_resturent}`}>*****</span>
          </h5>
          <h5 className={tab_style.content}>
              <p>{obj?.data().address}</p>
              <button className={tab_style.btn_see_more} onClick={openResturant}>See More</button>
          </h5>
      </div>
</div>

)
}
export default LocalChainTabs;