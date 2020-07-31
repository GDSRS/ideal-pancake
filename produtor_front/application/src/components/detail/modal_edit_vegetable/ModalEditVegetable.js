import React from 'react'
import { apiCall } from '../../../utils/api_common'
import Proptypes from 'prop-types'
import Modal from '../modal/Modal'
import Select from '../../input/select/Select'
import EditButton from '../../layout/edit_button/EditButton'

class ModalEditVegetable extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      vegetables_names: []
    }
    this.getVegetableNames = this.getVegetableNames.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getVegetableNames() {
    fetch(`${process.env.REACT_APP_BASE_API_URL}/get_vegetable_names?all=true`)
    .then(response => response.json())
    .then(data => this.setState({
      vegetables_names: data.items
    }))
  }

  formatDate(strDate) {
    if (strDate !== undefined ) {
      let date = strDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/g, '$3-$2-$1')
      return date
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    let payload = {}
    Array(...event.target.elements).forEach(item => {
      if(item.tagName === 'INPUT' || item.tagName === 'SELECT') {
         if (item.type === 'number'){
          item.value = parseFloat(item.value)
          payload[item.name] = item.value
        } else if (item.type === 'date') {
          let date = new Date(item.value)
          date.setDate(date.getDate() + 1)
          payload[item.name] = date.toLocaleDateString()
        }
        else {
          payload[item.name] = item.value
        }
      }
    })

    payload['id'] = this.props.element.id

    apiCall(`${process.env.REACT_APP_BASE_API_URL}/admin/edit_vegetable`,'PUT',
      JSON.stringify({'vegetable': payload}), window.location.reload(false))
  }

  componentDidMount() {
    this.getVegetableNames()
  }

  render(){
    const {element} = this.props
    return( 
      <Modal
      title='Edição Verdura'
      launcherIcon={<EditButton/>}
      handleSubmit={this.handleSubmit}>
        <div className='modal-field'>
          <label>Peso (g)</label>
          <input
          type='number'
          name='average_weight'
          step='0.01'
          defaultValue={element.average_weight}/>
        </div>
        <div className='modal-field'>
          <label>Quantidade</label>
          <input
          type='number'
          name='harvest_quantity'
          defaultValue={element.harvest_quantity}/>
        </div>
        <div className='modal-field'>
          <label>Preço por Kg</label>
          <input
          type='number'
          name='kg_price'
          step='0.01'
          defaultValue={element.kg_price}/>
        </div>
        <div className='modal-field'>
          <label>Data da colheita</label>
          <input
          type='date'
          name='harvest_date'
          defaultValue={this.formatDate(element.harvest_date)}/>
        </div>
        <div className='modal-field'>
          <label>Nome</label>
          <Select 
          items={this.state.vegetables_names}
          name='vegetable_name_id'
          defaultValue={element.vegetable_name_id}/>
        </div>
         <button
          type='submit'
          id='submit-button'>
          Atualizar
        </button>
      </Modal>
    )

  }
}

ModalEditVegetable.defaultProps = {
  element: {
    average_weight: 0.1,
    harvest_quantity: 22,
    kg_price: 1.99,
    harvest_date: '21/02/2020',
    vegetable_name_id: 1
  }
}

ModalEditVegetable.propTypes = {
  element: Proptypes.shape({
    average_weight: Proptypes.number,
    harvest_quantity: Proptypes.number,
    kg_price: Proptypes.number,
    harvest_date: Proptypes.string,
    vegetable_name_id: Proptypes.number
  }).isRequired
}

export default ModalEditVegetable;