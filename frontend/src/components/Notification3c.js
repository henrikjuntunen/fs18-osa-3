import React from 'react';
import './notification3c.css';

class Notification extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        if (this.props.message === null) {
            return null
        } else {

            return (
                <div className="notification"> 
      {this.props.message}
      </div>
    );
        }
}
}

export default Notification;

/*
// solutions/part2/phonebook/src/components/Notification.js
import React from 'react'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return(
    <div className='notification'>
      { message }
    </div>
  )
}

export default Notification
*/