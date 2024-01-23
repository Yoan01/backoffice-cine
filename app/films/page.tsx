'use client'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

export default function Home() {
	const [films, setFilms] = useState([])

	useEffect(() => {
		// Appel à l'API pour récupérer les films
		fetch('https://api.example.com/films')
			.then((response) => response.json())
			.then((data) => setFilms(data))
			.catch((error) => console.error(error))
	}, [])

	const handleDeleteFilm = (filmId: any) => {
		// Appel à l'API pour supprimer le film avec l'ID filmId
		fetch(`https://api.example.com/films/${filmId}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.ok) {
					// Supprimer le film de la liste des films affichés
					setFilms(
						films.filter(
							(film: { id: number; title: string }) => film.id !== filmId
						)
					)
				} else {
					console.error('Erreur lors de la suppression du film')
				}
			})
			.catch((error) => console.error(error))
	}

	return (
		<Flex>
			<Button>Add Film</Button>
			{films.map((film: { id: number; title: string }) => (
				<Flex key={film.id}>
					<Text>{film.title}</Text>
					<Button>Edit</Button>
					<Button onClick={() => handleDeleteFilm(film.id)}>Delete</Button>
				</Flex>
			))}
		</Flex>
	)
}
