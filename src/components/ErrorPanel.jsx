import React from 'react'

const ErrorPanel = ({ errorData }) => {
    console.log(errorData)
    return (
        <div className='text-red-500 p-2 mt-4 font-semibold	text-lg	' >
            <h2 className='text-white text-3xl' >error :(</h2>
            <br />
            <br />
            code: {errorData?.code || 'null'}
            <br />
            <br />
            message: {errorData?.message || 'null'}
            <br />
            <br />
            param: {errorData?.param || 'null'}
            <br />
            <br />
            type: {errorData?.type || 'null'}
        </div>
    )
}

export default ErrorPanel