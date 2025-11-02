import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

    const [userData, setUserData] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    const data = async() => {
        setIsLoading(true)
        try{
            const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=15`)
            setUserData(response.data)
        } catch (error) {
            console.error("Error fetching data: ", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() =>{
        data()
    },[page])

    let printUserData;
    
    if(isLoading){
        printUserData = <h1 className='text-3xl text-white '>Loading...</h1>
    } else  if(userData.length>0) {
        printUserData = userData.map((elem,idx) => {

            return <div key={idx} className='leading-tight'>
                    <a href={elem.url} target='_blank'>
                        <div className='h-50 w-64 bg-white overflow-hidden rounded'>
                            <img key={idx} src = {elem.download_url} alt='imageg' 
                                className='h-full w-full object-cover '></img>
                        </div>
                        <h3>{elem.author}</h3>
                    </a>
            </div>
        })
    } else {
        printUserData = <h1 className='text-3xl text-white'>No Data Found</h1>
    }

  return (
    <div  id='right' className='bg-black px-5 pt-8  overflow-auto text-gray-400 h-screen '>

        <div className='flex flex-wrap justify-center items-center gap-9 h-[86vh]'>
            {printUserData}
        </div>

        <div className=' flex justify-between gap-8 mt-2 p-3'>        
        <button  
            onClick={() =>{
                if(page>1){
                    setPage(page-1)
                }
            }}
            className='bg-yellow-500 text-white px-8 py-2 rounded hover:bg-yellow-600 cursor-pointer active:scale-95 duration-100'
            style={{opacity : page == 1? 0.75 : 1}}
            >
                Prev
        </button>
        <h4>Page {page}</h4>
        <button 
            onClick={() =>{ 
                setPage(page+1)
            }}
            className='bg-yellow-500 text-white px-8 py-2 rounded hover:bg-yellow-600 cursor-pointer active:scale-95 duration-100'
            >
                Next
        </button>

        </div>
    </div>
  )
}

export default App
