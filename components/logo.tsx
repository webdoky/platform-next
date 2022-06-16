interface Params {
  width: number;
  className?: string;
}

export default function Logo(params: Params) {
  const { width = 40, className } = params;

  const height = Math.ceil((width / 264.58333) * 264.58333);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 264.58333 264.58334"
      className={className}
    >
      <g transform="translate(0,-32.41665)">
        <g transform="matrix(2.4819787,0,0,2.4819787,-4114.7413,672.28013)">
          <path
            d="m 1669.7664,-190.07191 c -3.4831,-6e-5 -6.3067,3.45812 -6.3067,7.72402 0,4.2659 2.5563,7.18954 6.3067,7.72402 l 46.9069,10.30393 42.1444,-23.718"
            style={{
              opacity: 1,
              vectorEffect: 'none',
              fill: 'none',
              strokeWidth: 2.99900007,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 4,
              strokeDasharray: 'none',
              strokeDashoffset: 0,
              strokeOpacity: 1,
            }}
            stroke="currentColor"
          />
          <path
            d="m 1669.7664,-205.51995 c -3.4831,-6e-5 -6.3067,3.45812 -6.3067,7.72402 0,4.2659 2.5563,7.18954 6.3067,7.72402 l 46.9069,10.30393 42.1444,-23.718"
            style={{
              opacity: 1,
              vectorEffect: 'none',
              fill: 'none',
              strokeWidth: 2.99900007,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 4,
              strokeDasharray: 'none',
              strokeDashoffset: 0,
              strokeOpacity: 1,
            }}
            stroke="currentColor"
          />
          <path
            d="m 1669.7664,-220.96799 c -3.4831,-6e-5 -6.3067,3.45812 -6.3067,7.72402 0,4.2659 2.5563,7.18954 6.3067,7.72402 l 22.8809,5.02619 m 13.6936,3.00805 10.3324,2.26969 42.1444,-23.718"
            style={{
              opacity: 1,
              vectorEffect: 'none',
              fill: 'none',
              strokeWidth: 2.99900007,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 4,
              strokeDasharray: 'none',
              strokeDashoffset: 0,
              strokeOpacity: 1,
            }}
            stroke="currentColor"
          />
          <path
            transform="scale(0.26458333)"
            d="m 6470.2148,-924.79688 -163.5797,89.64226 181.5797,38.94368 159.2852,-89.64258 z"
            style={{
              opacity: 1,
              vectorEffect: 'none',
              strokeWidth: 11.33480358,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 4,
              strokeDasharray: 'none',
              strokeDashoffset: 0,
              strokeOpacity: 1,
            }}
            stroke="currentColor"
            fill="currentColor"
          />
          <path
            d="m 1696.2626,-208.44866 v 15.68601 l 3.4963,-2.17336 3.8743,4.25223 v -16.53646 z"
            style={{
              fillRule: 'evenodd',
              stroke: 'none',
              strokeWidth: '0.26458332px',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeOpacity: 1,
            }}
            fill="currentColor"
          />
        </g>
      </g>
    </svg>
  );
}
