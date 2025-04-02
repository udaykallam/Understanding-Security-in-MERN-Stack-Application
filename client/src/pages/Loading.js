import React from 'react'
import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <>
    <div style={{paddingTop:'250px'}}>
    <center>
    <ReactLoading type={'spin'} color={'white'} height={80} width={80} />
    </center>
    </div>

    </>
  )
}

export default Loading