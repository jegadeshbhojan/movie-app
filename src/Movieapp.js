import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {Movie} from './Movie';

export function MovieApp({ searchText }) {
    const [results, setResults] = useState({});
    const [showMovie,setShowMovie]=useState(false);
    const [id,setId]=useState(0);

    function fetchApi() {
        if (searchText) {
            fetch(`https://movies-and-serials-torrent.p.rapidapi.com/movies/search/${searchText}`, {
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

    function handleClick(index){
        const { data: { movies } } = results;
        console.log('index',movies[index],movies[index]);
        const {id}=movies[index];
        console.log('id',id)
        setShowMovie(true);
        setId(id);

    }

    function showResults() {
        const { data: { movies } } = results;
        return (
            <>
                {movies && movies.map((movie,index) => {
                    const { title, year, runtime, genres, summary, description_full,background_image_original } = movie;
                    return (
                       
                            <Card key={index} className='d-flex flex-row justify-content-center'>
                                <Card.Img className='w-25' alt={title} src={background_image_original} />
                                <div>
                                <Card.Link></Card.Link>
                                <Card.Body className='w-100'>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Text>
                                        {summary}
                                    </Card.Text>
                                    <div className='w-100'>
                                    <Button variant="primary"   onClick={()=>handleClick(index)}>Learn more </Button>
                                    </div>
                                    
                                </Card.Body>
                                </div>
                                
                            </Card>
                    )
                })}
            </>
        )
    }

    useEffect(() => {
        fetchApi();
    }, [searchText])
    return (
        <>
            {(!showMovie&&results && Object.keys(results).length && showResults() || <b>
                Enter any movie name here
            </b>)}
            {showMovie && <Movie id={id}/>}

        </>
    )
}