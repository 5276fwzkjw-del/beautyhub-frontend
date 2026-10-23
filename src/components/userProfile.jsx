import { useEffect, useState } from "react";

function UserProfile() {
  const [employee,setEmployee]=useState([]);
  const [newImage,setNewImage]=useState(null);
  const [incomingData,setIncomingData]=useState('');
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const getUser=async()=>{
    const email=localStorage.getItem("userEmail");
    const token=localStorage.getItem("token")
    try {
      const res= await fetch(`${BACKEND_URL}/api/v2/search/${email}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          authorization:`Bearer ${token}`
        }
      })
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.message)
      }
      setEmployee(data.user);
    } catch (error) {
      console.log(error)
    }
  };
  const UpdateUser=()=>{
    setTimeout(async()=>{
      const email=localStorage.getItem("userEmail");
    
      const containerformData = new FormData();
      containerformData.append("avatar",newImage);
      containerformData.append("name",incomingData)
      try {
        const res = await fetch(`${BACKEND_URL}/api/v2/updateImage/${email}`,{
          method:"PUT",
          body:containerformData,
        });
        const data = await res.json();
        if(!res.ok){
          throw new Error("Error", data);
        }
        setEmployee((prev)=>({
          ...prev,
          avatar: data.user.avatar,
          name: data.user.name
        }))
      } catch (error) {
        console.log(error)
      }
    },1500)
  }
  useEffect(()=>{
    const initializePageData=async()=>{
      try{
        await getUser()
      } catch (error) {
        console.log(error.message)
      }
    }
    initializePageData()
  },[]);
  return (
    <div className="employeSection">
      <h1 className="title"> Welcome Back {employee.name}</h1>
      <div className="cardContainer">
        
          <div className="card-Contain" key={employee._id}>
            <div className="employee">
              <img src={`${BACKEND_URL}${employee.avatar}`} alt="" />
              <span
                style={{
                  backgroundColor:
                    employee.role === "manager" ? "#d3dff5ff" : "#c6d2d8ff",
                  color: employee.role === "manager" ? "#1a73e8" : "#1d027fff",
                }}
                className="badge"
              >
                {employee.role}
              </span>
            </div>
            <div className="detailblock">
              <h3 className="workername">{employee.name}</h3>
              <div className="employeInfo">
                <p className="infortext">
                  <strong>Email:</strong> {employee.email}
                </p>
                <p className="infortext">
                  <strong>Age:</strong> {employee.age} years
                </p>
                <p className="infortext">
                  <strong>Country:</strong> {employee.country}
                </p>
                <p className="infortext">
                  <strong>Phone_N:</strong> {employee.phone}
                </p>
                <p className="infortext">
                  <strong>Speciality:</strong> {employee.speciality}
                </p>
                <p className="infortext">
                  <strong>Salary:</strong> {employee.salary} SAR
                </p>
              </div>
            </div>
            <div className="supervisor">
              <strong>Direct Supervisor:</strong>{" "}
              {employee.supervisor ? (
                <span className="supervisorActive">
                  {employee.supervisor.name} ({employee.supervisor.role})
                </span>
              ) : (
                <span className="supervisorNone">Independent</span>
              )}
            </div>
          </div>

      </div>
      <div className="contain">
        <div>
          <input type="text" name="incomingData" id="image" placeholder="Edit your name" value={incomingData} onChange={(e)=>setIncomingData(e.target.value)} />
        </div>
        <div>
          <label htmlFor="image">Change your profile Image:</label>
          <input type="file" name="avatar" id="image" onChange={(e)=>setNewImage(e.target.files[0])}/>
        </div>
        <button onClick={()=> UpdateUser()}>Upload </button>
      </div>
    </div>
  );
}

export default UserProfile;
