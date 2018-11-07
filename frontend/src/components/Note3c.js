import React from 'react';
import './note3c.css'
// 2018-11-05
class Note3c extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          date: new Date(),
        message: '... luettelo on muutettu ...',
        nakyy: true
      };
    }
  
    componentDidMount() {
      console.log("NoteC did mount")
      /*
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
      this.timerIDn = setInterval(
        () => this.tickn(),
        10000
      );
      */
    }
  
    componentWillUnmount() {
      console.log("NoteC did unmount")
     /*
      clearInterval(this.timerID);
      clearInterval(this.timerIDn);
     */
    }
  

    laitaNaNakyy3000() {
      console.log("laitaNakyy")
      this.setState({nakyy: true})
      setTimeout(this.setState({nakyy: false}), 3000)
    }

    tickn() {
        console.log('NoteC tickn ', this.state.nakyy)
        this.state.nakyy ?
        this.setState({nakyy: false}) : this.setState({nakyy: true})
        
      }
    
    tick() {
      console.log('NoteC tick ', this.state.nakyy)
      this.setState({
        date: new Date()
      });
    }
  
    render() {
        if (this.state.nakyy) {
            return (
                <div className = 'note'>{this.state.message}
                </div>
                )
        }      else { return null }
    }
    
  }

  export default Note3c;
  /*
  ReactDOM.render(
    <Clock />,
    document.getElementById('root')
  );
  */