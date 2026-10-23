import { useState } from "react";

function Service({users}){
    const[loading, setLoading]=useState('');
    const [formData,setFormData]=useState({
        serviceName:'',
        description:'',
        duration:'',
        price:'',
        staffMember:''
    });
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const handleSumit=(e)=>{
        e.preventDefault();
        
        console.log(formData)
        setLoading(prev=>!prev);
        setTimeout(async()=>{
            const token = await localStorage.getItem('token')
            try {
                const response= await fetch(`${BACKEND_URL}/api/v2/createService`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        authorization:`Bearer${token}`
                    },
                    body:JSON.stringify({
                        ...formData,
                        price:parseInt(formData.price),
                        duration:Number(formData.duration)
                    })
                })
                const data = await response.json();
                console.log(data)
                if(!response.ok){
                    throw new Error(data.message);
                }
                
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(prev=>!prev);
            }
        },1500)
    }
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    }
    return(
        <div className="container">
            <div className="card">
                <header className="header">
                    <h2>Catalog Management: Services And Pricing</h2>
                    <p>Update service itemss, Adjust Pricing indices, or allocate baseline staff requirements.</p>
                </header>
                <div className="">
                    <div>
                        <h3>Add New Service Offering</h3>
                        <form onSubmit={handleSumit}>
                            <label htmlFor="service-label">Service Display Title </label>
                            <input type="text" name="serviceName" required placeholder="Balayage Hair Treatment" value={formData.serviceName} onChange={handleChange}/>

                            <label htmlFor="description">Description </label>
                            <textarea type="text" placeholder="Brief breakDown of what is included" required name="description" value={formData.description} onChange={handleChange} />
                            <div>
                                <div className="inputGroup">
                                    <label htmlFor="session duration">Session Duration (Mins)</label>
                                    <input type="number"required placeholder="60" min="5" id="session duration" name="duration" value={formData.duration} onChange={handleChange} />
                                </div>
                                <div className="inputGroup">
                                    <label>Base Price (SAR)</label>
                                    <input type="number"required placeholder="88" min="0" name="price" value={formData.price} onChange={handleChange} />
                                </div>
                                
                                <label>Assign Default Staff Member </label>
                                    <select name="staffMember"  value={formData.staffMember} onChange={handleChange}>
                                        <option value="">--Select Staff--</option>
                                        {users.map((user=>(
                                            <option value={user._id} key={user._id}>Name:{user.name} - Speciality: {user.speciality}</option>
                                        )))}

                                    </select>
                                <div>
                                    <button type="submit">{ loading? " Publishing... ":"Publish Service Item" }</button>
                                </div>
                                

                            </div>
                        </form>
                    </div>
                    <div>
                        <h3>Current Active Catalog</h3>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Service;