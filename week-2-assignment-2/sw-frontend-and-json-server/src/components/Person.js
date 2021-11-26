import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'


const Person = ({ ida, onAdd }) => {

  const [person, setPerson] = useState([])

  useEffect(() => {
 
    const getPerson = async (ida) => {
      const tasksFromServer = await fetchPerson(ida)
      var peopleArray = [];
      peopleArray[0] = tasksFromServer
      /*
      if (peopleArray[0] === undefined || peopleArray[0].length == 0){
        setPerson([])
      }

      if (peopleArray[0].length == 1){
        setPerson(peopleArray)
      }
      */
      setPerson(peopleArray)
      
    }

    getPerson(ida)
    
  }, [])

    // Fetch Tasks
    const fetchPeople = async () => {
      const res = await fetch('http://swapi.dev/api/people')
      const data = await res.json()
      
      //return data
      return data.results
    }
  
    // Fetch Task
    const fetchPerson = async (id) => {
      const res = await fetch(`http://swapi.dev/api/people/${id}`)
      const data = await res.json()
      
      //return data
      return data
    }

  return (
    <>

    
    {person.map((person, index) => (

    <div key={index} className="card" id="card-height-width-space">
      <div className="top">
        <div className="flex-col">
          <div className="icon">
            <div className="overlap-group">
              <img className="vector" src="img/vector-27@2x.svg" />
              <img className="vector-1" src="img/vector-28@2x.svg" />
            </div>
          </div>
          <div className="name-1 roboto-normal-white-24px">{person.name}</div>
        </div>
        <div className="but-1" style={{"marginLeft": "90px"}} onClick={onAdd} >
          <div className="icon-3">
            <div className="overlap-group-1">
              <img className="vector-3" src="img/vector-25@2x.svg" />
              <img className="vector-4" src="img/vector-26@2x.svg" />
            </div>
          </div>
        </div>
        <div className="but" style={{"display": "none"}}>
          <div className="icon-4"><img className="vector-12" src="img/vector-24@2x.svg" /></div>
        </div>
        <div className="but" style={{"display": "none"}}>
          <div className="icon-5">
            <div className="overlap-group-4">
              <img className="vector-13" src="img/vector-21@2x.svg" />
              <img className="vector-14" src="img/vector-22@2x.svg" />
            </div>
            <img className="vector-15" src="img/vector-23@2x.svg" />
          </div>
        </div>
      </div>
      <div className="content-1">
        <div className="info-a">
          <div className="content-2 roboto-normal-onyx-14px">
            <div className="left">
              <div className="gender">
                <div className="overlap-group-1">
                  <img className="vector-5" src="img/vector-18@2x.svg" />
                  <img className="vector-5" src="img/vector-19@2x.svg" />
                  <img className="vector-16" src="img/vector-20@2x.svg" />
                </div>
              </div>
              <div className="birth">{person.birth_year}</div>
            </div>
            <div className="right">Human</div>
          </div>
          <div className="seperator-1"></div>
        </div>
        <div className="info-b">
          <div className="homeworld">
            <div className="left-1">
              <div className="icon-6">
                <div className="overlap-group-5">
                  <img className="vector-17" src="img/vector-5@2x.svg" />
                  <img className="vector-18" src="img/vector-6@2x.svg" />
                </div>
              </div>
              <div className="text-1 roboto-medium-sonic-silver-10px">HOMEWORLD</div>
            </div>
            <div className="text-2 roboto-normal-onyx-14px">Tatooine</div>
          </div>
          <div className="info-b-item">
            <div className="left-2">
              <div className="icon-7">
                <div className="overlap-group-6">
                  <img className="vector-19" src="img/vector-7@2x.svg" />
                  <img className="vector-20" src="img/vector-8@2x.svg" />
                  <img className="vector-21" src="img/vector-9@2x.svg" />
                  <img className="vector-22" src="img/vector-10@2x.svg" />
                  <img className="vector-23" src="img/vector-11@2x.svg" />
                </div>
              </div>
              <div className="text-3 roboto-medium-sonic-silver-10px">VEHICLE</div>
            </div>
            <div className="text-4 roboto-normal-onyx-14px">Snowspeeder</div>
          </div>
          <div className="info-b-item">
            <div className="left-3">
              <div className="icon-8">
                <div className="overlap-group-7">
                  <img className="vector-24" src="img/vector-12@2x.svg" />
                  <img className="vector-25" src="img/vector-13@2x.svg" />
                  <img className="vector-26" src="img/vector-14@2x.svg" />
                  <img className="vector-27" src="img/vector-15@2x.svg" />
                  <img className="vector-28" src="img/vector-16@2x.svg" />
                  <img className="vector-29" src="img/vector-17@2x.svg" />
                </div>
              </div>
              <div className="text-5 roboto-medium-sonic-silver-10px">STARSHIP</div>
            </div>
            <div className="text-6 roboto-normal-onyx-14px">X-wing</div>
          </div>
        </div>
      </div>
    </div>


    ))}


    </>
  )
}

export default Person