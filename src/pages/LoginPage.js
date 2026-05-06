import { useState } from "react";

function LoginPage({onLogin})
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () =>{
        fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({email, password})
        }).then(res =>{
            if(!res.ok)
            {
                throw new Error("Invalid Email or Password");
            }
            
            res.json();
        })

        .then(data =>{

            alert("Login successful")
            onLogin()
        })
        .catch(err =>{
            alert(err.message);
        });


};
return(
    <div>
        <h2 style={
            {
                textAlign : "center"
            }
        
        } >Register</h2>
        <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
        <input
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button 
        style={{
        width: "200px",
        backgroundColor: "#007bff",
        padding: "10px",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginLeft: "30px"


    }}
      
       onClick={login}>Login</button>



    </div>
);

}

export default LoginPage;