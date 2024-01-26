import { IFilm } from '@/interface/IFilm'
import { compareAsc, format } from "date-fns";
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	Select,
	useToast,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface ModifyFilmProps {
	isOpen: boolean
	onClose: () => void
	film: IFilm | undefined
}

const ModifyFilm: React.FC<ModifyFilmProps> = ({ isOpen, onClose, film }) => {
	const toast = useToast()

	const [name, setName] = useState('')
	const [date, setDate] = useState('')
	const [author, setAuthor] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')

	useEffect(() => {
		if (isOpen && film) {
			setName(film.name)
			setDate(format(new Date(film.date), "yyyy-MM-dd"))
			setAuthor(film.author)
			setDescription(film.description)
			setImage(film.image)
		}
	}, [isOpen])

	const { mutate } = useMutation({
		mutationFn: () =>
			axios.put(`http://localhost:8000/films/` + film?.id, {
				name,
				date,
				author,
				description,
				image,
			}),
		onSuccess: () => {
			toast({
				title: 'Film modifié',
				description: 'Le film a bien été modifié',
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
			onClose()
		},
		onError: (res: any) => {
			toast({
				title: 'Erreur',
				description:
					'Une erreur est survenue : ' +
					(res.response.data.message || 'Missing data'),
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		},
	})

	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Modifier un film</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl>
						<FormLabel>Movie</FormLabel>
						<Input
							value={name}
							placeholder="Movie"
							onChange={(e) => setName(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Date</FormLabel>
						<Input
							type="date"
							value={date}
							placeholder="Date"
							onChange={(e) => setDate(format(new Date(e.target.value), "yyyy-MM-dd"))}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Auteur</FormLabel>
						<Input
							value={author}
							placeholder="Auteur"
							onChange={(e) => setAuthor(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Description</FormLabel>
						<Input
							value={description}
							placeholder="Description"
							onChange={(e) => setDescription(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Image</FormLabel>
						<Input
							value={image}
							placeholder="Entrer l'url de l'image"
							onChange={(e) => setImage(e.target.value)}
						/>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button variant="ghost" colorScheme="blue" onClick={onClose}>
						Fermer
					</Button>
					<Button
						colorScheme="blue"
						onClick={() => {
							console.log('mutation')

							mutate()
						}}
					>
						Enregistrer
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default ModifyFilm
