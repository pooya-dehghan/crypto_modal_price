import './ToggleButton.css'


const ToggleButton =  () => {

  return (
    <div className="toggle_button_container">
      <div className='active_toggle_button'>Spot</div>
      <div className='unactive_toggle_button'>Future</div>
    </div>
  )
}

export default ToggleButton