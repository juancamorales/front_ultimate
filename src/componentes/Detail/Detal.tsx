import { useEffect, useState } from "react";
import { detail, clear } from '../../redux/actions/index'
import { connect } from 'react-redux';
import { useParams, } from "react-router-dom";
import ReactPlayer from "react-player"
import "./detail.css"

const Detail = (props: any) => {

    const { id } = useParams()

    useEffect(() => {
        if (!props.ejercis.name) {
            props.detail(id)
        }
        return () => {
            props.clear()
        }
    }, [id])

    const fildp = props.ejercis.image?.filter((string: any) => string?.slice(-1) === "g");

    const fildg = props.ejercis.image?.filter((string: any) => string?.slice(-1) === "4");

    return (
        <div className="detail">
            {
                (props.ejercis.name) ?
                    <div>
                        <h1>{props.ejercis.name}</h1>
                        <h3>Descripcion</h3>
                        <a>{props.ejercis.ejercise}</a>
                        <h3>Duracion</h3>
                        <h5>{props.ejercis.duracion}</h5>
                        <h3>Tipo</h3>
                        <h4>{props.ejercis.tipo}</h4>
                        {fildg?.map((i: any) =>
                            <div key={i} className="video">
                                <ReactPlayer
                                    url={i}
                                    width="500px"
                                    height="500px"
                                    controls
                                />
                            </div>)}
                        {fildp?.map((i: any) =>
                            <div key={i}>
                                <img src={i} alt="image" key={i}
                                    width="600px"
                                    height="600px" />
                            </div>)}
                    </div> : <br></br>}
        </div>
    )
}

export const mapStateToProps = (state: { ejercis: any; }) => {
    return {
        ejercis: state.ejercis,
    }
}

export const mapDispatchToProps = (dispatch: any) => {
    return {
        detail: (_id: any) => dispatch(detail(_id)),
        clear: () => dispatch(clear()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)