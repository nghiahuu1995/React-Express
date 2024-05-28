import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cars from "../../Cars";
import Button from "../Button"
// import './Protected.css';
import '../styles.css'
const server = '192.168.1.32' ;
const local = 'localhost';
const Protected = () => {
  const [cars, setCars] = useState([]);
  
  const [carID,setCarID] = useState(null)
  const [selectedID,setSelectedID ] = useState(null)
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: ''
  });
  const navigate = useNavigate();

  const fetchCars = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://${server}:8000/auth/protected/cars`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCars(data);
      } else {
        console.log('Failed to fetch cars');
      }
    } catch (err) {
      console.error('Error fetching cars:', err.message);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [cars]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://${server}:8000/auth/protected/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchCars(); // Fetch the updated list of cars
        setFormData({
          make: '',
          model: '',
          year: ''
        });
      } else {
        console.log('Failed to add car');
      }
    } catch (err) {
      console.error('Error adding car:', err.message);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://${server}:8000/auth/protected/cars/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      });
      if (response.ok) {
        fetchCars(); // Fetch the updated list of cars
      } else {
        console.log('Failed to delete car');
      }
    } catch (err) {
      console.error('Error deleting car:', err.message);
    }
  };
const handleSelectID = async(id) => {
  console.log(id);
  setSelectedID(id)
  // try {
  //   const token = localStorage.getItem('token');
  //   const response = await fetch(`http://${server}:8000/auth/protected/cars/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': token,
  //       },
  //       body:JSON.stringify(formData)
  //     });
  //     if (!response.ok) throw new Error('Failed to update post');
  // }
  // catch(err) {

  // }
}
const handleEditCar = async(id) => {
  console.log(id);
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://${server}:8000/auth/protected/cars/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body:JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Failed to update post');
  }
  catch(err) {

  }
}
  return (
    <div>
      <header>
        <h1>Car Management</h1>
        <button id="signout-btn" onClick={handleSignOut}>Sign out</button>
      </header>
      <main>
        <div className="container">
          <div id="output-container">
            <div id="output">
              <Cars cars={cars} onDelete={handleDeleteCar} onEdit={handleSelectID}/>
            </div>
          </div>
          <div id="form-container">{selectedID ? <button color="blue" onClick={() => handleEditCar(selectedID)}>Edit</button> : ''}
            <form id="add-post-form" onSubmit={handleAddCar}>
              <label htmlFor="post-make">Make:</label>
              <input 
                type="text" 
                id="post-make" 
                name="make" 
                required 
                value={formData.make} 
                onChange={handleChange} 
              />
              <label htmlFor="post-model">Model:</label>
              <input 
                type="text" 
                id="post-model" 
                name="model" 
                required 
                value={formData.model} 
                onChange={handleChange} 
              />
              <label htmlFor="post-year">Year:</label>
              <input 
                type="number" 
                id="post-year" 
                name="year" 
                required 
                value={formData.year} 
                onChange={handleChange} 
              />
              <button type="submit">Add Car</button>
              
              <button type="button" id="cancel-btn" style={{ display: "none" }}>
                Cancel
              </button>
              
            </form>
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Car Management</p>
      </footer>
    </div>
  );
};

export default Protected;
