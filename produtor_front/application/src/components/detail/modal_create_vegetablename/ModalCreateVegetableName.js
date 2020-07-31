import React from 'react'
import Modal from '../modal/Modal'
import { apiCall } from '../../../utils/api_common'

class ModalCreateVegetableName extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmitNewVegetableName = this.handleSubmitNewVegetableName.bind(this)
  }

  handleSubmitNewVegetableName(event) {
    apiCall(`${process.env.REACT_APP_BASE_API_URL}/admin/new_vegetable_name`,'POST',
      JSON.stringify({'vegetable_name': event.target.elements[0].value}))
  }

  render() {
    return (
      <Modal
      title='Cadastro Nome Verdura'
      handleSubmit={this.handleSubmitNewVegetableName}>
        <div className='modal-field'>
          <label>Nome verdura</label>
          <input
            type='text'
            name='vegetable_name'
            required/>
        </div>
        <button
        type='submit'
        id='submit-button'>
          Cadastrar
        </button>
      </Modal>)
  }
}

export default ModalCreateVegetableName;