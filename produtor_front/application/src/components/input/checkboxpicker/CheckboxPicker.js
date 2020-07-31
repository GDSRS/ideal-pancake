import React, {useState} from 'react'
import './CheckboxPicker.css'

const CheckboxPicker = (props) => {
	const initialState = props.vegetable.defaultQuantity === undefined
	const [disable, setDisable] = useState(initialState)
	const enableField = (e) => setDisable(!e.target.checked)
	return(
		<div className='objectSelector'
			onChange={props.handleQuantityInput}
			value={props.vegetable.id}>
  		<input type='checkbox'
	  		value={props.vegetable.id}
	  		name={props.checkboxName}
	  		defaultChecked={!disable}
	  		onClick={enableField}/>
  		<label className='labelId'>{props.vegetable.vegetable_name}</label>
  		<input type='number'
	  		className='inputNumber'
	  		name={props.inputNumberName}
	  		valuelike={props.vegetable.id}
	  		disabled={disable}
	  		defaultValue={props.vegetable.defaultQuantity}
	  		min='0'/>
		</div>
		);
}

export default CheckboxPicker;