import React from 'react'
import Modal from '../modal/Modal'
import { apiCall } from '../../../utils/api_common'
import CheckboxPicker from '../../input/checkboxpicker/CheckboxPicker'

class ModalAddBasket extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      basketPrice: 0.0,
      vegetables: []
    }
    this.getVegetables = this.getVegetables.bind(this)
    this.handleQuantityInput = this.handleQuantityInput.bind(this)
    this.calcPreviewBasketPrice = this.calcPreviewBasketPrice.bind(this)
    this.handleSubmitNewBasket = this.handleSubmitNewBasket.bind(this)
    this.clearPrice = this.clearPrice.bind(this)
  }

  getSelectedElements(elements) {
    var items = []
    const checkboxArray = elements.filter((el) => {
        return el.type === 'checkbox'
      })
      const inputNumberArray = elements.filter((el) => {
        return el.type === 'number' && el.className === "inputNumber"
      })

      checkboxArray.forEach((el, index) => {
        if (el.checked) {
          items.push({vegetable_id: parseInt(el.value),
            quantity: parseInt(inputNumberArray[index].value ? inputNumberArray[index].value : 0)})
        }
      })

      return items
  }

  handleSubmitNewBasket(event) {
      event.preventDefault()
      let payload = {
        basket: {},
        items:[]
      }

      const elements = Array.from(event.target.elements)

      payload.basket['name'] = elements.filter((el) => el.name === 'name')[0].value
      payload.items = this.getSelectedElements(elements)

      if(payload['items'].length === 0){
        return alert('Nenhum item foi selecionado')
      }
      apiCall(`${process.env.REACT_APP_BASE_API_URL}/admin/new_basket`,'POST',
        JSON.stringify(payload))
  }

  getVegetables() {
    fetch(`${process.env.REACT_APP_BASE_API_URL}/get_vegetables?all=true`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        vegetables: data.items
      })
    })
  }

  calcPreviewBasketPrice(selectedElements) {
    var price = 0
    selectedElements.forEach((item) => {
      var vegetable = this.state.vegetables.filter(v => v.id === item.vegetable_id)[0]
      vegetable = parseFloat((vegetable.kg_price * (vegetable.average_weight* item.quantity) / 1000).toFixed(2))
      price += vegetable
    })
    return parseFloat(price.toFixed(2))
  }

  componentDidMount(){
    this.getVegetables()
  }

  clearPrice() {
    this.setState({
      basketPrice: 0
    })
  }

  handleQuantityInput(event) {
      var elements = Array.from(event.target.form.elements)
      var selectedElements = this.getSelectedElements(elements)
      if(selectedElements.length > 0) {
        var pricePreview = this.calcPreviewBasketPrice(selectedElements)
        this.setState({
          basketPrice: pricePreview
        })
      } else {
        this.setState({
          basketPrice: 0
        })
      }
  }

  render() {
    return(
      <Modal
         trigger={() => {}}
         title='Cadastro Cesta'
         handleSubmit={this.handleSubmitNewBasket}
         hideModalTrigger={this.clearPrice}>
            <div className='modal-field'>
              <label>Nome</label>
              <input name='name'/>
            </div>
            <div className='modal-field'>
              <label>Preço {this.state.basketPrice}</label>
            </div>
            <div className='modal-field'>
              <label>Items</label>
              <div className='vegetables-selection-area'>
                {this.state.vegetables.map((veg, index) => 
                   <CheckboxPicker
                     vegetable={veg}
                     key={index}
                     checkboxName='vegetable_id'
                     inputNumberName='quantity'
                     handleQuantityInput={this.handleQuantityInput}/>)}
              </div>
            </div>
            <button
            type='submit'
            id='submit-button'>
              Cadastrar
            </button>
      </Modal>
    )
  }
}

export default ModalAddBasket;