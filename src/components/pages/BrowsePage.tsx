
import Billboard from '../Billboard'
import NavBar from '../NavBar'
import MovieList from '../MovieList'
import useMoviesList from '../../hooks/useMoviesList'
import { useState,useRef, useCallback } from 'react'
import LoadingCards from '../LoadingCards'
import {useSelector} from "react-redux"
import { RootState } from '../../app/store'
import { Navigate } from 'react-router-dom'


const BrowsePage = () => {

  const [offset, setOffset] = useState(0)
  const {data, loading, error} = useMoviesList(offset)

  const observer = useRef<null | IntersectionObserver>(null)


  //redux
  const {user, isLoading} = useSelector((state: RootState) => state.user.value)
  console.log({isLoading, user})
  //redux

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if(loading) return;

    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting){
        setOffset(offset + 12)
        //console.log("intersecting")
      }
    })

    if(node) observer.current.observe(node)
  }, [loading])

  //console.log({ data,loading, error })


  if(error === "Unauthorized no plan") return <Navigate to="/plans" />

  return (
    <div>
        <NavBar />
        <Billboard />
        <div className='pb-5'>
          {/* {loading && <p>Loading ...</p>} */}
          {error && <p>{error}</p>}
          {data && <MovieList movies={data} lastElementRef={lastElementRef} />}
          {loading ? <LoadingCards /> : null}
        </div>
    </div>
  )
}

export default BrowsePage