import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './AdminParts.css';

const AdminParts = () => {
    const { register, handleSubmit} = useForm();
    const [imageURL, setImageURL] = useState(null);
 
    const onSubmit = data => {
        console.log(data)
        const eventData = {
            name: data,
            imageURL: imageURL

        };
        const url =`http://localhost:7070/addGrocery`;
        console.log(eventData);
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(eventData) 
        })
        .then(res => console.log('server side response'))
    };

    const handleDataUpload = event =>{
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', 'b0c8dbacaf13b283280daf037da28662');
        imageData.append('image', event.target.files[0])


        axios.post('https://api.imgbb.com/1/upload', 
        imageData)
          .then(function (response) {
              console.log(response);
            console.log(response.data.data.display_url);
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
        }


    return (
        <div className="admin-part">
    <form onSubmit={handleSubmit(onSubmit)}>
   
    <input name="name"  placeholder="Enter The Name" ref={register} /> <br/>
      <input name="wight" placeholder="Enter The Wight" ref={register}/> <br/>
      <input name="price" placeholder="Enter The Price" ref={register} /> <br/>
      <input name="made"  placeholder="made by" ref={register} /> <br/>
      <input type="file" onChange={handleDataUpload} /> <br/> <br/>
      <input type="submit" />
    </form>
        </div>
    );
};

export default AdminParts;