import AssetSvg from '@/images/asset.svg?react'
import ComponentSvg from '@/images/component.svg?react'
import EnergySvg from '@/images/energy.svg?react'
import VibrationSvg from '@/images/vibration.svg?react'
import type { AssetPropsT } from '@/types/asset'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function Asset({ asset }: AssetPropsT) {
  const navigate = useNavigate()
  const [showChildren, setShowChildren] = useState(false)
  const statusClassName = clsx([
    'w-2',
    asset.status === 'alert' ? 'text-alert!' : 'text-operating!',
  ])
  const svgClassName = 'text-select h-4'

  return (
    <div>
      <button
        className='hover:bg-select flex cursor-pointer items-center gap-2 rounded-sm px-3 py-1 hover:text-white hover:*:text-white'
        key={asset.id}
        onClick={() => {
          if (asset.children) setShowChildren(previous => !previous)
          else navigate(`/${asset.id}`)
        }}
      >
        {asset.children && asset.children.length > 0 && (
          <ChevronRight
            size={16}
            className={clsx({
              'transition-transform duration-200': true,
              'rotate-90': showChildren,
            })}
          />
        )}
        {asset.children ? (
          <AssetSvg className={svgClassName} />
        ) : (
          <ComponentSvg className={svgClassName} />
        )}
        <span className='whitespace-nowrap'>{asset.name}</span>
        {asset.status && (
          <>
            {asset.sensorType === 'energy' ? (
              <EnergySvg className={statusClassName} />
            ) : (
              <VibrationSvg className={statusClassName} />
            )}
          </>
        )}
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
