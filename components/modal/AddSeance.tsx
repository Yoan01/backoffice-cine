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

interface AddSeanceProps {
	isOpen: boolean
	onClose: () => void
}

const AddSeance: React.FC<AddSeanceProps> = ({ isOpen, onClose }) => {
	const toast = useToast()

	const [movie, setMovie] = useState('')
	const [ticketLeft, setTicketLeft] = useState(0)
	const [room, setRoom] = useState(0)
	const [date, setDate] = useState('')
	const [time, setTime] = useState('')
	const [language, setLanguage] = useState('')
	const [duration, setDuration] = useState(0)
	const [price, setPrice] = useState(0)

	const { mutate } = useMutation({
		mutationFn: () =>
			axios.post('http://localhost:3002/shows/postAddShow', {
				movie,
				ticketLeft,
				room,
				date,
				time,
				language,
				duration,
				price,
			}),
		onSuccess: () => {
			toast({
				title: 'Séance ajoutée',
				description: 'La séance a bien été ajoutée',
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
				<ModalHeader>Ajouter une séance</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl>
						<FormLabel>Movie</FormLabel>
						<Input
							placeholder="Movie"
							onChange={(e) => setMovie(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Ticket Left</FormLabel>
						<Input
							type="number"
							placeholder="Ticket Left"
							onChange={(e) => setTicketLeft(parseInt(e.target.value))}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Room</FormLabel>
						<Input
							type="number"
							placeholder="Room"
							onChange={(e) => setRoom(parseInt(e.target.value))}
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
						<FormLabel>Time</FormLabel>
						<Input
							type="time"
							placeholder="Time"
							onChange={(e) => setTime(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Language</FormLabel>
						<Select
							placeholder="Language"
							onChange={(e) => setLanguage(e.target.value)}
						>
							<option value="Français">Français</option>
							<option value="English">English</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>Duration (min)</FormLabel>
						<Input
							type="number"
							placeholder="Duration (min)"
							onChange={(e) => setDuration(parseInt(e.target.value))}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Price</FormLabel>
						<Input
							type="number"
							placeholder="price"
							onChange={(e) => setPrice(parseInt(e.target.value))}
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

export default AddSeance
