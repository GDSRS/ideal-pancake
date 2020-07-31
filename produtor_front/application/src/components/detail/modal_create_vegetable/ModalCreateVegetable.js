import React from 'react'
import Modal from '../modal/Modal'
import Select from '../../input/select/Select'
import { apiCall } from '../../../utils/api_common'

class ModalCreateVegetable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vegetables_names: []
    }
    this.handleSubmitNewVegetable = this.handleSubmitNewVegetable.bind(this)
    this.getVegetableNames = this.getVegetableNames.bind(this)
  }

  handleSubmitNewVegetable(event) {
    event.preventDefault()
    let payload = {}
    Array(...event.target.elements).forEach((item, index) => {
      if (item.tagName === 'INPUT' || item.tagName === 'SELECT') {
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

    apiCall(`${process.env.REACT_APP_BASE_API_URL}/admin/new_vegetable`,'POST',
      JSON.stringify({'vegetable':payload}))
  }

  getVegetableNames() {
    fetch(`${process.env.REACT_APP_BASE_API_URL}/get_vegetable_names?all=true`)
    .then(response => response.json())
    .then(data => this.setState({
      vegetables_names: data.items
    }))
  }

  componentDidMount() {
    this.getVegetableNames()
  }

  render() {
    return (
      <Modal
        handleSubmit={this.handleSubmitNewVegetable}
        trigger={() =>{}}
        title='Cadastro Verdura'>
          <div className='modal-field'>
            <label>Quantidade</label>
            <input type='number' name='harvest_quantity'/>
          </div>
          <div className='modal-field'>
            <label>Preço por Kg</label>
            <input type='number' step='0.01' name='kg_price'/>
          </div>
          <div className='modal-field'>
            <label>Data da colheita</label>
            <input type='date' name='harvest_date'/>
          </div>
          <div className='modal-field'>
            <label>Peso médio da verdura (g)</label>
            <input name='average_weight' step='0.01' type='number'/>
          </div>
          <div className='modal-field'>
            <label>Nome</label>
            <Select 
            items={this.state.vegetables_names}
            name='vegetable_name_id'/>
          </div>
          <button
          type='submit'
          id='submit-button'>
            Cadastrar
          </button>
      </Modal>)
  }
}

export default ModalCreateVegetable;