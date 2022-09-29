import { useEffect, useState } from "react"
import {useLocation, useNavigate} from "react-router-dom"
import api from "../../services/api"
import {Button, Card, CardActions, CardContent, CardMedia, Typography,} from "@mui/material"
const Home = () => {
  const search = useLocation().search
  const searchKey = new URLSearchParams(search).get('search')
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  
  useEffect(() => {
    const getStories = async () => {

      setLoading(true)
      try{
        const {data} = await api.get(`/story/getallstories?search=${searchKey || ""}&page=${page}`)
        
        if(searchKey){
          navigate({
            pathname:'/',
            search: `?search=${searchKey}${page > 1 ? `&page=${page}` : ""}`,
          })
        }else{
          navigate({
          pathname:'/',
          search:`${page > 1 ? `page=${page}`: "" }`
          })
        }

        setStories(data.data)
        setPages(data.pages)

        setLoading(false)

      }catch{
        setLoading(true)
      }
    }
    getStories()
  },[setLoading,search,page,navigate])

  useEffect(() => {
    setPage(1)
  },[searchKey])

  return(
   <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card> 
  )
}


export default Home
