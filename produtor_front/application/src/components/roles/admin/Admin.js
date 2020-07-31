import React from 'react';
import { Route } from 'react-router-dom'
import Home from '../../Home'
import Table from '../../groupers/table/Table'
import Sidebar from '../../navigation/sidebar/Sidebar'
import ModalEditBasket from '../../detail/modal_edit_basket/ModalEditBasket'
import ModalCreateBasket from '../../detail/modal_create_basket/ModalCreateBasket'
import ModalCreateVegetable from '../../detail/modal_create_vegetable/ModalCreateVegetable'
import ModalCreateVegetableName from '../../detail/modal_create_vegetablename/ModalCreateVegetableName'
import ModalEditVegetable from '../../detail/modal_edit_vegetable/ModalEditVegetable'
import ModalEditVegetableName from '../../detail/modal_edit_vegetablename/ModalEditVegetableName'
import './Admin.css'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vegetable_names: []
    }
    this.vegetable_names = []
    this.vegetables = []
    this.deleteVegetable = this.deleteVegetable.bind(this)
  }

  SidebarItems = [{itemLabel:'Home', url:'/admin'},
            {itemLabel: 'Vegetable', url: '/admin/vegetables'},
            {itemLabel:'Vegetable Name', url:'/admin/vegetableName'},
            {itemLabel:'Basket', url: '/admin/basket'},
            {itemLabel:'Basket Item', url:'/admin/basketItem'}]

  deleteObject(url, body){
    fetch(url,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('userToken')
      },
      body: body
    }).then((data => {window.location.reload(false)}))
    .catch(err => alert('error', err))
  }
  
  deleteVegetable = (item_id) => {
    this.deleteObject(`${process.env.REACT_APP_BASE_API_URL}/admin/delete_vegetable`,
      JSON.stringify({'vegetable_id': item_id}))
  }

  deleteVegetableName = (item_id) => {
    this.deleteObject(`${process.env.REACT_APP_BASE_API_URL}/delete_vegetable_name`,
      JSON.stringify({'vegetable_name_id': item_id}))
  }

  deleteBasket = (item_id) => {
    this.deleteObject(`${process.env.REACT_APP_BASE_API_URL}/admin/delete_basket`,
      JSON.stringify({'basket_id': item_id}))
  }

  render() {
    return (
      <div className='Admin--container'>
        <Sidebar items={this.SidebarItems}/>
        <div className='Admin--body'>
          <Route exact path='/admin'>
            <Home/>
          </Route>
          <Route path='/admin/vegetablename'>
            <Table
            url={`${process.env.REACT_APP_BASE_API_URL}/get_vegetable_names`}
            headers={['Verdura']}
            features={['name']}
            deleteItem={this.deleteVegetableName}
            editItem={<ModalEditVegetableName/>}
            footerButton={<ModalCreateVegetableName/>}>
            </Table>
          </Route>
          <Route path='/admin/vegetables'>
            <Table
            url={`${process.env.REACT_APP_BASE_API_URL}/get_vegetables`}
            headers={['Verdura', 'Quantidade Colhida',  'Data da colheita', 'Peso médio da verdura (g)', 'KG preço']}
            features={['vegetable_name', 'harvest_quantity','harvest_date','average_weight', 'kg_price']}
            deleteItem={this.deleteVegetable}
            editItem={<ModalEditVegetable/>}
            footerButton={<ModalCreateVegetable/>}>
            </Table>
          </Route>
          <Route path='/admin/basket'>
            <Table
              url={`${process.env.REACT_APP_BASE_API_URL}/get_baskets`}
              headers={['Nome', 'Peso(g)',  'Preço']}
              features={['name', 'weight','price']}
              deleteItem={this.deleteBasket}
              editItem={<ModalEditBasket/>}
              footerButton={<ModalCreateBasket/>}>
            </Table>
            </Route>
        </div>
      </div>
    );
  }
}

export default Admin;
