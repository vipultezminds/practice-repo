import React, { useState } from 'react';

function Signup(){
    const [formData, setFormData] = useState({
        Username: '',
        Userdp: '',
        Fullname: '',
        Role: '',
        Bio: '',
        Gender: '',
        MobNo: '',
        Password: '',
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            // The signup was successful; you can redirect or show a success message.
            console.log('Signup successful!');
          } else {
            // Handle errors here, e.g., display an error message to the user.
            console.error('Signup failed.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
    

  return (
    <>
      <h1 className='heading'>Sign up Social page</h1>
      <form className='signupForm' onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          User Display Picture Link:
          <input
            type="text"
            name="Userdp"
            value={formData.Userdp}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Full Name:
          <input
            type="text"
            name="Fullname"
            value={formData.Fullname}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Role:
          <input
            type="text"
            name="Role"
            value={formData.Role}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Bio:
          <input
            type="text"
            name="Bio"
            value={formData.Bio}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Gender:
          <input
            type="text"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Mobile Number (MobNo):
          <input
            type="number"
            name="MobNo"
            value={formData.MobNo}
            onChange={handleChange}
            className="no-spin" 
          />

        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default Signup;