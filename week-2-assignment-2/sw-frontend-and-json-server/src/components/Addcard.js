import { useState } from 'react'

const Addcard = ({ cardida, onAdd }) => {
  const [text, setText] = useState('')
  //const [day, setDay] = useState('')
  const [faction, setFaction] = useState('')
  const [cardid, setCardid] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add deck name')
      return
    }

    onAdd({ text, faction, cardida, reminder })

    setText('')
    //setDay('')
    setFaction('REBEL')
    setCardid(cardida)
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit} id="modal-add-card-bg-fix" style={{width:"320px", backgroundColor:"grey",padding:"20px"}}>
      
      <div className='form-control'>
        <label style={{padding:"2px", color:"white", fontFamily:"Arial"}}>Deck Name</label>
        <input
          type='text'
          placeholder='Deck Name'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className='form-control' style={{padding:"2px", color:"white", fontFamily:"Arial"}}>
        <label>Rebel</label>
        <input type="radio" value="REBEL"   onChange={(e) => setFaction(e.target.value)} name="faction" required="required"/> 
        <label>Jedi</label>
        <input type="radio" value="JEDI"    onChange={(e) => setFaction(e.target.value)} name="faction"/>
        <label>Empire</label>
        <input type="radio" value="EMPIRE"  onChange={(e) => setFaction(e.target.value)} name="faction"/>
        <label>None</label>
        <input type="radio" value="NONE"    onChange={(e) => setFaction(e.target.value)} name="faction"/>
      </div>

      <div className='form-control'>
        <label style={{padding:"2px", color:"white", fontFamily:"Arial"}}>CardID</label>
        <input
          type='text'
          placeholder={cardida}
          value={cardida}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className='form-control form-control-check' style={{visibility:"hidden"}}>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input style={{padding:"12px", color:"white", fontFamily:"Arial"}} type='submit' value='Save Card' className='btn btn-block' />
    </form>
  )
}

export default Addcard
