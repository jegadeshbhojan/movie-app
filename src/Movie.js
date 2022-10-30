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
                    <h3 className=" display-4 w-75 h-25  ">
                        {description_full}
                    </h3>
                    </div>
                   
                </Figure>
                <ListGroup>
                    <ListGroup className="d-flex flex-row">
                        <Form.Label className="w-25 border border-secondary">Released Year</Form.Label>
                        <ListGroup.Item className="w-75">  {year}</ListGroup.Item>
                    </ListGroup>
                    <ListGroup className="d-flex flex-row">
                        <Form.Label className="w-25 border border-secondary">like count</Form.Label>
                        <ListGroup.Item className="w-75"> {like_count}</ListGroup.Item>
                    </ListGroup>
                    <ListGroup className="d-flex flex-row">
                        <Form.Label className="w-25 border border-secondary">description_ful</Form.Label>
                        <ListGroup.Item className="w-75">  {description_full}</ListGroup.Item>
                    </ListGroup>

                </ListGroup>

                <h2>{cast && cast.map((t) => {
                    const { character_name, name, imdb_code } = t;
                    return (
                        <ListGroup>
                            <ListGroup className="d-flex flex-row">
                                <Form.Label className="w-25">character_name</Form.Label>
                                <ListGroup.Item className="w-75">  {character_name}</ListGroup.Item>
                            </ListGroup>
                            <ListGroup className="d-flex flex-row">
                                <Form.Label className="w-25">name</Form.Label>
                                <ListGroup.Item className="w-75">  {name}</ListGroup.Item>
                            </ListGroup>
                            <ListGroup className="d-flex flex-row">
                                <Form.Label className="w-25">imdb code</Form.Label>
                                <ListGroup.Item className="w-75">  {imdb_code}</ListGroup.Item>
                            </ListGroup>
                        </ListGroup>
                    )

                })}</h2>
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