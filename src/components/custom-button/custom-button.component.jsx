import React from 'react';
import { CustomButtonContainer } from './custom-button.styles';
// import './custom-button.styles.scss'

// const CustomButton = ({ children, inverted, isGoogleSignIn, ...otherProps }) => (
//   <button className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} { ...otherProps }>
//     { children }
//   </button>
// )

const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
)

export default CustomButton;