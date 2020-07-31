import React from 'react';
import TableHeader from './tableheader/TableHeader'
import TableBody from './tablebody/TableBody'
import TableFooter from './tablefooter/TableFooter'
import './Table.css';

class Table extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			url: props.url,
			contents: [],
			currentpage: 0
		};
		this.getCurrentPageItems = this.getCurrentPageItems.bind(this)
		this.fetchPage = this.fetchPage.bind(this)
		this.nextPage = this.nextPage.bind(this)
		this.previousPage = this.previousPage.bind(this)
		this.checkIfPageExists = this.checkIfPageExists.bind(this)
	}

	componentDidMount() {
		this.fetchPage(this.state.url)
	}

	getCurrentPageItems() {
		for(var content in this.state.contents) {
			if (this.state.currentpage === this.state.contents[content].page) {
				return this.state.contents[content].items
			}
		}
		// this.fetchPage(this.state.)
	}

	fetchPage(url) {
		fetch(url)
			.then(resp => resp.json())
			.then(data =>
				this.setState({
					currentpage: data['page'],
					contents: [...this.state.contents, {
						page: data.page,
						items: data.items,
						next_page: data.next_page,
						previous_page : data.previous_page ? data.previous_page : ''
					}],
					max_page: data.max_page
				})
			)
	}

	checkIfPageExists(pageNumber) {
		/*Check if page already exists in component state*/
		for (let content of this.state.contents) {
			if (content.page === pageNumber) {
				return true
			}
		}
		return false
	}

	nextPage() {
		if (this.state.contents[this.state.currentpage-1].next_page === '') {
			return 
		}
		let page = this.checkIfPageExists(this.state.currentpage+1)
		if (!page) {
			this.fetchPage(this.state.contents[this.state.currentpage-1].next_page)
		} else {
			this.setState((state) => ({
				currentpage: state.currentpage+1
			}))
		}
	}

	previousPage() {
		if (this.state.contents[this.state.currentpage-1].previous_page === '') {
			return 
		}
		let page = this.checkIfPageExists(this.state.currentpage-1)
		if (!page) {
			this.fetchPage(this.state.contents[this.state.currentpage-1].previous_page)
		} else {
			this.setState((state) => ({
				currentpage: state.currentpage-1
			}))
		}
		
		
	}

	render() {
		const utils = { nextPage: this.nextPage, previousPage: this.previousPage,
			cp: this.state.currentpage, mp: this.state.max_page}
		return (
			<TableContext.Provider value={utils}>
				<table className='Table'>
					<TableHeader headers={this.props.headers}/>
					<TableBody
					items={this.getCurrentPageItems()}
					features={this.props.features}
					deleteItem={this.props.deleteItem}
					editItem={this.props.editItem}/>
					<TableFooter
					middleButton={this.props.footerButton}
					numberCols={this.props.headers.length}/>
				</table>
			</TableContext.Provider>
			// <button className='table-button'>Adicionar Verdura</button>
		);
	}
}

export const TableContext = React.createContext({})

export default Table;
