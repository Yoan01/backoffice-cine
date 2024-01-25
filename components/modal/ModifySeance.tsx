import { ISeance } from '@/interface/ISeance'
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

interface ModifySeanceProps {
	isOpen: boolean
	onClose: () => void
	seance: ISeance | undefined
}

const ModifySeance: React.FC<ModifySeanceProps> = ({
	isOpen,
	onClose,
	seance,
}) => {
	const toast = useToast()

	const [id, setId] = useState(0)
	const [movie, setMovie] = useState('')
	const [ticketLeft, setTicketLeft] = useState(0)
	const [room, setRoom] = useState(0)
	const [date, setDate] = useState('')
	const [time, setTime] = useState('')
	const [language, setLanguage] = useState('')
	const [duration, setDuration] = useState(0)
	const [price, setPrice] = useState(0)

	useEffect(() => {
		if (isOpen && seance) {
			setId(seance.id)
			setMovie(seance.movie)
			setTicketLeft(seance.ticketLeft)
			setRoom(seance.room)
			setDate(seance.date)
			setTime(seance.time)
			setLanguage(seance.language)
			setDuration(seance.duration)
			setPrice(seance.price)
		}
	}, [isOpen])

	const { mutate } = useMutation({
		mutationFn: () =>
			axios.post('http://localhost:3002/shows/postUpdateShow', {
				id,
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
				title: 'Séance modifiée',
				description: 'La séance a bien été modifiée',
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
				<ModalHeader>Modifier une séance</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl>
						<FormLabel>Movie</FormLabel>
						<Input
							value={movie}
							placeholder="Movie"
							onChange={(e) => setMovie(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Ticket Left</FormLabel>
						<Input
							value={ticketLeft}
							type="number"
							placeholder="Ticket Left"
							onChange={(e) => setTicketLeft(parseInt(e.target.value))}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Room</FormLabel>
						<Input
							value={room}
							type="number"
							placeholder="Room"
							onChange={(e) => setRoom(parseInt(e.target.value))}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Date</FormLabel>
						<Input
							value={date}
							type="date"
							placeholder="Date"
							onChange={(e) => setDate(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Time</FormLabel>
						<Input
							value={time}
							type="time"
							placeholder="Time"
							onChange={(e) => setTime(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Language</FormLabel>
						<Select
							value={language}
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
							value={duration}
							type="number"
							placeholder="Duration (min)"
							onChange={(e) => setDuration(parseInt(e.target.value))}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Price</FormLabel>
						<Input
							value={price}
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

export default ModifySeance
