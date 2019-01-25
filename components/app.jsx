import React from 'react';
import Content from './content';

class App extends React.Component {
    render() {
        return (
            <div className='app'>
                <Navbar />
                <Content />
            </div>
        );
    }
}

const Navbar = () => (
    <div className='navbar'>
      <h1 className='title'>1854 London's Soho Cholera Outbreak</h1>
    </div>
  )

export default App;