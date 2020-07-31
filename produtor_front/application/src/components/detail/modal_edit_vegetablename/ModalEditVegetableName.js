import React from 'react'
import { apiCall } from '../../../utils/api_common'
import Modal from '../modal/Modal'
import EditButton from '../../layout/edit_button/EditButton'

class ModalEditVegetableName extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
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

    payload['vegetable_name_id'] = this.props.element.id

    apiCall(`${process.env.REACT_APP_BASE_API_URL}/admin/edit_vegetable_name`,'EDIT',
      JSON.stringify(payload), window.location.reload(false))
  }

  render() {
    const { element } = this.props
    return(
      <Modal
        title='Edição Nome Verdura'
        handleSubmit={this.handleSubmit}
        launcherIcon={<EditButton/>}>
        <div className='modal-field'>
          <label>Nome Verdura</label>
          <input
          type='text'
          name='vegetable_name'
          defaultValue={element.name}/>
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

export default ModalEditVegetableName;