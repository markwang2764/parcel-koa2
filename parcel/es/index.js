import React from 'react'
import { render } from 'react-dom'
import App from './app'
import App from './app'

class AppContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      name: 'Parcel 打包案例',
      killer: 'dslajdsa'
    }
  }
  componentDidMount() {
    setTimeout(()=>{
      this.setState({name: 'parcel 大包'})
    },2000)
  }
  render(){
    return (<App name={this.state.name} />)
  }
}

render(
  <AppContainer />,
  document.getElementById('app')
)
