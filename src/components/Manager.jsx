import { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee.jsx";
import UpdateUser from "./UpdateUser.jsx";
import image from "../image/image.jpg";
import Service from "./service.jsx";
import { UploadUSerProfile } from "./Upload.jsx";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function Manager() {
  const [users, setUsers] = useState([]);
  const getUser = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v2/getAll`, {
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Error", data.message);
      }
      const employees = await data.users.filter(
        (users) => users.role !== "admin",
      );
      const employee= await employees.filter((user)=>user.role !== "client");
      setUsers(employee)
      console.log(employee.length);
    } catch (error) {
      console.log("Err", error);
    }
  };
  useEffect(() => {
    const initializePageData=async()=>{
      try {
        await getUser();
      } catch (error) {
        console.log(error.message)
      }
    }
    initializePageData()
  }, []);
  const manager = localStorage.getItem("user");
  return (
    <>
      <div>
        <div>
          <h1>Welcome " {manager.toUpperCase()} "</h1>
          <p>Saloon SuperVisor Dasboard</p>
        </div>
        <div>
          <h3>Employees Infor:</h3>
          <div className="employeSection">
            <h1 className="title">All Employee Credentials</h1>
            <div className="cardContainer">
              {users.map((employee) => (
                <div className="card-Contain" key={employee._id}>
                    <div className="employee">
                        <img src={image} alt="" />
                        <span style={{backgroundColor: employee.role==="manager"? "#d3dff5ff": "#c6d2d8ff",
                            color: employee.role==="manager"? "#1a73e8": "#1d027fff"
                        }} className="badge">
                            {employee.role}
                        </span>
                    </div>
                    <div className="detailblock">
                        <h3 className="workername">{employee.name}</h3>
                        <div className="employeInfo">
                            <p className="infortext"><strong>Email:</strong> {employee.email}</p>
                            <p className="infortext"><strong>Age:</strong> {employee.age} years</p>
                            <p className="infortext"><strong>Country:</strong> {employee.country}</p>
                            <p className="infortext"><strong>Phone_N:</strong> {employee.phone}</p>
                            <p className="infortext"><strong>Speciality:</strong> {employee.speciality}</p>
                            <p className="infortext"><strong>Salary:</strong> {employee.salary} SAR</p>
                        </div>
                    </div>
                    <div className="supervisor">
                        <strong>
                            Direct Supervisor:
                        </strong>{" "}
                        {employee.supervisor?
                            (
                                <span className="supervisorActive">
                                    {employee.supervisor.name} ({employee.supervisor.role})
                                </span>)
                            :(<span className="supervisorNone">Independent</span>)
                            
                        }
                    </div>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
        <AddEmployee users={users} />
        <UpdateUser />
        <Service users={users} />
        <UploadUSerProfile/>
      </div>
    </>
  );
}
export default Manager;
