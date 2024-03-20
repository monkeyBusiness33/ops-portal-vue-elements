/**
 * Returns the absolute URL of an image located in the /src directory of a web application.
 *
 * @param path - the path of the image to be loaded
 * @returns the absolute URL of the image
 */
export const getImageUrl = (path: string): string => {
  // Create a new URL object using the path and the base URL of the current module
  const imageUrl = new URL(`/src/${path}`, import.meta.url);

  // Return the absolute URL as a string
  return imageUrl.href;
};
