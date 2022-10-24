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
            <>
                <iframe width='560' height='315' src={`https://www.youtube.com/embed/${yt_trailer_code}`} />
                <Figure>
                    <Figure.Image
                        width={500}
                        height={500}
                        alt={background_image_original}
                        src={background_image_original}
                    />
                    <Figure.Caption>
                        {description_full}
                    </Figure.Caption>
                </Figure>
                <ListGroup>
                    <ListGroup className="d-flex flex-row">
                        <Form.Label className="w-25 border border-secondary">id</Form.Label>
                        <ListGroup.Item className="w-75">  {id}</ListGroup.Item>
                    </ListGroup>
                    <ListGroup className="d-flex flex-row">
                        <Form.Label className="w-25 border border-secondary">year</Form.Label>
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
                        <>
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
                        </>
                    )

                })}</h2>
            </>
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