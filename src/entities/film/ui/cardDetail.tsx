import { IsLikedBtn } from '@/features/isLikeFilm'
import Image from 'next/image'
import { formatDate } from '@/shared/utils/formatDate'
import { RouterOutput } from '@/shared/api/api'
import Link from 'next/link'

type FilmDetailProp = NonNullable<RouterOutput['film']['findById']>

export const FilmCardDetail = ({
  date,
  description,
  id,
  isLiked,
  poster,
  title,
}: FilmDetailProp) => {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Информация о фильме
        </h3>
        <div>
          <Image
            src={poster}
            width="150"
            height="150"
            alt="poster"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Название
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Описание
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Дата выпуска фильма
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {formatDate(date).toLocaleDateString()}
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex ml-2">
        <IsLikedBtn isLiked={isLiked} filmId={id} />
        <Link
          href="/"
          className=" ml-2 h-9 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 align-middle leading-10"
        >
          {' '}
          Back
        </Link>
      </div>
    </div>
  )
}
