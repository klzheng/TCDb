import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import { useAuth } from "../hooks";
import Container from "./Container";
import FormContainer from "./form/FormContainer";
import MovieContent from "./home/MovieContent";
import SearchBar from "./home/SearchBar";
import SectionContent from "./home/SectionContent";
import SectionHeader from "./home/SectionHeader";
import Slider from "./home/Slider";
import Welcome from "./home/Welcome";


export default function Home() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const { url, setUrl } = useContext(MovieContext)
  const { authInfo } = useAuth()
  const { isLoggedIn } = authInfo


  // api urls
  const trendingUrl = "https://api.themoviedb.org/3/trending/all/week?api_key=5b7ff1ca08f2367f1d77090c6730231d&language=en-US&page=1"
  const theatersUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=5b7ff1ca08f2367f1d77090c6730231d&language=en-US&page=1"

  // default movie results
  useEffect(() => {
    const fetchDetails = async () => {
        try {
            const trendingRes = await fetch(trendingUrl)
            const trendingData = await trendingRes.json()
            setUrl(trendingData.results)

            const theatersRes = await fetch(theatersUrl)
            const theatersData = await theatersRes.json()
            setMovies(theatersData.results)

        } catch (err) {
            console.log(err)
        }
    }
    fetchDetails() // eslint-disable-next-line
}, [])


  // redirect user to sign in page if no user already signed in
  useEffect(() => {
    if (!isLoggedIn) navigate("/auth/signin") // eslint-disable-next-line
  }, [isLoggedIn])

  return (
    <FormContainer>
      <Container>
        
        
          <Welcome />
          <SearchBar />

          <SectionContent>
            <SectionHeader value="See what's popular this week" />
            <Slider />
            <MovieContent url={url} />
          </SectionContent>

          <SectionContent>
            <SectionHeader value="In Theaters" />
            <MovieContent url={movies} />
          </SectionContent>
        
        
      </Container>
    </FormContainer>
  )
}
