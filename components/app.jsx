import React from 'react';
import Content from './content';

class App extends React.Component {
    render() {
        return (
            <div className='app'>
                <h1> React renders!</h1>
                <Navbar />
                <Content />
            </div>
        );
    }
}

const Navbar = () => (
    <div className='navbar'>
      <h1 className='title'>Soho Map</h1>
    </div>
  )

export default App;