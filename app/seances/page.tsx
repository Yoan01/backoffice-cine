'use client'
import AddSeance from '@/components/modal/AddSeance'
import ModifySeance from '@/components/modal/ModifySeance'
import { ISeance } from '@/interface/ISeance'
import {
	Box,
	Button,
	Flex,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

export default function SeancePage() {
	const toast = useToast()

	const {
		isOpen: addIsOpen,
		onClose: addClose,
		onOpen: addOnOpen,
	} = useDisclosure()

	const {
		isOpen: modifyIsOpen,
		onClose: modifyClose,
		onOpen: modifyOnOpen,
	} = useDisclosure()

	const [seanceSelected, setSeanceSelected] = useState<ISeance>()

	const { data: seances, isSuccess } = useQuery({
		queryKey: ['seances'],
		queryFn: () =>
			fetch('http://localhost:3002/shows/getAllShows').then((res) =>
				res.json()
			),
	})

	const handleSeanceSelected = (seance: ISeance) => {
		setSeanceSelected(seance)
		modifyOnOpen()
	}

	const { mutate } = useMutation({
		mutationFn: (seance: ISeance) =>
			axios.delete('http://localhost:3002/shows/getDeleteShow', {
				params: {
					id: seance.id,
				},
			}),
		onSuccess: () => {
			toast({
				title: 'Séance supprimée',
				description: 'La séance a bien été supprimée',
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
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

	if (!isSuccess) {
		return (
			<Flex justifyContent={'center'} alignItems={'center'} h={'100vh'}>
				<Text>Le micro service est down !</Text>
			</Flex>
		)
	}

	return (
		<Flex flexDir={'column'}>
			<Button
				onClick={() => {
					addOnOpen()
				}}
			>
				Ajouter une Séance
			</Button>
			<AddSeance isOpen={addIsOpen} onClose={addClose} />
			<TableContainer w={'100vw'}>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>Id</Th>
							<Th>Name Movie</Th>
							<Th isNumeric>Ticket Left</Th>
							<Th isNumeric>Room</Th>
							<Th> Date </Th>
							<Th> Heure </Th>
							<Th> langue </Th>
							<Th isNumeric> durée </Th>
							<Th></Th>
							<Th></Th>
						</Tr>
					</Thead>
					<Tbody>
						{seances?.map((seance: ISeance) => (
							<Tr key={seance.id}>
								<Td>{seance.id}</Td>
								<Td>{seance.movie}</Td>
								<Td isNumeric>{seance.ticketLeft}</Td>
								<Td isNumeric>{seance.room}</Td>
								<Td>{seance.date}</Td>
								<Td>{seance.time}</Td>
								<Td>{seance.language}</Td>
								<Td isNumeric>{seance.duration}</Td>
								<Td></Td>
								<Td>
									<Flex gap={3}>
										<Button
											onClick={() => {
												handleSeanceSelected(seance)
											}}
										>
											<svg
												className="feather feather-edit"
												fill="none"
												height="24"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												viewBox="0 0 24 24"
												width="24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
												<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
											</svg>
										</Button>

										<Button
											onClick={() => {
												mutate(seance)
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												x="0px"
												y="0px"
												width="24"
												height="24"
												viewBox="0 0 24 24"
											>
												<path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
											</svg>
										</Button>
									</Flex>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			<ModifySeance
				isOpen={modifyIsOpen}
				onClose={modifyClose}
				seance={seanceSelected}
			/>
		</Flex>
	)
}
