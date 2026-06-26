export const serverApi: string = `${process.env.REACT_APP_API_URL}`;

export const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";

export const Messages = {
  error1: "Something went wrong!",
  error2: "Please login first!",
  error3: "Please fulfill all inputs!",
  error4: "Message is empty!",
  error5: "Only images jpeg, jpg, png format allowed!",
};

export const getDiscountedPrice = (price: number): number => {
  return +(price * 0.7).toFixed(2);
};
