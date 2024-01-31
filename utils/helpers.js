export const timeToRead = (text) => {
    const wordsPerMinute = 200; // Average case.
    let result;
  
    let textLength = text.split(" ").length; // Split by words
    if (textLength > 0) {
      let value = Math.ceil(textLength / wordsPerMinute);
      result = `${value} min read`;
    }
    return result;
  };


 export const dateFormatter = (date) => {
    let currDate = new Date(date)
    return currDate.toLocaleDateString('en-US');


  }