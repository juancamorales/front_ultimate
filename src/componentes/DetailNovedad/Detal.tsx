import { useEffect, useState } from "react";
import { detailNovedd, clear } from '../../redux/actions/index'
import { connect } from 'react-redux';
import { useParams, } from "react-router-dom";
import ReactPlayer from "react-player"

const Detail = (props: any) => {

    const { id } = useParams()

    useEffect(() => {
        if (!props.novedad.titulo) {
            props.detailNovedd(id)
        }
        return  ()=> {
            props.clear()
        }
    }, [id])

    const fildp = props.novedad.image?.filter((string: any) => string?.slice(-1) === "g");

    const fildg = props.novedad.image?.filter((string: any) => string?.slice(-1) === "4");

    return (
        <div className="details">
            {
                (props.novedad.titulo) ?
                    <div>
                        <h1>{props.novedad.titulo}</h1>
                        <h3>Descripcion</h3>
                        <a>{props.novedad.descripcion}</a>
                        {fildg?.map((i: any) =>
                            <div key={i}>
                                <ReactPlayer
                                    url={i}
                                    width="500px"
                                    height="500px"
                                    border-radius="100px"
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

export const mapStateToProps = (state: { novedad: any; }) => {
    return {
        novedad: state.novedad,
    }
}

export const mapDispatchToProps = (dispatch: any) => {
    return {
        detailNovedd: (_id: any) => dispatch(detailNovedd(_id)),
        clear: () => dispatch(clear()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)