import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    const defaultTitle = document.title;
    document.title = `${title} | ${document.title.replace(" Portfolio", "")}`;

    return () => {
      document.title = defaultTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
