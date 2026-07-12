import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "./Auth.css";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  });

  const [showPassword,setShowPassword] = useState(false);


  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


 const handleSubmit = async(e)=>{

e.preventDefault();


try{

const response = await registerUser(formData);


console.log(response.data);


alert("Account created successfully");


navigate("/login");


}
catch (error) {
  console.log("Error:", error);
  console.log("Response:", error.response);
  console.log("Data:", error.response?.data);

  alert(error.response?.data?.message || "Registration failed");
}


};


return(

<div className="auth-container">

<div className="auth-card">


<div className="logo">
AssetFlow
</div>


<h2>Create Account</h2>

<p>Start managing your assets</p>



<form onSubmit={handleSubmit}>


<div className="input-box">

<label>Name</label>

<input
type="text"
name="name"
placeholder="Enter your name"
value={formData.name}
onChange={handleChange}
/>

</div>




<div className="input-box">

<label>Email</label>

<input
type="email"
name="email"
placeholder="Enter email"
value={formData.email}
onChange={handleChange}
/>

</div>




<div className="input-box">

<label>Password</label>


<div className="password-box">

<input

type={showPassword ? "text":"password"}

name="password"

placeholder="Create password"

value={formData.password}

onChange={handleChange}

/>


<span 
onClick={()=>setShowPassword(!showPassword)}
>

{showPassword ? "Hide":"Show"}

</span>


</div>


</div>




<button type="submit">
Create Account
</button>



</form>




<div className="switch">
Already have account?

<Link to="/login">
Login
</Link>

</div>


</div>

</div>


)

}


export default Signup;