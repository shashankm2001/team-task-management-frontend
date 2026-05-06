import { useState } from "react";

function RegisterPage({onBackToLogin})
{
     const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("MEMBER");

    const register = () =>{

        fetch("http://localhost:8080/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },

            body: JSON.stringify({name, email, password, role})


    }).then(res => res.json())
    .then(data =>{

        alert("Registration successful");
        console.log(data);
        onBackToLogin();
    });

};
return(
    <div>
        <h2>Register</h2>

                    <input 
                    placeholder="Name"
                    onChange={e => setName(e.target.value)}
                    />
                    <input
                    placeholder="Email"
                    onChange={e =>setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <select onChange={e => setRole(e.target.value)}>
                        <option value="MEMBER">MEMBER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>

                    <button onClick={register}>
                        Register
                    </button>


    </div>

);
}

export default RegisterPage;

