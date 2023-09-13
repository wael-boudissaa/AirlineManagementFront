import {
  Card,
  Input,
 Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";




const SignUp = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [adresse, setAdresse] = useState("");


  const registerUser = async () => {
    console.log(email, password);
    const response = await fetch("http://localhost:5001/sign/up", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        first_name : first_name, 
        last_name : last_name, 
        adresse : adresse
      }),
    });
  
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData)
    } else {
      console.log("Request failed. Status:", response.status);
    }
  };
  const handleRegister=()=> {
    registerUser();
    setAdresse("");
    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")
  }
  return (
    <div className="bg-blue-gray-300 w-screen h-screen flex flex-col justify-center  items-center">
      <Card
        color="transparent"
        shadow={false}
        className="flex flex-col items-center justify-center w-1/2 h-3/4 bg-white">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="First Name" value = {first_name} onChange={(e)=> setFirstName(e.target.value)}/>
            <Input size="lg" label="Last Name"  value = {last_name} onChange={(e)=> setLastName(e.target.value)}/>
            <Input size="lg" label="Adresse" value = {adresse} onChange={(e)=> setAdresse(e.target.value)} />
            <Input size="lg" label="Email"  value = {email} onChange={(e)=> setEmail(e.target.value)}/>
            <Input type="password" size="lg" label="Password" value = {password} onChange={(e)=> setPassword(e.target.value)} />
          </div>

          <Button className="mt-6" fullWidth onClick={()=> handleRegister()}>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};
export default SignUp;
