import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { connect } from "react-redux";
import { getAllEjercise } from '../../redux/actions/index'
import "./ejersPost.css"


const EjersPost = (props) => {

    const clouRem = useRef()
    const widgetRem = useRef()
    const [resp, setResp] = useState({
        mensege: ""
    })
    const [ejer, setEjer] = useState({
        name: "",
        ejercise: "",
        image: "",
        duracion: "",
        tipo: "",
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
        const respi = await axios.post("/ejercise", {
            name: ejer.name,
            ejercise: ejer.ejercise,
            image: ejer.image,
            duracion: ejer.duracion,
            tipo: ejer.tipo,
        })
        setEjer({
            name: "",
            ejercise: "",
            image: "",
            duracion: "",
            tipo: "",
        })
        setResp({
            ...resp,
            mensege: respi.data.message
        })
        await props.getAllEjercise()
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

    const InputChange = (e) => {
        setEjer({
            ...ejer,
            tipo: e.target.value
        })
    }

    return (
        <div >
            <div className="ejers">
                <h1>Crea tu propio ejercicio</h1>
                <select className="filtro"
                    onChange={(e) => InputChange(e)}
                    defaultValue={"default"}
                >
                    <option value="default" disabled>
                        Tipo de ejercicio
                    </option>
                    <option value="resistencia">resistencia</option>
                    <option value="aeróbico">aeróbico</option>
                    <option value="flexibilidad">flexibilidad</option>
                    <option value="fuerza">fuerza</option>
                </select>
                <h5>nombre</h5>
                <input className="buttonf" type="text" name="name" onChange={handleInputChange} value={ejer.name} />
                <h5>Descripcion</h5>
                <textarea name="ejercise" rows="10" cols="40" className="buttonf" onChange={handleInputChange} value={ejer.ejercise}></textarea>
                <h5>Duracion del ejercicio</h5>
                <input className="buttonf" type="text" name="duracion" onChange={handleInputChange} value={ejer.duracion} />
                <br/>
                <label className="selectI">
                    <h5>Select archivo</h5>
                    <button className="button" onClick={() => widgetRem.current?.open()}>
                        updat
                    </button>
                </label>
                {(ejer.image) && <h6>archivo agregado</h6>}
                {(resp.mensege.length > 0) ?
                    <h2>{resp.mensege}</h2> :
                    <br></br>
                }
                {(ejer.ejercise && ejer.image && ejer.name && ejer.duracion && ejer.tipo) ?
                    <button onClick={(e) => post(e)} className="button">Añadir</button> :
                    <h5>Faltan parametros</h5>}
            </div>
        </div>
    )
}

export const mapStateToProps = (state) => {
    return {
        ejercise: state.ejercise,
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        getAllEjercise: () => dispatch(getAllEjercise()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EjersPost)
