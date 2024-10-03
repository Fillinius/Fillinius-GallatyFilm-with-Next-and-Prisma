import { RouterOutput } from '@/shared/api/api'
import { formatDate } from '@/shared/utils/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface IsLikedBtnProp {
  isLikedBtn: ReactNode
}

export type FilmCardProps = NonNullable<RouterOutput['film']['findById']> &
  IsLikedBtnProp

export const FilmCard = ({
  id,
  title,
  description,
  poster,
  date,
  isLikedBtn,
}: FilmCardProps) => {
  return (
    <div className="flex font-sans rounded-lg shadow-xl overflow-hidden">
      <div className="flex-none w-48 relative">
        <Image
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex-auto p-6">
        <div className="flex flex-wrap -mt-6 pt-6 pb-6">
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            {title}
          </h1>
          <div className="text-lg font-semibold text-slate-500">
            {formatDate(date).toDateString()}
          </div>
          <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
            {description}
          </div>
        </div>
        <div className="flex space-x-4 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <Link
              href={`/films/${id}`}
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 align-middle leading-10"
            >
              Подробнее
            </Link>
            {isLikedBtn}
          </div>
        </div>
      </div>
    </div>
  )
}
