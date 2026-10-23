import { useState, useEffect } from "react";
import image from "../image/image.jpg";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function Client() {
  const [client, setClient] = useState([]);

  const [data, setData] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState("");
 
  const getUser = async () => {
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`${BACKEND_URL}/api/v2/search/${email}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setClient(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const [services, setServices] = useState([]);
  const getServices = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v2/services`, {
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      setServices(data.services);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const initializePageData=async()=>{
      try {
        await getUser();
        await getServices();
      } catch (error) {
        console.log(error.message)
      }
    }
    initializePageData();
  }, []);
  const handleSubmit = async () => {
    const token =localStorage.getItem("token")
    if(!appointmentDate){
        throw new Error("book an appointment date with valid inputs");
    }
    try {
        const cleanData= {
            service:data._id,
            staffMember:data.staffMember._id,
            appointmentDate:new Date(appointmentDate)
        }
        console.log(cleanData)
        const res= await fetch(`${BACKEND_URL}/api/v2/bookAnAppointment`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                authorization:`Bearer ${token}`
            },
            body:JSON.stringify(cleanData)
        })
        const returnedData= await res.json();
        if(!res.ok){
            throw new Error(returnedData.message)
        }
        console.log(returnedData)
    } catch (error) {
        console.log(error);
    }   
    
  };
  return (
    <>
      <div>
        <div>
          <h1 className="title"> Welcome Back {client.name}</h1>
        </div>
      </div>
      <div>
        <h2>Saloon Service Menu & Booking</h2>
        <p>Browser catalog values and Schedule for resevation Slot.</p>
        <h2>Select Sevice</h2>
        <div>
          {services.map((service) => (
            <div className="card-Contain" key={service._id}>
              <div className="service">
                <img src={image} alt="" />
                {/* <span
                  style={{
                    backgroundColor:
                      service.role === "client" ? "#d3dff5ff" : "#c6d2d8ff",
                    color: service.role === "client" ? "#1a73e8" : "#1d027fff",
                  }}
                  className="badge"
                >
                  {service.role}
                </span> */}
              </div>
              <div className="detailblock">
                <h3 className="workername">{service.serviceName}</h3>
                <div className="employeInfo">
                  <p className="infortext">
                    <strong>Price:</strong> {service.price} (SAR)
                  </p>
                  <p className="infortext">
                    <strong>duration:</strong> {service.duration} minutes
                  </p>
                </div>
              </div>
              <div className="supervisor">
                <p className="infortext">
                  <strong>DEscription:</strong> {service.description}
                </p>
                <strong>Worker:</strong>{" "}
                {service.staffMember ? (
                  <span className="supervisorActive">
                    {service.staffMember.name} ({service.staffMember.speciality}
                    )
                  </span>
                ) : (
                  <span className="supervisorNone">Independent</span>
                )}
              </div>
              <div>
                <button onClick={() => handleSubmit(setData(service))}>
                  Book An Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>
          <label
            htmlFor="time"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Select Date
          </label>
          <input
            type="datetime-local"
            name="appointmentDate"
            id="time"
            value={appointmentDate}
            onChange={(e)=>setAppointmentDate(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: " 1px solid #cc",
            }}
          />
        </div>
      </div>
      <div>
        <div>
          <h1>Booked:</h1>
          <p className="infortext">
            <strong>Sevice Name:</strong> {data.serviceName}
          </p>
        </div>
      </div>
    </>
  );
}

export default Client;
