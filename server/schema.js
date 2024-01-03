const { gql } = require('apollo-server')

const typeDefs = gql`
    type Story {
        id: ID!
        title: String!
        date: String!
        story: String!
        author: String!
        tags: [String]!
        img: String!
        views: Int!
        # comments: [String]!
    }

    type Query {
        stories: [Story]
        story(id: ID): Story
    }

    type Mutation {
        createStory(input: StoryInput): Story 
        updateStory(id: ID!, input: StoryInput): Story 
        deleteStory(id: ID!): Story
    }

    input StoryInput {
        title: String!
        date: String!
        story: String!
        author: String!
        tags: [String]!
        img: String!
        views: Int!
        # comments: [String]!
    }

`

module.exports = typeDefs