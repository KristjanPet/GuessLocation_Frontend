import Layout from 'components/ui/Layout'
import { FC } from 'react'
import Avatar from 'react-avatar'
import { useInfiniteQuery } from 'react-query'
import * as API from 'api/Api'
import authStore from 'stores/auth.store'
import { GuessType } from 'models/guess'
import GuessComponent from 'components/guess/GuessComponent'
import { LocationType } from 'models/location'
import LocationComponent from 'components/location/LocationComponent'

// interface Props {
//   defaultValues?: UserType
// }

const Profile: FC = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<
    { data: { data: GuessType[]; meta: { total: number; page: number } } },
    Error
  >(
    'guesses',
    ({ pageParam = 1 }) =>
      API.getGeuessByUser(authStore.user?.id || '', pageParam, 3),
    {
      getNextPageParam: (lastPage, allPages) => {
        const currentPage = lastPage?.data.meta?.page || 1
        const totalPages = Math.ceil((lastPage?.data.meta?.total || 0) / 3)
        // console.log(lastPage, lastPage?.data.meta?.page)

        return currentPage < totalPages ? currentPage + 1 : undefined
      },
    },
  )

  const guesses = data?.pages.flatMap((page) => page.data.data) || []

  // console.log(data?.pages)

  const handleLoadMoreGuesses = () => {
    fetchNextPage()
  }

  //LOCATIONS

  const {
    data: locationData,
    fetchNextPage: fetchNextLocationPage,
    hasNextPage: hasNextLocationPage,
  } = useInfiniteQuery<
    { data: { data: LocationType[]; meta: { total: number; page: number } } },
    Error
  >('locations', ({ pageParam = 1 }) => API.getLocationsOfUser(pageParam, 3), {
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = lastPage?.data.meta?.page || 1
      const totalPages = Math.ceil((lastPage?.data.meta?.total || 0) / 3)
      // console.log(lastPage, lastPage?.data.meta?.page)

      return currentPage < totalPages ? currentPage + 1 : undefined
    },
  })

  const locations = locationData?.pages.flatMap((page) => page.data.data) || []

  const handleLoadMoreLocations = () => {
    fetchNextLocationPage()
  }

  return (
    <Layout>
      <div className="grid">
        <div className="flex items-center gap-6 mb-4 ">
          <Avatar
            className=" "
            round
            src={
              authStore.user?.avatar
                ? `${process.env.REACT_APP_API_URL}/files/${authStore.user?.avatar}`
                : '/images/blankAvatarIcon.svg'
            }
            alt={
              authStore.user?.first_name || authStore.user?.last_name
                ? `${authStore.user?.first_name} ${authStore.user?.last_name}`
                : authStore.user?.email
            }
          />
          <p className="text-dark text-2xl">
            {authStore.user?.first_name} {authStore.user?.last_name}
          </p>
        </div>
        <p className="text-primary text-2xl">My best guesses</p>
        <div className="col-span-full grid md:grid-cols-3 gap-3 mt-8 ">
          {guesses && guesses?.length > 0 ? (
            <>
              {guesses.map((guess, index) => (
                <>
                  <div key={index}>
                    <div className=" mb-2.5">
                      <GuessComponent key={guess.id} guess={guess} />
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <p>You do not have any guesses yet</p>
          )}
        </div>
        <div className="col-span-full my-10 mx-auto ">
          {hasNextPage && (
            <button
              onClick={handleLoadMoreGuesses}
              className=" border border-primary text-primary px-5 py-1.5 rounded"
            >
              LOAD MORE
            </button>
          )}
        </div>
        <p className="text-primary text-2xl">My uploads</p>
        <div className="col-span-full grid md:grid-cols-3 gap-3 mt-8">
          {locations && locations?.length > 0 ? (
            <>
              {locations?.map((location, index) => (
                <div key={index}>
                  <div className=" mb-2.5">
                    <LocationComponent key={location?.id} data={location} />
                  </div>
                  {/* <div className="w-100"></div> */}
                </div>
              ))}
            </>
          ) : (
            <p>You do not have any guesses yet</p>
          )}
        </div>
        <div className="col-span-full my-10 mx-auto">
          {hasNextLocationPage && (
            <button
              onClick={handleLoadMoreLocations}
              className=" border border-primary text-primary px-5 py-1.5 rounded"
            >
              LOAD MORE
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Profile
