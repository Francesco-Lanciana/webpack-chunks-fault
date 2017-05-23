import styles from './styles/main.css';

export default (text =  'Hello World') => {
  const element = document.createElement('div');
  element.innerHTML = text;
  element.className = styles.redButton;

  return element;
};
