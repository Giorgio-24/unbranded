import Destination from "~/types/destination"
import rest from '~/assets/rest.json'
import Response from "~/types/response"

const destinations = (rest as Response<Destination>).data

let continents = destinations.map(destination => destination.primaryDestination.primaryContinent)
continents = [... new Map(continents.map(continent => [continent.slug, continent]))].map(data => data[1])

export default () => {
    return {
        continents,
        destinations
    }
}