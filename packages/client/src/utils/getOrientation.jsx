//src/providers/GetOrientation.jsx

/**
 * Loads an image and determines its orientation
 * @param {string} url - Them image URL
 * @returns {Promise<string>} - Orientation type
 */
const getOrientation = (url) => {
    return new Promise((resolve) => {
      // Create a new image element
      const img = new Image();
      // When the image is loaded
      img.onload = () => {
        // Destructure loaded image's with and height
        const { width, height } = img;
        // Calculate absolute difference between width and height
        const diff = Math.abs(width - height);
  
        // If width and height are same (diffence less than 1%)
        if (diff < width * 0.01) {
          resolve("square"); // It's a square
        }
        // If width is greather than the height
        else if (width > height) {
          resolve("landscape"); // It's landscape
        }
        // If width is greather than the height
        else {
          resolve("portrait"); // It's portrait
        }
      };
      // Start loading image by setting its source
      img.src = url;
    });
  };
  export default getOrientation;