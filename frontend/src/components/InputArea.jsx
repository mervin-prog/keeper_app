import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { OutlinedInput, InputAdornment } from '@mui/material';

const InputArea = ({isSignUp,formData,onChange}) => {
  return (
    <div>
    {!isSignUp && (
        <OutlinedInput
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Name"
          required
            startAdornment = {
              <InputAdornment position="start">
                <AccountCircleOutlinedIcon className='custom-input-icons'/>
              </InputAdornment>
            }
            className='custom-input'
        />
      )}
       <OutlinedInput
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="Email"
        required
        startAdornment = {
          <InputAdornment position="start">
          <EmailOutlinedIcon className='custom-input-icons' />
          </InputAdornment>
        }
        className='custom-input'
      />
      <OutlinedInput
        type="password"
        name="password"
        value={formData.password}
        onChange={onChange}
        placeholder="Password"
        required
        startAdornment = {
          <InputAdornment position='start'>
            <LockOutlinedIcon className='custom-input-icons' />
          </InputAdornment>
        }
        className='custom-input'
      />
    </div>
  )
}

export default InputArea
