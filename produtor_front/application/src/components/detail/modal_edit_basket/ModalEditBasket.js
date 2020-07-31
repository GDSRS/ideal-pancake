import React from 'react'
import Proptypes from 'prop-types'
import Modal from '../modal/Modal'
import CheckboxPicker from '../../input/checkboxpicker/CheckboxPicker'
import EditButton from '../../layout/edit_button/EditButton'

class ModalEditBasket extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      basketPrice: 0,
      vegetables: []
    }
    this.handleQuantityInput = this.handleQuantityInput.bind(this)
    this.fillPickedVegetables = this.fillPickedVegetables.bind(this)
    this.setPrice = this.setPrice.bind(this)
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

  calcPreviewBasketPrice(selectedElements) {
    var price = 0
    selectedElements.forEach((item) => {
      var vegetable = this.state.vegetables.filter(v => v.id === item.vegetable_id)[0]
      vegetable = parseFloat((vegetable.kg_price * (vegetable.average_weight* item.quantity) / 1000).toFixed(2))
      price += vegetable
    })
    return parseFloat(price.toFixed(2))
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

  fillPickedVegetables() {
    const { element } = this.props
    var vegetables = this.state.vegetables
    console.log('Element: ', element)
    element.basket_items.forEach(item => {
      let vegetable = vegetables.find(v => v.id === item.vegetable_id)
      vegetable.defaultQuantity = item.quantity
    })
    this.setState({
      vegetables: vegetables
    })
  }

  componentDidMount(){
    this.getVegetables()
  }

  setPrice() {
    this.setState({
      basketPrice: this.props.element.price
    })
  }

  render() {
    const { element } = this.props
    return(
      <Modal
      title='Edição Cesta'
      trigger={() => {
        this.fillPickedVegetables()
        this.setPrice()
        }
      }
      launcherIcon={<EditButton/>}>
        <div className='modal-field'>
          <label>Nome</label>
          <input name='name' defaultValue={element.name}/>
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
          Atualizar
        </button>
      </Modal>
      )
  }
}


ModalEditBasket.defaultProps = {
  element: {
    name: "Nome Cesta",
    price: 22,
    basket_items: [{
      price: 1,
      quantity: 1,
      weight: 465
    }]
  }
}

ModalEditBasket.propTypes = {
  element: Proptypes.shape({
    name: Proptypes.string,
    price: Proptypes.number,
    basket_items: Proptypes.array
  }).isRequired
}

export default ModalEditBasket;