export const apiRouter = {
  // auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  // users
  GET_ALL_USERS: "/user",
  GET_USER: "/user/:id",
  UPDATE_USER_PROFILE: "/user/:id/updateProfile",
  UPLOAD_PROFILE_PIC: "/user/profilePic",
  // quiz
  GET_QUIZ_LIST: "/quiz",
  GET_QUIZ: "/quiz/:id",
  CREATE_QUIZ: "/quiz/create",
  UPDATE_QUIZ: "/quiz/:id",
  DELETE_QUIZ: "/quiz/:id",
  // question
  GET_QUESTION_LIST: "/question",
  GET_QUESTION: "/question/:id",
  CREATE_QUESTION: "/question/create",
  UPDATE_QUESTION: "/question/:id",
  DELETE_QUESTION: "/question/:id",
  // category
  GET_CATEGORY_LIST: "/category",
  GET_CATEGORY: "/category/:id",
  CREATE_CATEGORY: "/category/create",
  UPDATE_CATEGORY: "/category/:id",
  DELETE_CATEGORY: "/category/:id",
  // feedback
  SUBMIT_FEEDBACK: "/feedback/submitFeedback",
  GET_QUIZ_FEEDBACK: "/feedback/quiz/:quizId",
  GET_FEEDBACK: "/feedback/:id",
  GET_USER_FEEDBACK: "/feedback/user/:userId",
  // during submitting each question response
  SUBMIT_QUESTION: "/submitQuestion/:questionId",
  // final quiz submitting
  FINAL_QUIZ_SUBMIT: "/finalSubmit/:quizId/:userId",
  // score
  GET_SCORE: "/score/:quizId/:userId",
};
