import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { connect } from "react-redux";
import { getAllNovedades } from "../../../redux/actions";


const EjersPost = (props) => {

    const clouRem = useRef()
    const widgetRem = useRef()
    const [resp, setResp] = useState({
        mensege: ""
    })
    const [ejer, setEjer] = useState({
        titulo: "",
        descripcion: "",
        image: ""
    })

    useEffect(() => {
        clouRem.current = window.cloudinary
        widgetRem.current = clouRem.current?.createUploadWidget({
            cloudName: "bl3ychz",
            uploadPreset: "ngqx8htx"
        }, function (error, result) {
            if (result.data?.info?.files) {
                setEjer({
                    ...ejer,
                    image: [result.data?.info?.files]
                })
            }
        })
    }, [ejer])

    async function post(e) {
        e.preventDefault();
        const respi = await axios.post("/novedades", {
            titulo: ejer.titulo,
            descripcion: ejer.descripcion,
            image: ejer.image
        })
        setResp({
            ...resp,
            mensege: respi.data.message
        })
        await props.getAllNovedades()
        setEjer({
            titulo: "",
            descripcion: "",
            image: ""
        })
    }

    const handleInputChange = (e) => {
        setEjer({
            ...ejer,
            [e.target.name]: e.target.value
        })
        setResp({
            mensege: ""
        })
    }

    return (
        <div >
            <div className="ejers">
                <h1>Alguna Nueva Noticia</h1>
                <h5>Titulo</h5>
                <input className="button" type="text" name="titulo" onChange={handleInputChange} value={ejer.titulo}/>
                <h5>Descripcion</h5>
                <textarea name="descripcion" rows="10" cols="40" className="buttonf" onChange={handleInputChange} value={ejer.descripcion}></textarea>
                <label className="selectI">
                    <h5>Select archivo</h5>
                    <button className="button" onClick={() => widgetRem.current?.open()}>
                        updat
                    </button>
                </label>
                {(ejer.image) && <h6>archivo agregado</h6>}
                {(resp.mensege) && <h2>{resp.mensege}</h2>}
                {(ejer.descripcion && ejer.image && ejer.titulo) ?
                    <button onClick={(e) => post(e)} className="button">Añadir</button> :
                    <h5>Faltan parametros</h5>}
            </div>
        </div>
    )
}

export const mapStateToProps = (state) => {
    return {
        novedades: state.novedades,
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        getAllNovedades: () => dispatch(getAllNovedades()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EjersPost)
