async function checkNews() {
  const newsText = document.getElementById('newsInput').value;
  const resultElement = document.getElementById('result');

  if (!newsText) {
    resultElement.innerText = "Please enter some text!";
    return;
  }

  // Load the model and vectorizer
  const model = await tf.loadLayersModel('https://your-firebase-url/fake_news_model.pkl');
  const vectorizer = await tf.loadLayersModel('https://your-firebase-url/vectorizer.pkl');

  // Preprocess the input text
  const processedText = vectorizer.transform([newsText]);

  // Predict
  const prediction = model.predict(processedText);
  const isFake = prediction[0] === 0;

  // Display result
  resultElement.innerText = isFake ? "This news is likely FAKE!" : "This news is likely REAL!";
}