import { getAssets } from '@/actions/asset'
import useStore from '@/store'
import type { AssetT } from '@/types/asset'
import { useQuery } from '@tanstack/react-query'

export default function Assets() {
  const { companyId } = useStore()
  const { data: assets, isPending } = useQuery<AssetT[]>({
    queryKey: ['get-assets', companyId],
    queryFn: () => getAssets(companyId),
    enabled: companyId !== '',
  })

  if (isPending)
    return (
      <div>
        <span>Loading assets...</span>
      </div>
    )

  return (
    <div className='flex flex-col'>
      {assets.map(asset => (
        <span key={asset.id}>{asset.name}</span>
      ))}
    </div>
  )
}
