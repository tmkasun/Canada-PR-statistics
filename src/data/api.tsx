import { useEffect, useState } from "react";

export const clearAndParseNumber = (numberInString: string) => {
  let parsedNumber;
  try {
    parsedNumber = parseInt(numberInString.replace(/,/g, ""));
  } catch (error) {
    console.error(`Error while parsing ${numberInString}`);
    console.error(error);
  }
  return parsedNumber;
};
export const useIRCCData = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isStale = false;
    (async () => {
      setIsLoading(true);
      const res = await fetch(
        "https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json"
      );
      const data = await res.json();
      if (!isStale) {
        setData(data);
      }
      setIsLoading(false);
      return () => {
        isStale = true;
      };
    })();
  }, []);
  return { data, isLoading };
};

export default useIRCCData;
