import React from 'react'
import { Switch } from 'evergreen-ui'
  
export default function Notification() {
  
  const [value, setValue] = React.useState(false)
  
  return (
    <div style={{width: '80%'}} className='flex flex-row items-center text-blue-700 font-600'>
      <Switch checked={value} onChange={() => setValue(!value)} />
      <h4 className='ml-[5%] text-[18px]'>Get Email notification</h4>
    </div>
  );
}