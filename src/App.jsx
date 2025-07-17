import { useState,useEffect } from 'react'
import  Header from './Components/Header'
import  Collection from './Components/Collection'
import  Footer from './Components/Footer'
import  {db} from './Database/db'

function App() {
  const [database, setDatabase] = useState(db)

  return (
    <>
        <Header/>

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {
                    database.map((guitar) =>(
                        <Collection key={ guitar.id }
                            guitar={guitar}
                        />
                    ))
                }
            </div>
        </main>

        <Footer/> 
    </>
  )
}

export default App
