import './Spinner.scss';

interface SpinnerProps {
  size?: number;
  color?: string;
}

export function Spinner({ size = 50, color = '#007bff' }: SpinnerProps): JSX.Element {
  return (
    <div className="loading-spinner">
      <div className="spinner" style={{ borderTopColor: color, width: size, height: size }}></div>
    </div>
  );
}