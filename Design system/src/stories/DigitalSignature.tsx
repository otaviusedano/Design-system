import React, { useRef, useState, useEffect } from 'react';

import './digital-signature.css';

import logoSvg from './assets/logo.svg';

/** Logo no canto do componente (ex.: Topaz) */
const LogoIcon = () => (
  <img
    src={logoSvg}
    alt=""
    className="storybook-digital-signature__logo"
    width={152}
    height={40}
    aria-hidden
  />
);

/** Assinatura ilustrativa "Mat" em cursiva — aparece ao clicar */
const SignatureIllustration = () => (
  <svg
    className="storybook-digital-signature__signature-svg"
    viewBox="0 0 100 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M6 20 Q18 8 28 14 Q38 20 42 12 Q48 4 58 10 Q68 16 72 8 Q76 2 84 10 Q90 16 92 18"
      stroke="#0f172a"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export interface DigitalSignatureProps {
  /** Legenda opcional acima da área */
  label?: string;
  /** Texto exibido na área vazia (ex.: "Clique para assinar") */
  placeholder?: string;
  disabled?: boolean;
  errorText?: string;
  /** Callback ao exibir a assinatura (ilustrativo) */
  onSign?: () => void;
  /** Se true, foca a área ao montar */
  autoFocus?: boolean;
  /** Se true, inicia já com a assinatura ilustrativa visível (para stories) */
  defaultSigned?: boolean;
}

export const DigitalSignature = ({
  label,
  placeholder = 'Clique para assinar',
  disabled,
  errorText,
  onSign,
  autoFocus,
  defaultSigned = false,
}: DigitalSignatureProps) => {
  const [hasSigned, setHasSigned] = useState(defaultSigned);
  const padRef = useRef<HTMLDivElement>(null);
  const isError = Boolean(errorText);

  useEffect(() => {
    if (autoFocus && padRef.current) {
      padRef.current.focus();
    }
  }, [autoFocus]);

  const handlePadClick = () => {
    if (disabled) return;
    setHasSigned(true);
    onSign?.();
  };

  return (
    <div
      className={[
        'storybook-digital-signature',
        isError ? 'is-error' : '',
        disabled ? 'is-disabled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {label ? (
        <span className="storybook-digital-signature__label">{label}</span>
      ) : null}
      <div
        ref={padRef}
        className="storybook-digital-signature__pad"
        role="button"
        tabIndex={disabled ? undefined : 0}
        aria-label={placeholder}
        aria-pressed={hasSigned}
        aria-invalid={isError}
        onClick={handlePadClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePadClick();
          }
        }}
      >
        <div className="storybook-digital-signature__body">
          {hasSigned ? (
            <div className="storybook-digital-signature__signature-wrap">
              <SignatureIllustration />
            </div>
          ) : (
            <span className="storybook-digital-signature__placeholder">
              {placeholder}
            </span>
          )}
        </div>
        <div className="storybook-digital-signature__logo-wrap">
          <LogoIcon />
        </div>
      </div>
      {errorText && (
        <span className="storybook-digital-signature__helper">
          {errorText}
        </span>
      )}
    </div>
  );
};
