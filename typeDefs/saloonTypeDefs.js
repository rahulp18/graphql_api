import gql from "graphql-tag";

export const saloonTypeDefs = gql`
  type Saloon {
    name: String
    services: Services
    owoner: ID
    barbers: [ID]
    managers: [ID]
    location: Location
    timeSlots: TimeSlots
  }
  type Services {
    name: String
    price: Int
  }
  type TimeSlots {
    date: String
    slots: [String]
  }
  type Location {
    lat: String
    lng: String
  }
`;
