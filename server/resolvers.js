const Story = require('./storyModel')

const resolvers = {
    Query: {
        stories: async () => {
            try {
                const allStories = await Story.find().lean().exec();
                console.log('Fetched all stories:', allStories);
                return allStories;
            } catch (error) {
                console.error('Error fetching stories:', error);
                throw error;
            }
        },
        // story: (_, {id}) =>Story.findById(id)
        story: async (_, {id}) => {
            try {
                const singleStory = await Story.findById(id)
                console.log('fetched single story:', singleStory)
                return singleStory
            } catch {
                console.error('Error fetching single story:', error);
                throw error;
            }
        }
    },
    Mutation: {
        createStory: (_, {input}) => Story.create(input),
        updateStory: (_, {id, input}) => Story.findByIdAndUpdate(id, input, {new: true}),
        deleteStory: (_, {id}) => Story.findByIdAndDelete(id)
    }
}

module.exports = resolvers