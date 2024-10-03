import { trpc } from '@/shared/api/api'
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/solid'

type IsLikedFilmsButtonProp = {
  isLiked: boolean
  filmId: number
  onSuccess?: () => void
}

export function IsLikedBtn({
  filmId,
  isLiked,
  onSuccess,
}: IsLikedFilmsButtonProp) {
  const { mutate } = trpc.film.isLiked.useMutation({ onSuccess })
  const nandleClickIsLike = () => {
    mutate({
      id: filmId,
      isLiked: isLiked,
    })
  }
  return (
    <button
      onClick={nandleClickIsLike}
      className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
      type="button"
      aria-label="Like"
    >
      {isLiked ? <HandThumbUpIcon /> : <HandThumbDownIcon />}
    </button>
  )
}
