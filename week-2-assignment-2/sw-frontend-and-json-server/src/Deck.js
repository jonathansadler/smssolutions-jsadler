import React, { Component } from 'react';

//import { useState, useEffect } from 'react'
//import PropTypes from 'prop-types'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import './all-decks.css';


class Deck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          items: []
        };
      }

      componentDidMount() {
        fetch('http://localhost:5000/cards')
          .then(res => res.json())
          .then(result => {
            this.setState({
              items: result
            });
          });
      }

/*
{items.map((text, faction,cardida, i) => (
*/

render() {
const { items } = this.state;

    return (
        <div class="container-center-horizontal">
        <div class="all-decks-desktop screen">
          <div class="header">
            <div class="menu">
              <div class="buttons">
                <div class="all-cards-but">
                  <div class="icon-1">
                    <div class="overlap-group-1">
                      <img class="vector-5" src="img/vector-35@2x.svg" />
                      <img class="vector-6" src="img/vector-36@2x.svg" />
                    </div>
                  </div>
                  <Link to="/"><div class="all-cards roboto-normal-onyx-16px">All Cards</div></Link>
                </div>
                <div class="decks-but">
                  <div class="icon">
                    <div class="overlap-group">
                      <img class="vector" src="img/vector-37@2x.svg" />
                      <img class="vector-1" src="img/vector-38@2x.svg" />
                    </div>
                  </div>
                  <Link to="/deck"><div class="decks roboto-normal-onyx-16px">Decks</div></Link>
                </div>
              </div>
              <div class="page-title">SW-API Deck Builder</div>
              <div class="name-title border-1px-pink-swan">
                <div class="name roboto-normal-onyx-16px" style={{"display":"none"}}></div>
              </div>
            </div>
            <div class="seperator"></div>
          </div>
          <div class="content">
            <div class="overlap-group3" style={{"display":"none"}}>
              <div class="bread-crumb-a-child roboto-normal-mountain-mist-16px">Select a card</div>
              <div class="bread-crumb-arrow-b"><img class="vector-2" src="img/vector-33@2x.svg" /></div>
              <div class="bread-crumb-a-child-1 roboto-normal-mountain-mist-16px">Select a card</div>
              <div class="bread-crumb-arrow-a"><img class="vector-2" src="img/vector-33@2x.svg" /></div>
              <div class="bread-crumb-a-parent roboto-normal-sonic-silver-16px">All Cards</div>
            </div>
            <div class="query">
              <div class="input-feild">
                <div class="text roboto-normal-sonic-silver-16px">Search</div>
                <div class="search-icon">
                  <div class="overlap-group-2">
                    <img class="vector-7" src="img/vector-5@2x.svg" />
                    <img class="vector-8" src="img/vector-32@2x.svg" />
                  </div>
                </div>
              </div>
              <div class="query-buttons" style={{"display":"none"}}>
                <div class="but-c border-1px-pink-swan"><div class="but-c-text roboto-normal-onyx-16px">A to Z</div></div>
                <div class="but-b"><div class="but-b-text roboto-normal-onyx-16px">Youngest</div></div>
                <div class="but-a"><div class="but-a-text roboto-normal-onyx-16px">Eldest</div></div>
              </div>
              <div class="butt-add" style={{"display":"none"}}>
                <div class="icon-2">
                  <div class="overlap-group-3">
                    <img class="vector-9" src="img/vector-25@2x.svg" />
                    <img class="vector-10" src="img/vector-26@2x.svg" />
                  </div>
                </div>
              </div>
            </div>
            
            <div id="flex-container-add-decks">

            {items.map(item => (
            
                <div key={item.id} class="deck">
                <div class="top-info" style={{backgroundColor:"purple"}}>
                    <div class="flex-col">
                    <div class="icon">
                        <div class="overlap-group">
                        <img class="vector" src="img/vector-48@2x.svg" />
                        <img class="vector-1" src="img/vector-49@2x.svg" />
                        </div>
                    </div>
                    <h1 class="place roboto-normal-white-24px">{item.text}</h1>
                    <p style={{padding:"2px", color:"white", fontFamily:"Arial"}}>{item.faction}</p>
                    </div>
                    <div class="overlap-group2">
                    <div class="icon-rebel"><img style={{visibility:"hidden"}} class="vector-11" src="img/vector-44@2x.svg" /></div>
                    <div class="but-1" style={{"display":"none"}}>
                        <div class="icon-3">
                        <div class="overlap-group-4">
                            <img class="vector-12" src="img/vector-45@2x.svg" />
                            <img class="vector-13" src="img/vector-46@2x.svg" />
                        </div>
                        <img class="vector-14" src="img/vector-47@2x.svg" />
                        </div>
                    </div>
                    </div>
                </div>
                <div class="top-info-total">
                    <div class="no-label">Card</div>
                    <div class="no">{item.cardida}</div>
                    
                </div>
                </div>

            ))}



            </div>

          </div>
          <div class="footer" style={{"display":"none"}}>
            <div class="back border-1px-pink-swan">
              <div class="left"><img class="vector-3" src="img/vector-4@2x.svg" /></div>
            </div>
            <div class="but-number border-1px-pink-swan"><div class="no-1 roboto-normal-mountain-mist-16px">1</div></div>
            <div class="but-all border-1px-pink-swan">
              <div class="dots">
                <img class="vector-15" src="img/vector-1@2x.svg" />
                <img class="vector-4" src="img/vector-1@2x.svg" />
                <img class="vector-4" src="img/vector-1@2x.svg" />
              </div>
            </div>
            <div class="forward border-1px-pink-swan">
              <div class="right"><img class="vector-3" src="img/vector@2x.svg" /></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Deck