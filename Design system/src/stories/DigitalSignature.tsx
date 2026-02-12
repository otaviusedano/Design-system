import './digital-signature.css';

import logoSvg from './assets/logo.svg';
import signatureImg from './assets/digital-signature-2.png';

export interface DigitalSignatureProps {
  className?: string;
  state?: 'default' | 'signed';
}

export const DigitalSignature = ({
  className,
  state = 'default',
}: DigitalSignatureProps) => {
  const containerClassName = [
    'storybook-digital-signature',
    `storybook-digital-signature--${state}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (state === 'default') {
    return (
      <button
        type="button"
        className={containerClassName}
        aria-label="Assinatura digital"
      >
        <img
          src={logoSvg}
          alt=""
          className="storybook-digital-signature__logo"
          width={152}
          height={40}
          aria-hidden
        />
      </button>
    );
  }

  return (
    <div className={containerClassName}>
      <div className="storybook-digital-signature__signature">
        <img
          src={signatureImg}
          alt=""
          className="storybook-digital-signature__signature-image"
          aria-hidden
        />
      </div>
      <img
        src={logoSvg}
        alt=""
        className="storybook-digital-signature__logo"
        width={152}
        height={40}
        aria-hidden
      />
    </div>
  );
};
