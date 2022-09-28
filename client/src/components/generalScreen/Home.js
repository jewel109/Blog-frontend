import { useEffect, useState } from "react"
import {useLocation, useNavigate} from "react-router-dom"
import {api} from "../../services/api"
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
        const {data} = await api.get("/story/")
      }
    }
  })

  /getstories/

}


export default Home
