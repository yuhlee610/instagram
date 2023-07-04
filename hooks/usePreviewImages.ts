import { useEffect, useState } from 'react';

const usePreviewImages = (files: FileList) => {
  const [imgSrc, setImgSrc] = useState<string[] | null>(null);

  useEffect(() => {
    if (!!files) {
      const newUrls = Array.from(files).map(file => URL.createObjectURL(file))
      setImgSrc(newUrls);
    }
  }, [files]);

  return imgSrc;
};

export default usePreviewImages;
