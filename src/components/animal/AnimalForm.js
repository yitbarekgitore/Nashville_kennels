import React, { useContext, useRef } from 'react'
import { AnimalContext } from "./AnimalProvider";
import { LocationContext } from "../location/LocationProvider";
import { Label, Button } from 'reactstrap';

export default props => {
    const {addAnimal} = useContext(AnimalContext)    
    const {locations} = useContext(LocationContext)    
    const animalName = useRef()  
    const animalBreed = useRef()  
    const location = useRef()  
    const addNewAnimal = () => {
        const customerId = localStorage.getItem("kennel_customer")
        const newAnimal = {
            name: animalName.current.value,
            breed: animalBreed.current.value,
            customerId: parseInt(customerId),
            locationId: parseInt(location.current.value)
        }
        addAnimal(newAnimal).then(props.toggler)
    }
    return (
        <form>
            <input 
                type="text"
                required
                autoFocus
                ref = {animalName}
                placeholder="name of animal"
            />
            <input 
                type="text"
                required
                autoFocus
                ref = {animalBreed}
                placeholder="address of animal"
            />
            <Label htmlFor="location">Location</Label>
            <select
                defaultValue=""
                name="location"
                ref = {location} name = "location"
            >
                <option value = "0">Please select location</option>
                {
                    locations.map(loc => {
                        return <option key = {loc.id} value = {loc.id}>{loc.name}</option>
                    })
                }
            </select>
            <Button type = "submit" onClick = {evt => {
                evt.preventDefault()
                addNewAnimal()
            }} >Save animal</Button>
        </form>
    )
}