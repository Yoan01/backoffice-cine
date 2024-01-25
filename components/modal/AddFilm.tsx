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
import React, { useState } from 'react'

interface AddFilmProps {
	isOpen: boolean
	onClose: () => void
}

const AddFilm: React.FC<AddFilmProps> = ({ isOpen, onClose }) => {
	const toast = useToast()

	const [name, setName] = useState('')
	const [date, setDate] = useState('')
	const [author, setAuthor] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')

	const { mutate } = useMutation({
		mutationFn: () =>
			axios.post('http://localhost:8000/films', {
				name,
				date,
				author,
				description,
				image,
			}),
		onSuccess: () => {
			toast({
				title: 'Film ajouté',
				description: 'Le film a bien été ajouté',
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
				<ModalHeader>Ajouter un Film</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl>
						<FormLabel>Movie</FormLabel>
						<Input
							placeholder="Movie"
							onChange={(e) => setName(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Date</FormLabel>
						<Input
							type="date"
							placeholder="Date"
							onChange={(e) => setDate(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Auteur</FormLabel>
						<Input
							placeholder="Auteur"
							onChange={(e) => setAuthor(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Description</FormLabel>
						<Input
							placeholder="Description"
							onChange={(e) => setDescription(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Image</FormLabel>
						<Input
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

export default AddFilm
