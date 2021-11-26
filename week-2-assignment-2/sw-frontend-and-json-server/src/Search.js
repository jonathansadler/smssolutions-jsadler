import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Deck from './Deck'

import Addcard from './components/Addcard'

import Person from './components/Person'

const Search = () => {

    const [pagecount, setPageCount] = useState(1);

    const page1 = [1,2,3,4,5,6,7,8,9]
    //17
    const page2 = [10,11,12,13,14,15,16,18,19]
    const page3 = [20,21,22,23,24,25,26,27,28,29]
    const page4 = [30,31,32,33,34,35,36,37,38,39]
    const page5 = [40,41,42,43,44,45,46,47,48,49]
    const page6 = [50,51,52,53,54,55,56,57,58,59]
    const page7 = [60,61,62,63,64,65,66,67,68,69]
    const page8 = [70,71,72,73,74,75,76,77,78,79]
    const page9 =[80,81,82,83]

    const [pageall, setPageAll] = useState([...page1])

    const [singlecard, setSingleCard] = useState()

    const [showAddcard, setShowAddcard] = useState(false)
    //const [people, setPeople] = useState([])
    const [cards, setcards] = useState([])

    const handleIncrease = () => {
      if(pagecount<=9){
        console.log(pagecount)
      setPageCount(pagecount + 1)
      }
    }
  
    const handleDecrease = () => {
      if(pagecount>=1){
      setPageCount(pagecount - 1)
      }
    }
    
    const sendSingleCard = (idc) =>{
      setSingleCard(idc);
    }

    useEffect(() => {
      const getPages = (pagecount) =>{
        if(pagecount == 1 ){
          setPageAll([...page1])
        } else if(pagecount == 2 ) {
          setPageAll([...page1, ...page2])
        } else if(pagecount == 3 ) {
          setPageAll([...page1, ...page2, ...page3])
        } else if(pagecount == 4 ) {
          setPageAll([...page1, ...page2, ...page3, ...page4])
        } else if(pagecount == 5 ) {
          setPageAll([...page1, ...page2, ...page3, ...page4, ...page5])
        } else if(pagecount == 6 ) {
          setPageAll([...page1, ...page2, ...page3, ...page4, ...page5, ...page6])
        } else if(pagecount == 7 ) { 
          setPageAll([...page1, ...page2], ...page3, ...page4, ...page5, ...page6, ...page7)
        } else if(pagecount == 8 ) {  
          setPageAll([...page1, ...page2], ...page3, ...page4, ...page5, ...page6, ...page7, ...page8)
        } else if(pagecount == 9 ) {
          setPageAll([...page1, ...page2], ...page3, ...page4, ...page5, ...page6, ...page7, ...page8, ...page9)
        }
      }
      
      getPages(pagecount)

    }, [pagecount])

    useEffect(() => {
      const getcards = async () => {
        const cardsFromServer = await fetchcards()
        setcards(cardsFromServer)
      }
  
      getcards()
    }, [])
  
    // Fetch cards
    const fetchcards = async () => {
      const res = await fetch('http://localhost:5000/cards')
      const data = await res.json()

      return data
    }

    // Fetch card
    const fetchcard = async (id) => {
      const res = await fetch(`http://localhost:5000/cards/${id}`)
      const data = await res.json()

      return data
    }


    // Add card
    const addcard = async (card) => {
      const res = await fetch('http://localhost:5000/cards', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(card),
      })
  
      const data = await res.json()
  
      setcards([...cards, data])
  
      // const id = Math.floor(Math.random() * 10000) + 1
      // const newcard = { id, ...card }
      // setcards([...cards, newcard])
    }
  
    // Delete card
    const deletecard = async (id) => {
      const res = await fetch(`http://localhost:5000/cards/${id}`, {
        method: 'DELETE',
      })
      //We should control the response status to decide if we will change the state or not.
      res.status === 200
        ? setcards(cards.filter((card) => card.id !== id))
        : alert('Error Deleting This card')
    }
  
    // Toggle Reminder
    const toggleReminder = async (id) => {
      const cardToToggle = await fetchcard(id)
      const updcard = { ...cardToToggle, reminder: !cardToToggle.reminder }
  
      const res = await fetch(`http://localhost:5000/cards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updcard),
      })
  
      const data = await res.json()
  
      setcards(
        cards.map((card) =>
          card.id === id ? { ...card, reminder: data.reminder } : card
        )
      )
    }


    return (
      <Router>

        <Switch>


        <Route path="/deck">
            <Deck />
          </Route>

        <Route path='/' exact>

          <>
          
            <div id="modal-add-card">
              {showAddcard && <Addcard cardida={singlecard} onAdd={addcard} />}
            </div>
          
          </>

          <>

          <div className="container-center-horizontal" id="modal-below-card">
            <div className="all-cards-desktop screen">
              <div className="header">
                <div className="menu">
                  <div className="buttons">
                    <div className="all-cards-but">
                      <div className="icon">
                        <div className="overlap-group">
                          <img className="vector" src="img/vector-35@2x.svg" />
                          <img className="vector-1" src="img/vector-36@2x.svg" />
                        </div>
                      </div>
                      <div className="all-cards roboto-normal-onyx-16px">All Cards</div>
                    </div>
                    <div className="decks-but">
                      <div className="icon-1">
                        <div className="overlap-group-2">
                          <img className="vector-8" src="img/vector-37@2x.svg" />
                          <img className="vector-9" src="img/vector-38@2x.svg" />
                        </div>
                      </div>
                      <div className="decks roboto-normal-onyx-16px"><Link to="/deck"><button>Decks</button></Link></div>
                    </div>
                  </div>
                  <div className="page-title">SW-API Deck Builder</div>
                  <div className="name-title border-1px-pink-swan">
                    <div className="name roboto-normal-onyx-16px">Name</div>
                  </div>
                </div>
                <div className="seperator"></div>
              </div>
              <div className="content">
                <div className="overlap-group2" style={{"marginBottom":"50px"}}>
                  <div className="bread-crumb-a-child roboto-normal-mountain-mist-16px">Select a card</div>
                  <div className="bread-crumb-arrow-b"><img className="vector-2" src="img/vector-33@2x.svg" /></div>
                  <div className="bread-crumb-a-child-1 roboto-normal-mountain-mist-16px">Select a card</div>
                  <div className="bread-crumb-arrow-a"><img className="vector-2" src="img/vector-33@2x.svg" /></div>
                  <div className="bread-crumb-a-parent roboto-normal-sonic-silver-16px">All Cards</div>
                </div>
                <div className="query">
                  <div className="input-feild">
                    <div className="text roboto-normal-sonic-silver-16px">Search</div>
                    <div className="search-icon">
                      <div className="overlap-group-3">
                        <img className="vector-10" src="img/vector-5@2x.svg" />
                        <img className="vector-11" src="img/vector-32@2x.svg" />
                      </div>
                    </div>
                  </div>
                  <div className="query-buttons">
                    <div className="but-c border-1px-pink-swan"><div className="but-c-text roboto-normal-onyx-16px">A to Z</div></div>
                    <div className="but-b"><div className="but-b-text roboto-normal-onyx-16px">Youngest</div></div>
                    <div className="but-a"><div className="but-a-text roboto-normal-onyx-16px">Eldest</div></div>
                  </div>
                  <div className="butt-add" style={{"display":"none"}}>
                    <div className="icon-2">
                      <div className="overlap-group-1">
                        <img className="vector-3" src="img/vector-25@2x.svg" />
                        <img className="vector-4" src="img/vector-26@2x.svg" />
                      </div>
                    </div>
                  </div>
                </div>

                
                <button style={{ margin: "15px", padding: "7px" , width: "200px", marginLeft: "380px" }} onClick={handleIncrease}>Load More</button>

                <div id="flex-container-add-cards">

                {pageall.map((index) => (
                <Person key={index} ida = {index} onAdd={() => { setShowAddcard(!showAddcard); sendSingleCard(index); }} />
                ))}

                  
                </div>


              </div>
              <div className="footer" style={{"display":"none"}}>
                <div className="back border-1px-pink-swan">
                  <div className="left-4"><img className="vector-6" src="img/vector-4@2x.svg" /></div>
                </div>
                <div className="but-number border-1px-pink-swan"><div className="no roboto-normal-mountain-mist-16px">1</div></div>
                <div className="but-all border-1px-pink-swan">
                  <div className="dots">
                    <img className="vector-30" src="img/vector-1@2x.svg" />
                    <img className="vector-7" src="img/vector-1@2x.svg" />
                    <img className="vector-7" src="img/vector-1@2x.svg" />
                  </div>
                </div>
                <div className="forward border-1px-pink-swan">
                  <div className="right-1"><img className="vector-6" src="img/vector@2x.svg" /></div>
                </div>
              </div>
            </div>
          </div>

          </>

        </Route> 

        </Switch>  

      </Router>
    )
  }
  
  export default Search