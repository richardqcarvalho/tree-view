import { getAssets } from '@/actions/asset'
import Asset from '@/components/asset'
import { useCompanyStore } from '@/store'
import type { StructuredAssetT } from '@/types/asset'
import { useQuery } from '@tanstack/react-query'

export default function Assets() {
  const { companyId } = useCompanyStore()
  const { data: assets, isPending } = useQuery<StructuredAssetT[]>({
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
    <div className='flex flex-col p-4'>
      {assets.map(asset => (
        <Asset
          key={asset.id}
          asset={asset}
        />
      ))}
    </div>
  )
}
