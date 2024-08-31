import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

const dynamoDb = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'event_feedback';

const FeedbackModel = {
	// Method to create the table if it doesn't exist
	createTableIfNotExists: async () => {
		try {
			// Check if the table exists
			await dynamoDb.describeTable({ TableName: tableName }).promise();
			console.log(`Table "${tableName}" already exists.`);
		} catch (error) {
			if (error.code === 'ResourceNotFoundException') {
				console.log(`Table "${tableName}" does not exist. Creating now...`);
				const params = {
					TableName: tableName,
					KeySchema: [
						{ AttributeName: 'event_id', KeyType: 'HASH' },  // Partition key
					],
					AttributeDefinitions: [
						{ AttributeName: 'event_id', AttributeType: 'S' },
					],
					ProvisionedThroughput: {
						ReadCapacityUnits: 5,
						WriteCapacityUnits: 5,
					},
				};
				try {
					// Create the table
					await dynamoDb.createTable(params).promise();
					console.log(`Table "${tableName}" created successfully.`);
					// Wait until the table becomes active
					await dynamoDb.waitFor('tableExists', { TableName: tableName }).promise();
					console.log(`Table "${tableName}" is now active.`);
				} catch (createError) {
					console.error('Error creating table:', createError);
					throw createError;
				}
			} else {
				console.error('Error describing table:', error);
				throw error;
			}
		}
	},

	// Method to save feedback to the table
	saveFeedback: async (feedback) => {
		const params = {
			TableName: tableName,
			Item: feedback,
		};
		try {
			// Save the feedback to the table
			await documentClient.put(params).promise();
			console.log('Feedback saved successfully.');
		} catch (error) {
			console.error('Error saving feedback:', error);
			throw error;
		}
	},

	// Method to retrieve all feedback from the table
	getAllFeedback: async () => {
		const params = {
			TableName: tableName,
		};
		try {
			const result = await documentClient.scan(params).promise();
			return result.Items; // Return all feedback entries
		} catch (error) {
			console.error('Error fetching feedback:', error);
			throw new Error('Could not fetch feedback');
		}
	},
};

export default FeedbackModel;
