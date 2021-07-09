import React from 'react'
import { Fragment } from 'react'
import { Alert } from 'react-bootstrap'

function Message({ variant, children }) {
   return (
      <Fragment>
         {children &&
            <Alert variant={variant} >
               {children}
            </Alert>
      }
      </Fragment>
   )
}

export default Message
