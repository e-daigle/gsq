const handleError = (error: Error | string | unknown) => {
  try {
    let errorMessage = "Erreur inconnue";
    console.log(error);
    if (typeof error === "string") {
      errorMessage = error;
    }
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return errorMessage;
  } catch (error) {
    console.log(error);
    return "Error in error handling function :((";
  }
};

export default handleError;
