import assetSvg from '@/images/asset.svg'
import type { AssetPropsT } from '@/types/asset'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function Asset({ asset }: AssetPropsT) {
  const [showChildren, setShowChildren] = useState(false)

  return (
    <div>
      <button
        className='flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 hover:bg-blue-300'
        key={asset.id}
        onClick={() => {
          if (asset.children) setShowChildren(previous => !previous)
        }}
      >
        {asset.children && (
          <ChevronRight
            size={16}
            className={clsx({
              'transition-transform duration-200': true,
              'rotate-90': showChildren,
            })}
          />
        )}
        <img
          src={assetSvg}
          className='h-4'
        />
        {asset.name}
      </button>
      {showChildren && (
        <div className='ml-8'>
          {asset.children.map(child => (
            <Asset
              key={child.id}
              asset={child}
            />
          ))}
        </div>
      )}
    </div>
  )
}
