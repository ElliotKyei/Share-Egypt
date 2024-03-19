// Import Firestore database
import { db } from '../firebase'
import { useState } from 'react';
//import "./CharityPage.css";

const CharityPage = () => {



  const [info, setInfo] = useState([]);

  // Start the fetch operation as soon as
  // the page loads
  window.addEventListener('load', () => {
    Fetchdata();
  });

  // Fetch the required data using the get() method
  const Fetchdata = () => {
    db.collection("charities").get().then((querySnapshot) => {

      // Loop through the data and store
      // it in array to display
      querySnapshot.forEach(element => {
        var data = element.data();
        setInfo(arr => [...arr, data]);

      });
    })
  }



  // Display the result on the page
  return (
    <div>
      <center>
        <h2>Charities</h2>
      </center>

      <div className="row">
        {
          info.map((data) => (

            <div className="col-sm-3 animated fadeIn">
              <div className="card">
                <div className="card-body">
                  <div className="avatar">
                    <img
                      src={data.coverURL}
                      className="card-img-top"
                      alt=""
                    />
                  </div>
                  <center>
                    <h5 className="card-title">
                      {data.name}
                    </h5>
                  </center>
                  <p className="card-text">
                    <center>
                      Location: {data.charityCenter}
                    </center>
                    <br />
                    <center>
                      <span className="phone">Rating: {data.rating}</span>
                    </center>
                  </p>
                </div>
              </div>
            </div>

          ))
        }
      </div>
    </div>

  );
}

// Define how each display entry will be structured
const Frame = ({ name, cat, location, rate, pic }) => {
  console.log(name + " " + cat + " " + location + " " + rate + " " + pic);
  return (
    <></>
  );
}

export default CharityPage;
