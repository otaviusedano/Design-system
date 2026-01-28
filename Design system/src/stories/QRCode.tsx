import React from 'react';

import './qr-code.css';

export type QRCodeSize = 'small' | 'medium' | 'large';

export interface QRCodeProps {
  /** Texto descritivo (apenas ilustrativo; o QR não é codificado) */
  value?: string;
  /** Tamanho de exibição */
  size?: QRCodeSize;
  /** Cor dos módulos (padrão preto) */
  fgColor?: string;
  /** Cor de fundo (padrão branco) */
  bgColor?: string;
  /** Título para acessibilidade */
  title?: string;
}

/** Padrão fixo ilustrativo tipo QR (21×21 módulos) — não codifica o value */
const ILLUSTRATIVE_PATTERN = [
  '111111100010101010101',
  '100000101110001101011',
  '101110101000100010100',
  '101110101110001100101',
  '101110101010100010101',
  '100000101010101010111',
  '111111101010101010101',
  '000000001011100010100',
  '101010101010111000101',
  '110100011010100011010',
  '100011010100010101010',
  '101100101010111000101',
  '101010001010100010100',
  '000000001010101010101',
  '111111101100101100101',
  '100000100010111010101',
  '101110101010100010111',
  '101110101110001010100',
  '101110101000101010101',
  '100000101110100011010',
  '111111101010101010101',
];

export const QRCode = ({
  value = 'https://exemplo.com',
  size = 'medium',
  fgColor = '#000000',
  bgColor = '#ffffff',
  title,
}: QRCodeProps) => {
  const moduleCount = ILLUSTRATIVE_PATTERN.length;

  return (
    <div
      className={`storybook-qrcode storybook-qrcode--${size}`}
      role="img"
      aria-label={title ?? `QR Code ilustrativo${value ? `: ${value}` : ''}`}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        className="storybook-qrcode__canvas"
        width="100%"
        viewBox={`0 0 ${moduleCount} ${moduleCount}`}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width={moduleCount} height={moduleCount} fill={bgColor} />
        {ILLUSTRATIVE_PATTERN.flatMap((row, y) =>
          row.split('').map((cell, x) =>
            cell === '1' ? (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width={1}
                height={1}
                fill={fgColor}
              />
            ) : null
          )
        ).filter(Boolean)}
      </svg>
    </div>
  );
};
