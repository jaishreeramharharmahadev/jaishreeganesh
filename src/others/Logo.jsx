import React from 'react'
// import mainLogo from '../../assets/GT.jpg'
import secondLogo from '../assets/GTT2.png'
function Logo() {
  return (
    <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='flex items-center'>
            {/* <img src={mainLogo} alt="" className='h-20' /> */}
            <div>
                <img src={secondLogo} alt="" className='h-10' />
                <p className='text-[10px] text-[#0A444D] -mt-2 ml-[22px] '>𝙀𝙢𝙥𝙤𝙬𝙚𝙧𝙞𝙣𝙜 𝙁𝙪𝙩𝙪𝙧𝙚 𝙏𝙚𝙘𝙝 𝙇𝙚𝙖𝙙𝙚𝙧'𝙨</p>
            </div>
        </div>
    </div>
  )
}

export default Logo