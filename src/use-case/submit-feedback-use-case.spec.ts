import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedbacks', () =>{
  
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example comment',
      screenshot: "data:image/png;base64,0917509348ur9fqjwe8fj90wy8",
    })).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()

  });
});

it('should not be able to submit a feedback without a type', async () => {

  await expect(submitFeedback.execute({
    type: '',
    comment: 'Example comment',
    screenshot: "data:image/png;base64,0917509348ur9fqjwe8fj90wy8",
  })).rejects.toThrow();
});

it('should not be able to submit a feedback without a Comment', async () => {

  await expect(submitFeedback.execute({
    type: 'BUG',
    comment: '',
    screenshot: "data:image/png;base64,0917509348ur9fqjwe8fj90wy8",
  })).rejects.toThrow();
  
});

it('should not be able to submit a feedback with a invalid screenshot', async () => {
  await expect(submitFeedback.execute({
    type: 'BUG',
    comment: 'example comment',
    screenshot: "test.jpg",
  })).rejects.toThrow();
  
});
