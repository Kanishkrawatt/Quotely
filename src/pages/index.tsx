import React from "react";
import axios from "axios";

export type ContentType = {
  _id: string;
  Quote: string;
  Author: string;
  Popularity: string;
  Category: string;
  Tags: string[];
  Id: string;
  Color: string;
};
export default function Home() {
  const [data, setData] = React.useState<ContentType>();
  React.useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL!)
      .then((res) => {
        const data = res.data;
        setData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  function getRelativeLuminance(rgb: number[]) {
    const [r, g, b] = rgb;
    const [rsRGB, gsRGB, bsRGB] = [r / 255, g / 255, b / 255];

    const [rl, gl, bl] = [
      rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4),
      gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4),
      bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4),
    ];

    return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
  }

  const TextColor =
    getRelativeLuminance(hexToRgb(`#${data?.Color}`)) > 0.179
      ? "black"
      : "white";

  if (!data)
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center space-x-2">
        <div className="w-5 h-5 rounded-full animate-pulse bg-black "></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-black "></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-black"></div>
      </div>
    );
  return <QuoteFrame TextColor={TextColor} data={data!} />;
}

export function QuoteFrame({
  data,
  TextColor,
}: {
  data: ContentType;
  TextColor: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-2"
      style={{
        background: `#${data.Color}`,
      }}
    >
      <figure className="max-w-screen-md mx-auto text-center">
        <svg
          aria-hidden="true"
          className="w-12 h-12 mx-auto mb-3 "
          viewBox="0 0 24 27"
          style={{
            color: TextColor,
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
            fill="currentColor"
          />
        </svg>
        <blockquote>
          <p
            className="text-2xl italic font-medium "
            style={{
              color: TextColor,
            }}
          >
            {`" ${data.Quote} "`}
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center mt-6 space-x-3">
          <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
            <cite
              className="pr-3 font-medium"
              style={{
                color: TextColor,
              }}
            >
              {data.Author}
            </cite>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
