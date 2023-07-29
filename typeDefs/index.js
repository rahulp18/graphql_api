import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    password: String
    location: Location
    phone: String
    isVerified: String
    createdAt: String
    updatedAt: String
    otp: String
  }
  type AuthPayload {
    token: String
  }
  type Location {
    lat: String
    lng: String
  }
  type Query {
    getAllUser: [User]
    getSingleUser(id: ID): User
  }

  type Mutation {
    createUser(
      name: String
      email: String
      password: String
      phone: String
    ): User
    updateLocation(id: ID!, lat: String!, lng: String!): User
    updateUser(
      id: ID!
      name: String
      phone: String
      email: String
      password: String
    ): User

    sendOtp(id: ID, phone: String): String
    verifyOtp(id: ID!, otp: String!): User
    authWithEmailPass(email: String, password: String): AuthPayload
  }
`;
