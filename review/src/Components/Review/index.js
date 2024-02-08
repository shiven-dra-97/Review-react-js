import "./index.css"
import Loader from "./Loader";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Review = () => {
   const [responseData, setResponseData] = useState(null);
   const [error, setError] = useState(null);
   const [popupContent, setPopupContent] = useState(null);
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      setIsLoading(true)
      axios.get('https://admin.tomedes.com/api/v1/get-reviews?page=1')
         .then(response => {

            setResponseData(response.data);
            setIsLoading(false)
         })
         .catch(error => {

            setError(error)
         });
   }, []);

   const onClickReadMore = (e) => {
      setPopupContent(e)
   }

   const onClosePopup = () => {
      setPopupContent(null)
   }


   return (
      <div className="main">

         <h1 className="head">What Our Customers Say</h1>

         <div className="review">
            {isLoading ? <Loader /> : <> {responseData && responseData.data && responseData.data.map((e) => (
               <>
                  <div className="box">
                     <p>{e.Reviews.length > 321 ? e.Reviews.slice(0, 321) + "..." : e.Reviews}</p>
                     {e.Reviews.length > 321 && <button onClick={() => onClickReadMore(e.Reviews)} className="read-more">Read More</button>}
                     <h4>{e.Name}</h4>
                     <h5>Rating {e.rating}</h5>
                     <div className="circle"> <span className="icon">&#10077;</span></div>
                  </div>
               </>
            ))}</>}
            
         </div>
         {popupContent && (
            <div className="popup">
               <p>{popupContent}</p>
               <button className="read-more" onClick={onClosePopup}>Close</button>
            </div>
         )}

      </div>
   )
}

export default Review