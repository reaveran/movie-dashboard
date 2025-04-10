import constant from "@/config/constant";

export const getImageUrl = (name: string) => {
  return `${constant.imageUrl}${name}`;
};
