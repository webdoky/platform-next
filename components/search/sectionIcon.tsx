const icons: { [key: string]: JSX.Element } = {
  css: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M2.8 14H4.83961L4.2947 16.7245L10.0393 18.8787L17.2665 16.4697L18.3604 11H3.4L3.8 9H18.7604L19.5604 5H4.6L5 3H22L19 18L10 21L2 18L2.8 14Z"></path>
    </svg>
  ),
  glossary: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M3 18.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22H6.5C4.567 22 3 20.433 3 18.5ZM19 20V17H6.5C5.67157 17 5 17.6716 5 18.5C5 19.3284 5.67157 20 6.5 20H19ZM10 4H6C5.44772 4 5 4.44772 5 5V15.3368C5.45463 15.1208 5.9632 15 6.5 15H19V4H17V12L13.5 10L10 12V4Z"></path>
    </svg>
  ),
  guide: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M13 8V16C13 17.6569 11.6569 19 10 19H7.82929C7.41746 20.1652 6.30622 21 5 21C3.34315 21 2 19.6569 2 18C2 16.3431 3.34315 15 5 15C6.30622 15 7.41746 15.8348 7.82929 17H10C10.5523 17 11 16.5523 11 16V8C11 6.34315 12.3431 5 14 5H17V2L22 6L17 10V7H14C13.4477 7 13 7.44772 13 8ZM5 19C5.55228 19 6 18.5523 6 18C6 17.4477 5.55228 17 5 17C4.44772 17 4 17.4477 4 18C4 18.5523 4.44772 19 5 19Z"></path>
    </svg>
  ),
  html: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 18.1778L7.38083 16.9222L7.0517 13.3778H9.32156L9.48045 15.2222L12 15.8889L14.5195 15.2222L14.7806 12.3556H6.96091L6.32535 5.67778H17.6747L17.4477 7.88889H8.82219L9.02648 10.1444H17.2434L16.6192 16.9222L12 18.1778ZM3 2H21L19.377 20L12 22L4.62295 20L3 2ZM5.18844 4L6.48986 18.4339L12 19.9278L17.5101 18.4339L18.8116 4H5.18844Z"></path>
    </svg>
  ),
  javascript: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M13.3344 16.055 12.4764 17.243C13.2904 17.969 14.3024 18.332 15.5124 18.332 16.4364 18.31 17.1404 18.0717 17.6244 17.617 18.1157 17.155 18.3614 16.605 18.3614 15.967 18.3614 15.3437 18.1891 14.8303 17.8444 14.427 17.4997 14.0237 16.9204 13.701 16.1064 13.459 15.4317 13.2537 14.9551 13.0667 14.6764 12.898 14.3977 12.722 14.2584 12.5093 14.2584 12.26 14.2584 12.0327 14.3721 11.8493 14.5994 11.71 14.8267 11.5707 15.1311 11.501 15.5124 11.501 15.7911 11.501 16.1064 11.556 16.4584 11.666 16.8104 11.7613 17.1221 11.9153 17.3934 12.128L18.1634 10.929C17.4887 10.3863 16.5941 10.115 15.4794 10.115 14.6801 10.115 14.0237 10.3203 13.5104 10.731 12.9824 11.1417 12.7184 11.6513 12.7184 12.26 12.7257 12.9053 12.9384 13.4077 13.3564 13.767 13.7817 14.1263 14.3867 14.4197 15.1714 14.647 15.8241 14.8523 16.2677 15.0577 16.5024 15.263 16.7297 15.4683 16.8434 15.7177 16.8434 16.011 16.8434 16.297 16.7297 16.517 16.5024 16.671 16.2677 16.8323 15.9304 16.913 15.4904 16.913 14.7717 16.9203 14.0531 16.6343 13.3344 16.055ZM7.80405 16.693C7.58405 16.561 7.37872 16.3667 7.18805 16.11L6.15405 16.957C6.46205 17.4777 6.84339 17.8407 7.29805 18.046 7.72339 18.2367 8.21105 18.332 8.76105 18.332 9.06172 18.332 9.37339 18.2843 9.69605 18.189 10.0187 18.0937 10.3157 17.9323 10.5871 17.705 11.0637 17.3237 11.3131 16.7003 11.3351 15.835V10.247H9.85005V15.549C9.85005 16.055 9.73639 16.4107 9.50905 16.616 9.28172 16.814 8.99572 16.913 8.65105 16.913 8.32105 16.913 8.03872 16.8397 7.80405 16.693ZM3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H6Z"></path>
    </svg>
  ),
  svg: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.5761 14.5764L15.7067 10.707C15.3162 10.3164 14.683 10.3164 14.2925 10.707L6.86484 18.1346C5.11358 16.6671 4 14.4636 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 12.9014 19.8509 13.7679 19.5761 14.5764ZM8.58927 19.2386L14.9996 12.8283L18.6379 16.4666C17.1992 18.6003 14.7613 19.9998 11.9996 19.9998C10.7785 19.9998 9.62345 19.7268 8.58927 19.2386ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM11 10C11 11.1046 10.1046 12 9 12C7.89543 12 7 11.1046 7 10C7 8.89543 7.89543 8 9 8C10.1046 8 11 8.89543 11 10Z"></path>
    </svg>
  ),
};

export default function SectionIcon({ sectionName }: { sectionName: string }) {
  return icons[sectionName] || null;
}
