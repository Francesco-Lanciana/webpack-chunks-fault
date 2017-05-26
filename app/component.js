export default (text =  'Hello World') => {
  //console.log(lazy.default);
  const element = document.createElement('div');
  element.innerHTML = text;

  element.onclick = () => {
    import('./lazy').then((lazy) => {
      element.textContent = lazy.default;
      return lazy.default;
    }).catch((err) => {
      console.error(err);
    });
  };

  return element;
};
