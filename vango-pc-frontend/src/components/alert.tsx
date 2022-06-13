import ReactDOM from 'react-dom';
import AlertComponent from './alertComponent';

interface AlertProps {
  isConfirm?: boolean;
  content: string | React.ReactNode | null;
  onClose?(...props: any): any;
  onCancel?(...props: any): any;
  onOk?(...props: any): any;
}

const Alert = (props: AlertProps) => {
  const root = document.getElementById('root');
  let container: HTMLDivElement | null = document.createElement('div');
  container.classList.add('alert-container');

  const destroy = () => {
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
      root?.removeChild(container);
      container = null;
    }
  };
  const close = () => {
    props.onClose?.();
    destroy();
  };

  root?.appendChild(container);
  ReactDOM.render(
    <AlertComponent {...props} hasCancel={props.isConfirm} onClose={close}>
      {props.content}
    </AlertComponent>,
    container
  );
};

export default Alert;
