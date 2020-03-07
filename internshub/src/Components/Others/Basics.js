import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Basics() {
  const [answer, setAnswer] = useState('True');
  const [users, setUsers] = useState([]);
  const [interns, setInterns] = useState({ name: '', age: '' });
  function changeAnswer() {
    setAnswer(prevAnswer => (prevAnswer === 'True' ? 'False' : 'True'));
  }

  const handleChange = event => {
    setInterns({ ...interns, [event.target.name]: event.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://192.168.0.194:3000/api/v1/interns', interns)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get('http://192.168.0.194:3000/api/v1/users').then(response => {
      console.log(response);
      const userArr = response.data.data.user;
      const user = userArr.map(user => user.fullname);
      setUsers(user);
    });
    //.then(data => console.log(data));
    // .then(response => setUsers(response.data.data.users));
  }, []);
  // const user = users.map(user => user.fullname);
  // console.log(user);
  return (
    <div>
      <p>Answer is {answer}</p>
      <button onClick={changeAnswer}>Change</button>
      <h2>
        The JSON below is loaded from an external API!
        {JSON.stringify(users)}
      </h2>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h5>Example</h5>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={interns.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              name="age"
              value={interns.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <button className="btn blue darken-3" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <p>{interns.age}</p>
      <p>{interns.name}</p>
    </div>
  );
}

export default Basics;

// function App() {
//   const [count, setCount] = useState(0)
//   const [color, setColor] = useState("")

// Component did mount
//   useEffect(() => {
//       const intervalId = setInterval(() => {
//           // setCount(prevCount => prevCount + 1)
//       }, 1000)
//       return () => clearInterval(intervalId)
//   }, [])

// Component did update
//   useEffect(() => {
//       setColor(randomcolor())
//   }, [count])

//   return (
//       <div>
//           <h1 style={{color: color}}>{count}</h1>
//       </div>
//   )
// }

//Signup
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// const Signup = () => {
//     const [customerSignUp, setCustomerSignUp] = useState(
//         { email: '', password: '', firstName: '', lastName: ''}
//     );

//     const handleChange = (event) => {
//         setCustomerSignUp({...customerSignup, [event.target.name]: event.target.value})
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         axios.post('/api/Customer/SignUp', customerSignup)
//           .then(function (response) {
//               console.log(response)
//           })
//           .catch(function (error) {
//               console.log(error)
//           })
//     }
//     return (
//       <div className="container">
//           <form className='white' onSubmit={handleSubmit}>
//               <h5 className="grey-text.text-darken-3">Sign Up With Email</h5>
//               <div className="input-field">
//                   <label htmlFor="lastName">Last Name</label>
//                   <input type="text" name="lastName" value={customerSignUp.lastName} onChange={handleChange} required />
//               </div>
//               <div className="input-field">
//                   <button className="btn blue darken-3" type="submit">Sign Up</button>
//               </div>
//           </form>
//       </div>
//   );
// }
// export default Signup
