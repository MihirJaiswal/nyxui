import React from 'react'
import WaterRippleEffect from '../ui/water-ripple-effect'

export default function WaterRippleEffectDemo() {
  return (
    <div>
      <WaterRippleEffect
       imageSrc='/assets/images/water-ripple-effect/art.jpg'
       height={620}
       width={600}
/*        className='scale-50 md:scale-100' */
        />
    </div>
  )
}
