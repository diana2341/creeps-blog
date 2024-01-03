const Story = require('./storyModel')

const resolvers = {
    Query: {
        stories: () => Story.find(),
        story: (_, {id}) =>Story.findById(id)
    },
    Mutation: {
        createStory: (_, {input}) => Story.create(input),
        updateStory: (_, {id, input}) => Story.findByIdAndUpdate(id, input, {new: true}),
        deleteStory: (_, {id}) => Story.findByIdAndDelete(id)
    }
}

module.exports = resolvers