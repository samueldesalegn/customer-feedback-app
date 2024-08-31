import FeedbackModel from '../models/feedbackModel.js';

// Controller to handle the submission of feedback
export const submitFeedback = async (req, res) => {
	await FeedbackModel.createTableIfNotExists();

	const {
		event_id,
		event_date,
		event_name,
		event_rate,
		why_this_rate,
		presentation_content,
		session_duration,
		hands_on_lab,
		event_platform,
		presenter_name,
		presenter_rate,
		feedback_to_presenter,
		lab_trainer,
		lab_trainer_rate,
		feedback_for_trainer,
		lab_session_imporvements,
		future_topics_suggest,
		how_you_heard_about_event
	} = req.body;

	const feedback = {
		event_id,
		event_date,
		event_name,
		event_rate,
		why_this_rate,
		presentation_content,
		session_duration,
		hands_on_lab,
		event_platform,
		presenter_name,
		presenter_rate,
		feedback_to_presenter,
		lab_trainer,
		lab_trainer_rate,
		feedback_for_trainer,
		lab_session_imporvements,
		future_topics_suggest,
		how_you_heard_about_event
	};

	try {
		await FeedbackModel.saveFeedback(feedback);
		res.status(200).json({ message: 'Feedback submitted successfully' });
	} catch (error) {
		console.error('Error saving feedback:', error);
		res.status(500).json({ error: 'Could not submit feedback' });
	}
};

// Controller to handle retrieving all feedback
export const getAllFeedback = async (req, res) => {
	try {
		const feedbackList = await FeedbackModel.getAllFeedback();
		res.status(200).json(feedbackList);
	} catch (error) {
		console.error('Error getting feedback:', error);
		res.status(500).json({ error: 'Could not retrieve feedback' });
	}
};
