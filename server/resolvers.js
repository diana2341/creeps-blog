const Story = require('./storyModel')

const resolvers = {
    Query: {
        stories: async () => {
            try {
                const allStories = await Story.find().lean().exec();
                return allStories;
            } catch (error) {
                console.error('Error fetching stories:', error);
                throw error;
            }
        },
        story: async (_, {id}) => {
            try {
                const singleStory = await Story.findById(id)
                return singleStory
            } catch {
                console.error('Error fetching single story:', error);
                throw error;
            }
        }
    },
    Mutation: {
        createStory:async (_, {input}) => {
            try{
                const newStory = Story.create(input)
                return newStory
            }catch(error){
                console.error('Error updating story:', error);
                throw error; 
            }
        },
        updateStory: async (_, { id, input }) => {
            try {
                const updatedStory = await Story.findByIdAndUpdate(id, input, { new: true });
        
                if (!updatedStory) {
                    throw new Error('Story not found or could not be updated');
                }
        
                console.log('updated story:', updatedStory);
                return updatedStory;
            } catch (error) {
                console.error('Error updating story:', error);
                throw error; // Rethrow the error to be captured by GraphQL
            }
        }
        ,
        deleteStory: async(_, {id}) => {
            try{
                const deletedStory = await Story.findByIdAndDelete(id);
        
                if (!deletedStory) {
                    throw new Error('Story not found or could not be deleted');
                }
                
                console.log('Deleted story:', deletedStory);
                return deletedStory;
                } catch(error){
                console.error('Error updating story:', error);
                throw error; // Rethrow the error to be captured by GraphQL
            }
        }
    }
}

module.exports = resolvers