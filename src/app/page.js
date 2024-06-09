"use client"
import { useEffect, useState } from "react";
import ResSelector from "@/components/ResSelector";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./page.css"

//const url_endpoint = "http://localhost:3000/"
const url_endpoint = "https://tweet-poster.vercel.app/"

export default function Home() {
  const [tipoPub, setTipoPub] = useState("All")
  const [contenido, setContenido] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usuarioactual, setUsuarioactual] = useState("-- Seleccionar --")
  const [section, setSection] = useState(1)

  console.log(usuarioactual)
  
  const publicarT = async (id) => {
    if(usuarioactual === "-- Seleccionar --") {
      alert("Seleccione su usuario")
      return
    }
    setIsLoading(true);

    const params = {
        user_id: usuarioactual,
        content_id: id
    }
    try {
      await fetch(url_endpoint + "publish", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(params)
      })
      alert("Publicado")
      setIsLoading(false);
      setContenido(contenido.slice().filter(x => x._id != id))
    } catch (e) {
      console.log(e)
    }
  }

  const updateBD = async (id) => {
    setIsLoading(true);
    try {
      await fetch(url_endpoint + "up_data", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
      alert("Listo!")
      setIsLoading(false);
    } catch (e) {
      console.log(e)
    }
  }

  const deleteC = async (id) => {
    setIsLoading(true)
    const params = {
        content_id: id
    }

    try {
      await fetch(url_endpoint + "delete", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "DELETE",
        body: JSON.stringify(params)
      })
      alert("Eliminado")
      setIsLoading(false)
      setContenido(contenido.slice().filter(x => x._id != id))
    } catch (e) {
      console.log(e)
    }
  }

  const handleSecs = (sec) => {
    setSection(sec)
  }

  useEffect(() => {
    setIsLoading(true);

    async function getInitialData () {
      const content_data = await fetch(url_endpoint + "resources", {
        cache: "no-cache"
      })
      const {res_data} = await content_data.json()

      const user_data = await fetch(url_endpoint + "users")
      const {usr_data} = await user_data.json()

      setContenido(res_data)
      setUsuarios(usr_data)
      setIsLoading(false);
    }

    getInitialData()
  }, []);

  return (
    <>
      <Header handleChangeTipo={setTipoPub} 
              users={usuarios} 
              handleChangeUser={setUsuarioactual}
              actualizar={updateBD}
              />
      <main>
      {
        isLoading ? <h1>Loading ...</h1> :
      
          <ResSelector publicar={publicarT} content={contenido.filter(res => {
            if (tipoPub == "All") return true
            return res.type == tipoPub
          })} section={section} eliminar={deleteC}/>
      }
      </main>
      <Footer secs={section} handleSecs={handleSecs}/>
    </>
  )


}
