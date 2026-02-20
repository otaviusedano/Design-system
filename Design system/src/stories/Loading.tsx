import './loading.css';

export interface LoadingProps {
  className?: string;
}

export const Loading = ({ className }: LoadingProps) => {
  return (
    <div className={['storybook-loading', className].filter(Boolean).join(' ')}>
      <span className="storybook-loading__spinner" aria-label="Carregando" />
    </div>
  );
};
