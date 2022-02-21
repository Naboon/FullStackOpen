const Notification = ({ message, messageType }) => {
    const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    
    if (message === null) {
      return null
    } else if (messageType === 'notification') {
        return (
            <div style={notificationStyle}>
              {message}
            </div>
        )
    } else if (messageType === 'error') {
        return (
            <div style={errorStyle}>
              {message}
            </div>
        )
    } else {
        return null
    }
}

  export default Notification