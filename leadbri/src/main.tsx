const form = document.getElementById("lorem");
if (!form) {
  throw new Error('Could not find element with id "lorem"');
}

form.onsubmit = async (event) => {
  event.preventDefault();
  const el = await webflow.getSelectedElement();
  if (el && el.textContent) {
    await el.setTextContent(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do " +
        "eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );
  }
};
