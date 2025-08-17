import type { SkeletonPropsT } from '@/types/skeleton'
import clsx from 'clsx'

export default function Skeleton({ count, className }: SkeletonPropsT) {
  return (
    <>
      {[...Array(count)].map(() => (
        <div className={clsx(['animate-pulse bg-zinc-300', className])} />
      ))}
    </>
  )
}
