import { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Figure from 'react-bootstrap/Figure';

export function Movie({ id }) {
    const [results, setResults] = useState({});
    function fetchApi() {
        if (id) {
            fetch(`https://movies-and-serials-torrent.p.rapidapi.com/movies/detail/${id}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'c5e01bb75amsh2c4342af95ed64dp15bfcajsn6b311decc88f',
                    'X-RapidAPI-Host': 'movies-and-serials-torrent.p.rapidapi.com'
                },
            })
                .then((res) => res.json())
                .then(res => setResults(res));
        }

    }

    function showResults() {
        const { data: { movie: { id, year, like_count, yt_trailer_code, genres, description_full, cast, background_image_original } } } = results;
        console.log(yt_trailer_code);
        return (
            <div className="w-100">
                <iframe className="w-75 border border-secondary rounded" height={400} src={`https://www.youtube.com/embed/${yt_trailer_code}`} />
                <Figure>
                    <Figure.Image
                       className="w-75 border border-secondary rounded"
                        height={500}
                        alt={background_image_original}
                        src={background_image_original}
                    />
                    <div className="w-100 d-flex  justify-content-center">
                    <i className=" mt-4 w-75 h-25 text-primary ">
                        {description_full}
                    </i>
                    </div>
                   
                </Figure>
                <h5 className=" mt-2 d-flex  justify-content-center ">Other details of the Movie</h5>
                <ListGroup className="mx-5">
                    <ListGroup className="d-flex flex-row my-2">
                        <Form.Label className="w-25 align-items-center">Released Year</Form.Label>
                        <ListGroup.Item className="w-75">  {year}</ListGroup.Item>
                    </ListGroup>
                    <ListGroup className="d-flex flex-row my-2">
                        <Form.Label className="w-25 ">Like count</Form.Label>
                        <ListGroup.Item className="w-75"> {like_count}</ListGroup.Item>
                    </ListGroup>
                    <ListGroup className="d-flex flex-row my-2">
                        <Form.Label className="w-25 ">Full Description</Form.Label>
                        <ListGroup.Item className="w-75">  {description_full}</ListGroup.Item>
                    </ListGroup>

                </ListGroup>
                
                <>{cast && cast.map((t,index) => {
                    const { character_name, name, imdb_code } = t;
                    return (
                        <>
                       
                        <ListGroup className="my-2 mx-5">
                            <ListGroup className="d-flex flex-row">
                                <Form.Label className="d-flex w-25 justify-content-center align-items-center">character Name {index+1}</Form.Label>
                                <ListGroup.Item className="w-75"> {character_name} </ListGroup.Item>
                               
                            </ListGroup>
                            <ListGroup className="d-flex flex-row">
                                <Form.Label className="w-25 d-flex justify-content-center  align-items-center">Actor Name</Form.Label>
                                <ListGroup.Item className="w-75"> 
                                <a className="   d-flex justify-content-center" target="_blank" href={`https://www.imdb.com/name/nm${imdb_code}/?ref_=tt_ov_wr`}>{name}</a>
                                 </ListGroup.Item>
                                
                            </ListGroup>
                        </ListGroup>
                        </>
                        
                    )

                })}</>
            </div>
        )
    }

    useEffect(() => {
        fetchApi();
    }, [id])
    return (
        <>
            {results && Object.keys(results).length && showResults()}

        </>
    )
}