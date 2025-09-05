import ComponentGrid from '@/components/components/ComponentGrid'
import React from 'react'

export default function page() {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="flex-1 order-2 lg:order-1 min-w-0">
          <ComponentGrid type="templates" />
        </div>
      </div>
    </>
  )
}
